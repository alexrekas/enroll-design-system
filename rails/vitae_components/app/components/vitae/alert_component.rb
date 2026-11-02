# frozen_string_literal: true

module Vitae
  # Alert. Storybook: Vitae 27/Components/Feedback/Alert. Figma: Alert.
  #
  #   render Vitae::AlertComponent.new(type: :success, title: "Your plan is selected", message: "Pay your first premium to start coverage.")
  #   render Vitae::AlertComponent.new(type: :error, title: "There are 2 problems on this page", message: "Fix the fields marked below, then continue.", dismissible: false)
  class AlertComponent < BaseComponent
    ICONS = { "info" => %w[info filled], "success" => %w[success filled], "warning" => %w[warning two-tone], "error" => %w[error filled] }.freeze

    # type: :info, :success, :warning, :error (error uses role="alert"; move focus to it when it blocks the next step)
    # link / link_href: optional standalone link under the message
    # dismissible: shows the 32×32 Dismiss button (wire it with your own JS or Stimulus)
    def initialize(type: :info, title: nil, message: nil, link: nil, link_href: "#", dismissible: true, **html)
      @type = type.to_s
      raise ArgumentError, "type must be one of #{ICONS.keys.join(', ')}" unless ICONS.key?(@type)
      @title = title
      @message = message
      @link = link
      @link_href = link_href
      @dismissible = dismissible
      @html = html
    end

    def role = @type == "error" ? "alert" : "status"
    def message_text = @message ? esc(@message) : content
  end
end
