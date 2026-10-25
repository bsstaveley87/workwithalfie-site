#!/usr/bin/env ruby
# frozen_string_literal: true
# Per-publish internal-linking pass: SUGGESTS links, never edits files.
#
#   ruby scripts/link-candidates.rb <new-post-slug> [--query "target query"] [--phrases "a, b, c"]
#
# Reads the new post's front matter (from _posts/, or preview-posts/ if it isn't published yet):
#   primary_keyword     the target query (overridden by --query)
#   key_phrases         optional list of 2-4 phrases other pages might already say, e.g.
#                       key_phrases: ["building workflows yourself", "HubSpot workflows"]
#                       (falls back to secondary_keywords, then the title; --phrases overrides)
# Then lists:
#   INBOUND   sentences in live posts, pages and _data/faq.yml (never preview-posts/) that mention a
#             phrase and don't already link to the new post: file, line, sentence, suggested anchor.
#             At most 1 per source file and 5 files, same-category posts ranked first.
#   OUTBOUND  live posts the new post could link out to: sentences in the new post that mention
#             another live post's primary_keyword / key_phrases / secondary_keywords / title.
require "yaml"
require "date"

ROOT = File.expand_path("..", __dir__)
STOP = %w[a an the and or of to in on for with your you is are be it its this that what how why
          when who which do does vs can by at from as into without our we their they them one each
          hubspot alfie].freeze
# Words too generic to count towards a fuzzy match on their own.
GENERIC = %w[keep own better choice ongoing first new get make use more need help team teams work
             set way good best right start covers cover].freeze
MAX_SOURCES = 5

def usage!
  abort "usage: ruby scripts/link-candidates.rb <slug> [--query \"q\"] [--phrases \"a, b, c\"]"
end

args = ARGV.dup
slug = args.shift or usage!
opt = {}
while (a = args.shift)
  case a
  when "--query" then opt[:query] = args.shift
  when "--phrases" then opt[:phrases] = args.shift.to_s.split(",").map(&:strip).reject(&:empty?)
  else usage!
  end
end

def split_fm(path)
  txt = File.read(path)
  if txt =~ /\A---\s*\n(.*?)\n---\s*\n/m
    fm = YAML.safe_load(Regexp.last_match(1), permitted_classes: [Date, Time]) || {}
    [fm, txt.lines.size - Regexp.last_match.post_match.lines.size, Regexp.last_match.post_match]
  else
    [{}, 0, txt]
  end
end

def post_slug(path, fm)
  fm["slug"] || File.basename(path, ".*").sub(/\A\d{4}-\d{2}-\d{2}-/, "")
end

def live_post?(path, fm)
  return false if fm["published"] == false || fm["preview_only"] == true
  d = fm["date"] || File.basename(path)[/\A\d{4}-\d{2}-\d{2}/]
  d = Date.parse(d.to_s) rescue nil
  d.nil? || d <= Date.today
end

posts = Dir[File.join(ROOT, "_posts", "*.md")].map do |p|
  fm, off, body = split_fm(p)
  { path: p, fm: fm, off: off, body: body, slug: post_slug(p, fm) }
end.select { |p| live_post?(p[:path], p[:fm]) }

new_path = posts.find { |p| p[:slug] == slug }&.dig(:path) ||
           Dir[File.join(ROOT, "{_posts,preview-posts}", "*.md")].find { |p| post_slug(p, split_fm(p)[0]) == slug }
abort "link-candidates: no post with slug #{slug} in _posts/ or preview-posts/" unless new_path
nfm, noff, nbody = split_fm(new_path)
new_url = "/blog/#{slug}/"
query = opt[:query] || nfm["primary_keyword"]
key = opt[:phrases] || nfm["key_phrases"] || nfm["secondary_keywords"] || [nfm["title"]]
title_core = nfm["title"].to_s.sub(/\AAlfie vs\.?\s+/i, "").sub(/:.*\z/, "")
phrases = ([query] + Array(key) + [title_core]).compact.map(&:to_s).map(&:strip).reject(&:empty?).uniq
note = new_path.include?("preview-posts") ? " (read from preview-posts: not live yet)" : ""

