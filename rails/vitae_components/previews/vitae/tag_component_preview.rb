# frozen_string_literal: true

module Vitae
  # @label Tag
  # @logical_path Feedback
  class TagComponentPreview < ViewComponent::Preview
    # @param label text
    # @param type select { choices: [neutral, brand, info, success, warning, error, current-plan, dc-healthy, dc-essential, me-clear-choice, me-current-plan, ma-premium-value] }
    # @param show_icon toggle
    def playground(label: "Approved", type: "success", show_icon: true)
      render Vitae::TagComponent.new(label: label, type: type, show_icon: show_icon)
    end

    # @label Metal badges
    def metal_badges
      render_with_template
    end
  end
end
