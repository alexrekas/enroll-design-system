# frozen_string_literal: true

module Vitae
  # @label Alert
  # @logical_path Feedback
  class AlertComponentPreview < ViewComponent::Preview
    # @param type select { choices: [info, success, warning, error] }
    # @param title text
    # @param message textarea
    # @param link text
    # @param dismissible toggle
    def playground(type: "info", title: "Your application was submitted", message: "We'll email you when your eligibility results are ready.", link: "View your application", dismissible: true)
      render Vitae::AlertComponent.new(type: type, title: title, message: message, link: link.presence, dismissible: dismissible)
    end

    # @label All types
    def all_types
      render_with_template
    end
  end
end
