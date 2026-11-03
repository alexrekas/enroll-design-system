# frozen_string_literal: true

module Vitae
  # @label Card
  # @logical_path Layout and data
  class CardComponentPreview < ViewComponent::Preview
    # @label Static
    def static
      render_with_template
    end

    # @param type select { choices: [radio, checkbox] }
    # @param checked toggle
    # @param disabled toggle
    def selectable(type: "radio", checked: true, disabled: false)
      render Vitae::CardComponent.new(type: type, name: "payment_plan", value: "monthly", title: "Monthly payment", body: "Pay $412.88 on the 1st of each month.", checked: checked, disabled: disabled)
    end
  end
end
