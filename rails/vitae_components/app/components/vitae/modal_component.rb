# frozen_string_literal: true

module Vitae
  # Modal dialog. Storybook: Vitae 27/Components/Feedback/Modal. Figma: Modal.
  # Renders the dialog inside a scrim, as the Storybook docs show it. Open and close it with your own JS or Stimulus
  # (move focus in, trap Tab, Esc closes, return focus to the trigger), or place the .vitae-modal inside a native <dialog>.
  #
  #   render Vitae::ModalComponent.new(type: :warning, title: "Discard your changes?",
  #     body: "You haven't saved the changes to your household. If you leave now, they'll be lost.",
  #     primary: "Discard changes", secondary_label: "Keep editing")
  class ModalComponent < BaseComponent
    ICONS = { "info" => %w[info filled], "success" => %w[success filled], "warning" => %w[warning two-tone], "error" => %w[error filled] }.freeze
    TYPES = %w[standard info success warning error].freeze

    # type: :standard, :info, :success, :warning (destructive buttons), :error · body: text (or pass a block)
    # primary / secondary_label: button labels, verbs ("Discard changes"), never OK/Yes · secondary: false hides it
    def initialize(title:, body: nil, type: :standard, primary: "Continue", secondary_label: "Cancel", secondary: true, close: true, id: nil, **html)
      @type = type.to_s
      raise ArgumentError, "type must be one of #{TYPES.join(', ')}" unless TYPES.include?(@type)
      @title = title
      @body = body
      @primary = primary
      @secondary_label = secondary_label
      @secondary = secondary
      @close = close
      @id = id || self.class.next_id("modal")
      @html = html
    end

    def role = %w[warning error].include?(@type) ? "alertdialog" : "dialog"
    def level = @type == "warning" ? :destructive : :primary
    def body_text = @body ? esc(@body) : content
  end
end
