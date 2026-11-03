# frozen_string_literal: true

module Vitae
  # @label Button
  # @logical_path Actions
  class ButtonComponentPreview < ViewComponent::Preview
    # Change the label, style, level and icons in the Params panel. Use the Display panel for client and mode.
    # @param label text "Button text. Start with a verb that says what happens."
    # @param style select "Solid for the main action, Outline for secondary actions, Ghost for Cancel or inline tools." { choices: [solid, outline, ghost] }
    # @param level select "Color role. Destructive only for irreversible actions like Remove." { choices: [primary, secondary, tertiary, destructive] }
    # @param icon_left text "Fluent icon before the label, e.g. add. Empty for none."
    # @param icon_right text "Fluent icon after the label, e.g. arrow-right."
    # @param disabled toggle "Disables the control (disabled attribute). Prefer keeping it enabled and explaining what is missing."
    def playground(label: "Continue", style: "solid", level: "primary", icon_left: "", icon_right: "", disabled: false)
      render Vitae::ButtonComponent.new(label: label, style: style, level: level, icon_left: icon_left.presence, icon_right: icon_right.presence, disabled: disabled)
    end

    # @label All styles and levels
    def all_styles_and_levels
      render_with_template
    end

    # A link that looks like a button, for navigation such as a phone number.
    def as_a_link
      render Vitae::ButtonComponent.new(label: "(855) 532-5465", href: "tel:+18555325465", style: :ghost, icon_left: "phone")
    end
  end
end
