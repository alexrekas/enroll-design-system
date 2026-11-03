# frozen_string_literal: true

module Vitae
  # @label Modal
  # @logical_path Feedback
  class ModalComponentPreview < ViewComponent::Preview
    # @param type select "Standard has no icon; the others add a status icon by the title." { choices: [standard, info, success, warning, error] }
    # @param title text "Dialog title and its accessible name. Ask the question or say the outcome."
    # @param body textarea "Explanation under the title."
    # @param primary text "Main button label. Name the action, not OK."
    # @param secondary_label text "Second button label."
    # @param secondary toggle "Show the second button."
    # @param close toggle "Show the close (X) button. Esc closes the dialog either way."
    def playground(type: "warning", title: "Discard your changes?", body: "You haven't saved the changes to your household. If you leave now, they'll be lost.",
                   primary: "Discard changes", secondary_label: "Keep editing", secondary: true, close: true)
      render Vitae::ModalComponent.new(type: type, title: title, body: body, primary: primary, secondary_label: secondary_label, secondary: secondary, close: close)
    end
  end
end
