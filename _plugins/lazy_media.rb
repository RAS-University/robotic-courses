# frozen_string_literal: true

# Defer media downloads until they are needed:
# - <img> gets loading="lazy" decoding="async" (fetched when scrolled near)
# - <video> without autoplay gets preload="metadata" (only the first bytes until play)
# Tags that already set these attributes are left untouched.
module LazyMedia
  IMG_TAG = /<img\b(?![^>]*\bloading=)([^>]*)>/i
  VIDEO_TAG = /<video\b(?![^>]*\b(?:preload|autoplay)\b)([^>]*)>/i

  def self.process(item)
    return unless item.output_ext == ".html" && item.output

    item.output = item.output
      .gsub(IMG_TAG, '<img loading="lazy" decoding="async"\1>')
      .gsub(VIDEO_TAG, '<video preload="metadata"\1>')
  end
end

Jekyll::Hooks.register [:pages, :documents], :post_render do |item|
  LazyMedia.process(item)
end
