# frozen_string_literal: true

module Vitae
  # @label Alert
  # @logical_path Feedback
  class AlertComponentPreview < ViewComponent::Preview
    # @param type select "Sets the color and icon. The icon is the cue that does not rely on color." { choices: [info, success, warning, error] }
    # @param title text "Bold first line. Short and specific."
    # @param message textarea "Detail under the title."
    # @param link text "Optional link text after the message (href with link_href:). Empty for none."
    # @param dismissible toggle "Shows a close button. Do not let people dismiss errors they still need to fix."
    def playground(type: "info", title: "Your application was submitted", message: "We'll email you when your eligibility results are ready.", link: "View your application", dismissible: true)
      render Vitae::AlertComponent.new(type: type, title: title, message: message, link: link.presence, dismissible: dismissible)
    end

    # @label All types
    def all_types
      render_with_template
    end
  end
end
