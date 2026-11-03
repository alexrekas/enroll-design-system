# frozen_string_literal: true

module Vitae
  # Checkbox. Storybook: Vitae 27/Components/Forms/Checkbox. Figma: Checkbox.
  #
  #   render Vitae::CheckboxComponent.new(label: "Email me reminders", name: "reminders", checked: true)
  #   render Vitae::CheckboxComponent.new(label: "Select all rows", checked: :indeterminate)   # set input.indeterminate in JS
  #   render Vitae::CheckboxComponent.new(label: "I agree", name: "agree", error: "Check the box to continue.")
  class CheckboxComponent < BaseComponent
    # checked: true, false or :indeterminate
    # description: second line under the label
    # state: "hover", "active" or "focus" forces that look (documentation only); "error" and "disabled" are real states
    # label: nil renders no <label> (when a selectable card is the label); hide_label: true keeps it for screen readers only
    def initialize(label:, name: nil, value: nil, checked: false, description: nil, error: nil, disabled: false, state: nil, id: nil, hide_label: false, **html)
      @label = label
      @hide_label = hide_label
      @name = name
      @value = value
      @checked = checked.to_s
      @description = description
      @error = error
      @state = state&.to_s
      @disabled = disabled || @state == "disabled"
      @id = id || self.class.next_id(radio? ? "radio" : "cb")
      @html = html
    end

    def radio? = false
    def error_id = @error.present? ? "#{@id}-error" : nil

    def wrapper_class
      classes("vitae-check", (radio? ? "vitae-check--radio" : nil), (%w[hover active focus error].include?(@state) ? "is-#{@state}" : nil))
    end

    def mark
      return '<span class="vitae-check__dot"></span>'.html_safe if radio?
      return '<span class="vitae-check__dash"></span>'.html_safe if @checked == "indeterminate"
      icon("checkmark", 16, "filled")
    end

    def input_attrs
      { class: "vitae-check__input", type: radio? ? "radio" : "checkbox", id: @id, name: @name, value: @value, checked: @checked == "true",
        disabled: @disabled, "aria-invalid": (@error.present? || @state == "error") ? "true" : nil, "aria-describedby": error_id,
        "data-indeterminate": @checked == "indeterminate" }
    end
  end
end
