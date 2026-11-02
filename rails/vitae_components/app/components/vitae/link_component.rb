# frozen_string_literal: true

module Vitae
  # Link. Storybook: Vitae 27/Components/Actions/Link. Figma: Link.
  #
  #   render Vitae::LinkComponent.new(label: "Learn how plan levels work", href: "/help/levels")            # inline, in running text
  #   render Vitae::LinkComponent.new(label: "View plan details", href: plan_path(plan), standalone: true)   # own line, arrow
  #   render Vitae::LinkComponent.new(label: "IRS Form 1095-A", href: url, standalone: true, icon: "external-link")
  class LinkComponent < BaseComponent
    # standalone: SemiBold link on its own line with a trailing icon ("arrow-right" by default; nil for none)
    # state: "hover", "pressed" or "focus" forces that look (documentation only)
    def initialize(label: nil, href: "#", standalone: false, icon: "arrow-right", state: nil, **html)
      @label = label
      @href = href
      @standalone = standalone
      @trailing_icon = icon
      @state = state&.to_s
      @html = html
    end

    def css_class
      classes("vitae-link", (@standalone ? "vitae-link--standalone" : nil), (@state && @state != "rest" ? "is-#{@state}" : nil))
    end

    def label_text = @label ? esc(@label) : content
  end
end
