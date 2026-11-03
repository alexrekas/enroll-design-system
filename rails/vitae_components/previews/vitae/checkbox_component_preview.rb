# frozen_string_literal: true

module Vitae
  # @label Checkbox, Radio and Toggle
  # @logical_path Forms
  class CheckboxComponentPreview < ViewComponent::Preview
    # @param label text "Label text. Clicking it toggles the box."
    # @param checked select "Indeterminate (mixed) is for a parent whose children are partly selected." { choices: ["false", "true", indeterminate] }
    # @param description text "Second line under the label, linked with aria-describedby."
    # @param error text "Error message under the box; sets aria-invalid."
    # @param disabled toggle "Disables the control (disabled attribute). Prefer keeping it enabled and explaining what is missing."
    def checkbox(label: "Bronze", checked: "false", description: "", error: "", disabled: false)
      value = { "true" => true, "false" => false }.fetch(checked, :indeterminate)
      render Vitae::CheckboxComponent.new(label: label, name: "levels[]", value: label.downcase, checked: value, description: description.presence, error: error.presence, disabled: disabled)
    end

    # @label Radio group
    def radio_group
      render_with_template
    end

    # @param on toggle "On or off. Use toggles for settings that apply immediately; in forms with Submit use a checkbox."
    # @param disabled toggle "Disables the control (disabled attribute). Prefer keeping it enabled and explaining what is missing."
    def toggle(on: false, disabled: false)
      render Vitae::ToggleComponent.new(label: "Email me reminders", on: on, disabled: disabled, description: "We send a reminder 30 days before open enrollment ends.")
    end
  end
end
