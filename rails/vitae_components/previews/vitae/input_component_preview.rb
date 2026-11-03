# frozen_string_literal: true

module Vitae
  # @label Input
  # @logical_path Forms
  class InputComponentPreview < ViewComponent::Preview
    # @param label text "Visible label. Always set it, even with show_label: false."
    # @param value text "Current value."
    # @param placeholder text "Example format only (MM/DD/YYYY, $0). Put instructions in helper instead."
    # @param helper text "Hint under the field, linked with aria-describedby."
    # @param error text "Error message under the field; sets aria-invalid. Say how to fix it."
    # @param required toggle "Adds the asterisk and the required attribute."
    # @param info toggle "Adds an info button after the label that opens more help."
    # @param disabled toggle "Disables the control (disabled attribute). Prefer keeping it enabled and explaining what is missing."
    def playground(label: "Annual income", value: "", placeholder: "$0", helper: "Before taxes, for everyone in your household.", error: "", required: true, info: true, disabled: false)
      render Vitae::InputComponent.new(label: label, name: "income", value: value, placeholder: placeholder, helper: helper.presence, error: error.presence, required: required, info: info, disabled: disabled)
    end

    def with_icons
      render_with_template
    end
  end
end
