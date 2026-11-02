# frozen_string_literal: true

module VitaeComponents
  # Inline SVG icons, the same files and rules as stories/vitae/icons.js:
  # Fluent icons recolored to currentColor; the two-tone warning keeps its token colors.
  module Icons
    DIR = File.expand_path("icons", __dir__)

    module_function

    def svg(name, size = 20, theme = "filled", class_name: "vitae-icon", label: nil)
      key = [ "#{name}-#{size}-#{theme}", "#{name}-#{size}-regular", name.to_s ].find { |k| File.exist?(path(k)) }
      unless key
        return %(<span class="#{class_name}" style="display:inline-block;width:#{size}px;height:#{size}px"></span>)
      end

      svg = read(key)
      a11y = label ? %(role="img" aria-label="#{label}") : %(aria-hidden="true" focusable="false")
      svg = if theme.to_s == "two-tone"
        svg.gsub('fill="#F5C400"', 'fill="var(--vitae-support-warning-icon-fill)"')
           .gsub('stroke="#1C1F23"', 'stroke="var(--vitae-support-warning-icon-outline-color)"')
           .gsub('fill="#1C1F23"', 'fill="var(--vitae-support-warning-icon-ink)"')
      else
        svg.gsub(/fill="#(212121|23374D)"/i, 'fill="currentColor"').gsub(/stroke="#(212121|23374D)"/i, 'stroke="currentColor"')
      end
      svg.sub("<svg ", %(<svg class="#{class_name}" #{a11y} ))
    end

    def path(key) = File.join(DIR, "#{key}.svg")

    def read(key)
      @cache ||= {}
      @cache[key] ||= File.read(path(key))
    end
  end
end
