# frozen_string_literal: true

module Vitae
  # Toggle (switch) for settings that apply immediately. Storybook: Vitae 27/Components/Forms/Toggle. Figma: Toggle.
  # Wire the click to flip aria-checked and save the setting (Stimulus or your own JS).
  #
  #   render Vitae::ToggleComponent.new(label: "Paperless notices", on: account.paperless?)
  class ToggleComponent < BaseComponent
    def initialize(label:, on: false, description: nil, disabled: false, state: nil, id: nil, **html)
      @label = label
      @on = on
      @description = description
      @state = state&.to_s
      @disabled = disabled || @state == "disabled"
      @id = id || self.class.next_id("toggle")
      @html = html
    end

    def wrapper_class = classes("vitae-toggle", (%w[hover focus].include?(@state) ? "is-#{@state}" : nil))
  end
end
