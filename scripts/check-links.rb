#!/usr/bin/env ruby
# frozen_string_literal: true
# Internal link check. Run before every publish PR (and every "Links:" PR):
#
#   BUNDLE_PATH=vendor/bundle ruby scripts/check-links.rb            # builds into _site, then checks
#   ruby scripts/check-links.rb --no-build                           # checks an existing _site
#
# Fails (exit 1) when any built page:
#   - links to a /blog/... URL that doesn't exist in _site (e.g. a post that isn't published yet:
#     future-dated, published: false, or still in preview-posts/), or
#   - links into preview-posts/, or
#   - has any other root-relative href/src that doesn't resolve to a built file.
# The posts' own post-link / post-live includes already hide unpublished targets; this catches
# hand-written markdown or HTML links that bypass them.
require "find"
require "uri"

root = File.expand_path("..", __dir__)
site = File.join(root, "_site")
unless ARGV.include?("--no-build")
  ok = Dir.chdir(root) { system("bundle", "exec", "jekyll", "build", "--quiet") }
  abort "check-links: jekyll build failed" unless ok
end
abort "check-links: no _site at #{site}" unless Dir.exist?(site)

def resolves?(site, path)
  path = URI.decode_www_form_component(path)
  return true if path == "/"
  full = File.join(site, path)
  return true if File.file?(full)
  return true if path.end_with?("/") && File.file?(File.join(full, "index.html"))
  return true if !path.end_with?("/") && (File.file?("#{full}.html") || File.file?(File.join(full, "index.html")))
  false
end

errors = []
checked = 0
Find.find(site) do |f|
  next unless f.end_with?(".html", ".xml")
  rel = f.sub(site, "")
  File.read(f).scan(/\b(?:href|src)\s*=\s*["']([^"']+)["']/i).flatten.each do |raw|
    url = raw.strip
    url = url.sub(%r{\Ahttps?://(www\.)?workwithalfie\.com}, "")
    next if url.empty? || url.start_with?("#", "mailto:", "tel:", "data:", "javascript:", "http:", "https:", "//")
    next unless url.start_with?("/") # relative links are not used on this site
    path = url.split(/[?#]/).first.to_s
    path = "/" if path.empty?
    checked += 1
    if path.include?("preview-posts")
      errors << "#{rel}: links into preview-posts: #{url}"
    elsif path.start_with?("/blog/") && !resolves?(site, path)
      errors << "#{rel}: links to a blog URL that isn't built (unpublished or missing post?): #{url}"
    elsif !resolves?(site, path)
      errors << "#{rel}: broken internal link: #{url}"
    end
  end
end

# Conditional links (post-link / post-live includes) whose target isn't live yet. They are hidden or
# plain on the site, so they can't break, but a target slug that matches no post file at all will
# never switch on (e.g. a post renamed after the link was written). Report both; don't fail.
live = Dir[File.join(site, "blog", "*", "index.html")].map { |f| File.basename(File.dirname(f)) }
known = Dir[File.join(root, "{_posts,preview-posts}", "*.md")].map do |f|
  File.read(f)[/^slug:\s*"?([\w-]+)/, 1] || File.basename(f, ".md").sub(/\A\d{4}-\d{2}-\d{2}-/, "")
end
Dir[File.join(root, "{_posts,_data}", "**", "*.{md,html,yml}"), File.join(root, "*.html")].each do |f|
  File.read(f).scan(/\{%-?\s*include\s+post-(?:link|live)\.html[^%]*?(?:slug="([\w-]+)"|url="\/blog\/([\w-]+)\/")/).each do |a, b|
    t = a || b
    next if live.include?(t)
    state = known.include?(t) ? "pending (not published yet)" : "UNKNOWN SLUG: matches no post in _posts/ or preview-posts/, will never switch on"
    puts "note: #{f.sub("#{root}/", "")} -> /blog/#{t}/: #{state}"
  end
end

if errors.empty?
  puts "check-links: OK (#{checked} internal links checked)"
else
  puts errors.uniq
  puts "check-links: FAILED (#{errors.uniq.size} problems, #{checked} internal links checked)"
  exit 1
end
