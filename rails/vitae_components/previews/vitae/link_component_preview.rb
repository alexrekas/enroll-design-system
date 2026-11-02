# frozen_string_literal: true

module Vitae
  # @label Link
  # @logical_path Actions
  class LinkComponentPreview < ViewComponent::Preview
    # @param label text
    # @param standalone toggle
    # @param icon select { choices: [arrow-right, external-link, ""] }
    def playground(label: "View plan details", standalone: true, icon: "arrow-right")
      render Vitae::LinkComponent.new(label: label, standalone: standalone, icon: icon.presence)
    end

    # @label In running text
    def in_running_text
      render_with_template
    end
  end
end
