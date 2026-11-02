# frozen_string_literal: true

module Vitae
  # @label Checkbox, Radio and Toggle
  # @logical_path Forms
  class CheckboxComponentPreview < ViewComponent::Preview
    # @param label text
    # @param checked select { choices: ["false", "true", indeterminate] }
    # @param description text
    # @param error text
    # @param disabled toggle
    def checkbox(label: "Bronze", checked: "false", description: "", error: "", disabled: false)
      value = { "true" => true, "false" => false }.fetch(checked, :indeterminate)
      render Vitae::CheckboxComponent.new(label: label, name: "levels[]", value: label.downcase, checked: value, description: description.presence, error: error.presence, disabled: disabled)
    end

    # @label Radio group
    def radio_group
      render_with_template
    end

    # @param on toggle
    # @param disabled toggle
    def toggle(on: false, disabled: false)
      render Vitae::ToggleComponent.new(label: "Email me reminders", on: on, disabled: disabled, description: "We send a reminder 30 days before open enrollment ends.")
    end
  end
end
