# frozen_string_literal: true

module Vitae
  # Tag. Storybook: Vitae 27/Components/Feedback/Tag. Figma: Tag.
  # Status tags carry an icon so color is never the only cue. Program tags belong to one client only.
  #
  #   render Vitae::TagComponent.new(label: "Approved", type: :success)
  #   render Vitae::TagComponent.new(label: "Draft", type: :neutral, show_icon: false)
  class TagComponent < BaseComponent
    ICONS = {
      "info" => %w[info filled], "success" => %w[success filled], "warning" => %w[warning two-tone], "error" => %w[error filled],
      "dc-healthy" => %w[star filled], "dc-essential" => %w[bookmark filled], "me-clear-choice" => %w[success regular], "me-current-plan" => %w[star filled]
    }.freeze
    TYPES = %w[neutral brand info success warning error current-plan dc-healthy dc-essential me-clear-choice me-current-plan ma-premium-value].freeze

    def initialize(label:, type: :success, show_icon: true, **html)
      @label = label
      @type = type.to_s
      raise ArgumentError, "type must be one of #{TYPES.join(', ')}" unless TYPES.include?(@type)
      @show_icon = show_icon
      @html = html
    end

    def tag_icon
      i = ICONS[@type]
      @show_icon && i ? icon(i[0], 16, i[1]) : ""
    end
  end
end
