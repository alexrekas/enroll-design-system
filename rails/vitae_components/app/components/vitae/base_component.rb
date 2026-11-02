# frozen_string_literal: true

module Vitae
  # Shared helpers for Vitae components.
  class BaseComponent < ViewComponent::Base
    # Same rule as esc() in the Storybook markup: escape & < > ".
    def esc(value) = ERB::Util.html_escape(value.to_s)

    # Inline SVG icon (decorative unless a label is given).
    def icon(name, size = 20, theme = "filled", class_name: "vitae-icon", label: nil)
      VitaeComponents::Icons.svg(name, size, theme, class_name: class_name, label: label).html_safe
    end

    # ` key="value"` pairs for an HTML tag; nil and false are skipped, true writes a bare attribute.
    def attrs(hash)
      hash.filter_map do |key, value|
        next if value.nil? || value == false
        value == true ? " #{key}" : %( #{key}="#{esc(value)}")
      end.join.html_safe
    end

    # Space-separated class list without blanks.
    def classes(*names) = names.flatten.compact.map(&:to_s).reject(&:empty?).join(" ")

    # A unique id for label/for and aria-describedby pairs.
    def self.next_id(prefix) = "#{prefix}-#{SecureRandom.hex(4)}"

    DEMO_STATES = %w[hover pressed focus active].freeze # forced visual states, for docs and previews only
  end
end
