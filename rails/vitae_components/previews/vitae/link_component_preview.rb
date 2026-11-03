# frozen_string_literal: true

module Vitae
  # @label Link
  # @logical_path Actions
  class LinkComponentPreview < ViewComponent::Preview
    # @param label text "Link text. Say where it goes; avoid click here."
    # @param standalone toggle "On its own line, SemiBold, with a trailing icon. Off: inline and underlined, inside a sentence."
    # @param icon select "Standalone only: arrow-right for the next page, external-link when it opens another site." { choices: [arrow-right, external-link, ""] }
    def playground(label: "View plan details", standalone: true, icon: "arrow-right")
      render Vitae::LinkComponent.new(label: label, standalone: standalone, icon: icon.presence)
    end

    # @label In running text
    def in_running_text
      render_with_template
    end
  end
end
