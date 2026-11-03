# frozen_string_literal: true

module Vitae
  # @label Modal
  # @logical_path Feedback
  class ModalComponentPreview < ViewComponent::Preview
    # @param type select { choices: [standard, info, success, warning, error] }
    # @param title text
    # @param body textarea
    # @param primary text
    # @param secondary_label text
    # @param secondary toggle
    # @param close toggle
    def playground(type: "warning", title: "Discard your changes?", body: "You haven't saved the changes to your household. If you leave now, they'll be lost.",
                   primary: "Discard changes", secondary_label: "Keep editing", secondary: true, close: true)
      render Vitae::ModalComponent.new(type: type, title: title, body: body, primary: primary, secondary_label: secondary_label, secondary: secondary, close: close)
    end
  end
end
