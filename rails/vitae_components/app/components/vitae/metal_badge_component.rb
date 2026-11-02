# frozen_string_literal: true

module Vitae
  # Metal badge (ACA plan level). Storybook: Vitae 27/Components/Feedback/Metal badge. Figma: Metal badge.
  #
  #   render Vitae::MetalBadgeComponent.new(level: "Gold")
  class MetalBadgeComponent < BaseComponent
    LEVELS = %w[Bronze Silver Gold Platinum Catastrophic].freeze

    def initialize(level:, **html)
      @level = level.to_s.capitalize
      raise ArgumentError, "level must be one of #{LEVELS.join(', ')}" unless LEVELS.include?(@level)
      @html = html
    end
  end
end