# ---- text helpers ----
def plain(s)
  s.gsub(/\{%.*?%\}|\{\{.*?\}\}/, " ")
   .gsub(/<[^>]+>/, " ")
   .gsub(/!?\[([^\]]*)\]\([^)]*\)/, '\1')
   .gsub(/[*_`#>|]+/, " ")
   .gsub(/\A\s*(?:-|\d+\.)\s+/, "")
   .gsub(/\A\s*(?:[qa]|text|body|answer|question):\s*/i, "")
   .gsub(/\s+/, " ").strip.delete_prefix('"').delete_suffix('"')
end

def words(s) = s.downcase.scan(/[a-z0-9']+/)
def content_words(s) = words(s).reject { |w| STOP.include?(w) || w.size < 3 }

def stem(w) = w.sub(/(?:ies|es|s|ing|ed)\z/, "")

# Returns [score, anchor] for the best way a phrase shows up in a sentence, or nil.
def match(sentence, phrase)
  low = sentence.downcase
  if (i = low.index(phrase.downcase))
    return [10 + phrase.split.size, sentence[i, phrase.size]]
  end
  want = content_words(phrase).reject { |w| GENERIC.include?(w) }.map { |w| stem(w) }.uniq
  return nil if want.size < 2
  toks = sentence.to_enum(:scan, /[A-Za-z0-9']+/).map { Regexp.last_match }
  hit = toks.each_index.select { |i| want.include?(stem(toks[i][0].downcase)) }
  found = hit.map { |i| stem(toks[i][0].downcase) }.uniq
  return nil if found.size < (want.size >= 4 ? 3 : 2)
  # shortest window covering the found words, capped at 7 words
  best = nil
  hit.each do |i|
    hit.each do |j|
      next if j < i || j - i > 6
      got = hit.select { |k| k >= i && k <= j }.map { |k| stem(toks[k][0].downcase) }.uniq
      next unless got.size == found.size
      best = [i, j] if best.nil? || (j - i) < (best[1] - best[0])
    end
  end
  return nil unless best
  anchor = sentence[toks[best[0]].begin(0)...toks[best[1]].end(0)]
  [3 * found.size, anchor]
end

def sentences(lines, offset)
  out = []
  lines.each_with_index do |raw, i|
    next if raw =~ /\A\s*(?:\{%|<\/?(?:script|style|meta|link)\b|layout:|permalink:|title:|description:)/i
    md_heading = raw =~ /\A\s*#/
    # HTML lines can hold a heading and a paragraph: treat each block element as its own piece.
    raw.split(%r{(<h[1-6][^>]*>.*?</h[1-6]>)|</?(?:p|li|div|article|summary|dt|dd|label)\b[^>]*>}i).compact.each do |piece|
      text = plain(piece)
      next if text.size < 12
      heading = md_heading || piece =~ /\A<h\d/i
      text.split(/(?<=[.!?])\s+(?=[A-Z"(])/).each do |s|
        out << { line: offset + i + 1, text: s, raw: raw, heading: heading } if s.size >= 12
      end
    end
  end
  out
end

def rel(p) = p.sub("#{ROOT}/", "")

# ---- INBOUND: existing live content that could link to the new post ----
sources = posts.reject { |p| p[:slug] == slug }.map do |p|
  { path: p[:path], off: p[:off], body: p[:body], cat: p[:fm]["category"], kind: "post" }
end
# Top-level pages only: blog/ index and category pages are generated lists.
Dir[File.join(ROOT, "*.html")].each do |p|
  next if %w[404.html book.html contact.html privacy.html].include?(File.basename(p))
  _fm, off, body = split_fm(p)
  sources << { path: p, off: off, body: body, cat: nil, kind: "page" }
end
faq = File.join(ROOT, "_data", "faq.yml")
# FAQ answers only (a: lines). Questions render inside <summary>, so no links there.
if File.exist?(faq)
  body = File.read(faq).lines.map { |l| l =~ /\A\s*a:/ ? l : "\n" }.join
  sources << { path: faq, off: 0, body: body, cat: nil, kind: "data" }
end

inbound = sources.filter_map do |src|
  next if src[:path] == new_path
  next if src[:body].include?(new_url) || src[:body].include?("slug=\"#{slug}\"")
  cands = sentences(src[:body].lines, src[:off]).filter_map do |s|
    next if s[:raw].include?(new_url)
    m = phrases.filter_map { |ph| r = match(s[:text], ph); r && r + [ph] }.max_by(&:first)
    next unless m
    score = m[0]
    score += 4 if src[:cat] && src[:cat] == nfm["category"]
    score += 1 if src[:kind] == "post"
    score -= 4 if s[:heading]
    anchor_in_link = s[:raw] =~ /\[[^\]]*#{Regexp.escape(m[1])}[^\]]*\]\(|<a [^>]*>[^<]*#{Regexp.escape(m[1])}/i
    next if anchor_in_link
    { file: rel(src[:path]), line: s[:line], sentence: s[:text], anchor: m[1], phrase: m[2], score: score,
      same_cat: src[:cat] && src[:cat] == nfm["category"] }
  end
  cands.max_by { |c| c[:score] }
end.sort_by { |c| -c[:score] }.first(MAX_SOURCES)

# ---- OUTBOUND: live posts the new post could link to ----
new_sents = sentences(nbody.lines, noff)
outbound = posts.reject { |p| p[:slug] == slug }.filter_map do |p|
  url = "/blog/#{p[:slug]}/"
  next if nbody.include?(url) || nbody.include?("slug=\"#{p[:slug]}\"")
  tph = ([p[:fm]["primary_keyword"]] + Array(p[:fm]["key_phrases"] || p[:fm]["secondary_keywords"]) + [p[:fm]["title"]])
        .compact.map(&:to_s).uniq
  best = new_sents.filter_map do |s|
    m = tph.filter_map { |ph| r = match(s[:text], ph); r && r + [ph] }.max_by(&:first)
    next unless m
    next if s[:raw] =~ /\[[^\]]*#{Regexp.escape(m[1])}[^\]]*\]\(/i
    sc = m[0] + (p[:fm]["category"] == nfm["category"] ? 4 : 0) - (s[:heading] ? 4 : 0)
    { target: url, title: p[:fm]["title"], line: s[:line], sentence: s[:text], anchor: m[1], phrase: m[2], score: sc }
  end.max_by { |c| c[:score] }
  best
end.sort_by { |c| -c[:score] }.first(MAX_SOURCES)

puts "Link candidates for #{new_url}#{note}"
puts "  title:    #{nfm['title']}"
puts "  category: #{nfm['category']}"
puts "  phrases:  #{phrases.join(' | ')}"
puts
puts "INBOUND (existing live pages -> #{new_url}); max 1 per page, #{MAX_SOURCES} pages:"
puts "  none found" if inbound.empty?
inbound.each_with_index do |c, i|
  puts "  #{i + 1}. #{c[:file]}:#{c[:line]}  [score #{c[:score]}#{c[:same_cat] ? ', same category' : ''}]"
  puts "     sentence: #{c[:sentence]}"
  puts "     anchor:   \"#{c[:anchor]}\"  (matches \"#{c[:phrase]}\")"
end
puts
puts "OUTBOUND (#{rel(new_path)} -> live posts):"
puts "  none found" if outbound.empty?
outbound.each_with_index do |c, i|
  puts "  #{i + 1}. -> #{c[:target]} (#{c[:title]})  line #{c[:line]}  [score #{c[:score]}]"
  puts "     sentence: #{c[:sentence]}"
  puts "     anchor:   \"#{c[:anchor]}\"  (matches \"#{c[:phrase]}\")"
end
puts
puts "Suggestions only. Link existing words (no new copy), use {% include post-link.html slug=... %} in posts,"
puts "then run ruby scripts/check-links.rb and ship as a 'Links: <post title>' PR."
