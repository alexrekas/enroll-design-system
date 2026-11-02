# frozen_string_literal: true

module Vitae
  # Input (single-line text). Storybook: Vitae 27/Components/Forms/Input. Figma: Input.
  #
  #   render Vitae::InputComponent.new(label: "Annual income", name: "income", placeholder: "$0",
  #                                    helper: "Before taxes, for everyone in your household.", required: true)
  #   render Vitae::InputComponent.new(label: "Email", name: "email", type: "email", leading_icon: "mail", autocomplete: "email")
  #   render Vitae::InputComponent.new(label: "First name", name: "first_name", error: "Enter your first name.")
  class InputComponent < FieldComponent
    # type: "text", "email", "tel", "number", "password", "search" …
    def initialize(type: "text", **args)
      @input_type = type
      super(**args)
    end

    def render_control
      input = %(<input#{attrs(type: @input_type, **control_attrs, placeholder: @placeholder.to_s, value: @value.to_s, **@html)}>)
      lead = @leading_icon ? icon(@leading_icon, 20, "filled", class_name: "vitae-icon vitae-icon--leading") : ""
      trail = @trailing_icon ? icon(@trailing_icon, 20, "filled", class_name: "vitae-icon vitae-icon--trailing") : ""
      (input + lead + trail).html_safe
    end
  end
end
