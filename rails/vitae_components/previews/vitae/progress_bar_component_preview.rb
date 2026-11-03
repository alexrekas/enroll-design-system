# frozen_string_literal: true

module Vitae
  # @label Progress bar
  # @logical_path Feedback
  class ProgressBarComponentPreview < ViewComponent::Preview
    # @param value number "Percent complete, 0 to 100."
    # @param show_label toggle "Show the label text. When off, screen readers still get it."
    def playground(value: 45, show_label: true)
      render_with_template(locals: { value: value.to_i, show_label: show_label })
    end
  end
end
