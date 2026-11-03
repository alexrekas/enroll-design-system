# frozen_string_literal: true

module Vitae
  # @label Card
  # @logical_path Layout and data
  class CardComponentPreview < ViewComponent::Preview
    # @label Static
    def static
      render_with_template
    end

    # @param type select "Radio or Checkbox makes the whole card the label of a real input. Static (no type) holds content only." { choices: [radio, checkbox] }
    # @param checked toggle "Selected."
    # @param disabled toggle "Disables the control (disabled attribute). Prefer keeping it enabled and explaining what is missing."
    def selectable(type: "radio", checked: true, disabled: false)
      render Vitae::CardComponent.new(type: type, name: "payment_plan", value: "monthly", title: "Monthly payment", body: "Pay $412.88 on the 1st of each month.", checked: checked, disabled: disabled)
    end
  end
end
