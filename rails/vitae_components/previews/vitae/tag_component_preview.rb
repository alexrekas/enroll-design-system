# frozen_string_literal: true

module Vitae
  # @label Tag
  # @logical_path Feedback
  class TagComponentPreview < ViewComponent::Preview
    # @param label text "Tag text. Keep the capitalization the product already uses."
    # @param type select "Status color (neutral to error) or a client program tag. Client tags only on their own client." { choices: [neutral, brand, info, success, warning, error, current-plan, dc-healthy, dc-essential, me-clear-choice, me-current-plan, ma-premium-value] }
    # @param show_icon toggle "Show the leading icon. Keep it on status tags so meaning does not rely on color."
    def playground(label: "Approved", type: "success", show_icon: true)
      render Vitae::TagComponent.new(label: label, type: type, show_icon: show_icon)
    end

    # @label Metal badges
    def metal_badges
      render_with_template
    end
  end
end
