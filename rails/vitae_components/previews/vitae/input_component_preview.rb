# frozen_string_literal: true

module Vitae
  # @label Input
  # @logical_path Forms
  class InputComponentPreview < ViewComponent::Preview
    # @param label text
    # @param value text
    # @param placeholder text
    # @param helper text
    # @param error text
    # @param required toggle
    # @param info toggle
    # @param disabled toggle
    def playground(label: "Annual income", value: "", placeholder: "$0", helper: "Before taxes, for everyone in your household.", error: "", required: true, info: true, disabled: false)
      render Vitae::InputComponent.new(label: label, name: "income", value: value, placeholder: placeholder, helper: helper.presence, error: error.presence, required: required, info: info, disabled: disabled)
    end

    def with_icons
      render_with_template
    end
  end
end
