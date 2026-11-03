# frozen_string_literal: true

module Vitae
  # @label Dropdown
  # @logical_path Forms
  class DropdownComponentPreview < ViewComponent::Preview
    # @param label text "Visible label. Always set it."
    # @param value select "Selected option. Empty shows the placeholder (Select)." { choices: ["", Single, Married filing jointly, Married filing separately, Head of household] }
    # @param error text "Error message under the field; sets aria-invalid. Say how to fix it."
    # @param required toggle "Adds the asterisk and the required attribute."
    # @param disabled toggle "Disables the control (disabled attribute). Prefer keeping it enabled and explaining what is missing."
    def playground(label: "Tax filing status", value: "", error: "", required: true, disabled: false)
      render Vitae::DropdownComponent.new(label: label, name: "filing_status", value: value, error: error.presence, required: required, disabled: disabled,
                                          options: ["Single", "Married filing jointly", "Married filing separately", "Head of household"])
    end
  end
end
