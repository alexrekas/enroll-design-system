# frozen_string_literal: true

module Vitae
  # @label Progress bar
  # @logical_path Feedback
  class ProgressBarComponentPreview < ViewComponent::Preview
    # @param value number
    # @param show_label toggle
    def playground(value: 45, show_label: true)
      render_with_template(locals: { value: value.to_i, show_label: show_label })
    end
  end
end
