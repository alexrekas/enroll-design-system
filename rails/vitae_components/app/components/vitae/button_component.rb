# frozen_string_literal: true

module Vitae
  # Button. Storybook: Vitae 27/Components/Actions/Button. Figma: Button/Solid, Button/Outline, Button/Ghost.
  #
  #   render Vitae::ButtonComponent.new(label: "Continue")
  #   render Vitae::ButtonComponent.new(label: "Cancel", style: :outline)
  #   render Vitae::ButtonComponent.new(label: "Remove", style: :ghost, level: :destructive, icon_left: "delete")
  #   render Vitae::ButtonComponent.new(label: "Call (855) 532-5465", href: "tel:+18555325465", style: :ghost)  # renders <a>
  #   render Vitae::ButtonComponent.new(type: "submit") { "Submit documents" }
  class ButtonComponent < BaseComponent
    STYLES = %w[solid outline ghost].freeze
    LEVELS = %w[primary secondary tertiary destructive].freeze

    # label:  button text (or pass a block)
    # style:  :solid (main action), :outline, :ghost
    # level:  :primary, :secondary, :tertiary, :destructive
    # icon_left / icon_right: icon name, e.g. "add", "arrow-right" (20px Filled)
    # href:   renders an <a> styled as a button (for navigation, e.g. tel: links)
    # type:   "button" (default), "submit" or "reset"
    # disabled: prefer keeping buttons enabled and explaining what's missing
    # state:  "hover", "pressed" or "focus" forces that look (documentation only)
    # **html: extra attributes, e.g. data: or aria-*
    def initialize(label: nil, style: :solid, level: :primary, icon_left: nil, icon_right: nil, href: nil, type: "button", disabled: false, state: nil, **html)
      @label = label
      @style = style.to_s
      @level = level.to_s
      @icon_left = icon_left
      @icon_right = icon_right
      @href = href
      @type = type
      @disabled = disabled
      @state = state&.to_s
      @html = html
      raise ArgumentError, "style must be one of #{STYLES.join(', ')}" unless STYLES.include?(@style)
      raise ArgumentError, "level must be one of #{LEVELS.join(', ')}" unless LEVELS.include?(@level)
    end

    def css_class
      classes("vitae-btn", "vitae-btn--#{@style}", "vitae-btn--#{@level}", (%w[hover pressed focus].include?(@state) ? "is-#{@state}" : nil))
    end

    def label_text = @label ? esc(@label) : content
  end
end
