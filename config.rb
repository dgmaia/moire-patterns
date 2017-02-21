###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

set :relative_links, true


# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

###
# Helpers
###

@readmore_separator = /(<p>)?\(READMORE\)(<\/p>)?/i

def setup_summary_generator(
  separator = /(READMORE)/i,
  readmore_text = "Read more",
  link_to_separator_position = false)

  return Proc.new  do |resource, rendered, length, ellipsis|
    require 'middleman-blog/truncate_html'
    if link_to_separator_position
      # readmore_link = "\n<p class = 'readmore'>#{link_to(readmore_text, resource, :fragment => 'readmore')}</p>"
      readmore_link = "1"
    else
      readmore_link = "\n<div class = 'read-more'>#{app.link_to(readmore_text, resource)}</div>"
    end

    if rendered =~ separator
      # The separator is found in the text
      summary = rendered.split(separator).first
      summary + readmore_link   # return
    elsif length
      summary = TruncateHTML.truncate_html(rendered, length, ellipsis)
      unless summary.strip == rendered.strip  # If the
            # original text was longer then the summary...
        summary = summary + readmore_link     # ...add
            # a read more-link.
      end
      summary    # return
    else
      rendered   # return
    end
  end
end

# activate :blog do |blog|
#   # This will add a prefix to all links, template references and source paths
#   # blog.prefix = "blog"
#
#   # blog.permalink = "{year}/{month}/{day}/{title}.html"
#   # Matcher for blog source files
#   # blog.sources = "{year}-{month}-{day}-{title}.html"
#   blog.taglink = "tags/{tag}.html"
#   blog.layout = "layouts/article"
#   blog.summary_separator = /DUMMY SEPARATOR/
#   blog.summary_length = 250
#   blog.summary_generator = setup_summary_generator(@readmore_separator)
#   # blog.year_link = "{year}.html"
#   # blog.month_link = "{year}/{month}.html"
#   # blog.day_link = "{year}/{month}/{day}.html"
#   blog.default_extension = ".markdown"
#
#   blog.tag_template = "tag.html"
#   blog.calendar_template = "calendar.html"
#
#   # Enable pagination
#   blog.paginate = true
#   blog.per_page = 10
#   blog.page_link = "page/{num}"
# end

page "/feed.xml", layout: false
# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

page "/about/*", :layout => "single"

# Methods defined in the helpers block are available in templates
helpers do

  def cleanup_readmore(html)
    html.sub(/(<p>)?\(READMORE\)(<\/p>)?/i,"")
    # @readmore_separator
  end

end

# Build-specific configuration
configure :build do

  activate :relative_assets

  # Minify CSS on build
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript
end
