# frozen_string_literal: true

module Vitae
  # @label Dropdown
  # @logical_path Forms
  class DropdownComponentPreview < ViewComponent::Preview
    # @param label text
    # @param value select { choices: ["", Single, Married filing jointly, Married filing separately, Head of household] }
    # @param error text
    # @param required toggle
    # @param disabled toggle
    def playground(label: "Tax filing status", value: "", error: "", required: true, disabled: false)
      render Vitae::DropdownComponent.new(label: label, name: "filing_status", value: value, error: error.presence, required: required, disabled: disabled,
                                          options: ["Single", "Married filing jointly", "Married filing separately", "Head of household"])
    end
  end
end
