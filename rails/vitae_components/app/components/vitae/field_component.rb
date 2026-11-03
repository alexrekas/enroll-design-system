# frozen_string_literal: true

module Vitae
  # Shared field anatomy for Input and Dropdown: label, optional required marker and info button,
  # 44px control, helper text and an error message. Use Vitae::InputComponent or Vitae::DropdownComponent.
  class FieldComponent < BaseComponent
    # label:     visible label (keep it even if hidden with show_label: false)
    # name:      form field name, e.g. "household[income]"
    # value:     current value
    # helper:    hint under the field (linked with aria-describedby)
    # error:     error message; also sets aria-invalid="true"
    # required:  adds the red asterisk and the required attribute
    # info:      shows the 24×24 info toggletip button next to the label
    # state:     "hover", "active" or "focus" forces that look (documentation only); "error" and "disabled" are real states
    # id:        control id (generated when omitted)
    # **html:    extra attributes for the <input>/<select>, e.g. autocomplete:, inputmode:
    def initialize(label:, name: nil, value: nil, placeholder: nil, helper: nil, error: nil, required: false, info: false, show_label: true,
                   leading_icon: nil, trailing_icon: nil, options: [], disabled: false, state: nil, id: nil, width: nil, **html)
      @width = width # :full or :half inside a Field-set row
      @label = label
      @name = name
      @value = value
      @placeholder = placeholder
      @helper = helper
      @error = error
      @required = required
      @info = info
      @show_label = show_label
      @leading_icon = leading_icon
      @trailing_icon = trailing_icon
      @options = options
      @state = state&.to_s
      @disabled = disabled || @state == "disabled"
      @id = id || self.class.next_id("field")
      @html = html
    end

    def kind = "input"
    def helper_id = "#{@id}-help"
    def error_id = "#{@id}-error"

    def described_by
      ids = [(@helper.present? ? helper_id : nil), (@error.present? ? error_id : nil)].compact
      ids.empty? ? nil : ids.join(" ")
    end

    def control_class
      classes("vitae-input", (kind == "select" ? "vitae-select" : nil), (@leading_icon ? "has-leading" : nil), (@trailing_icon ? "has-trailing" : nil),
              (%w[hover active focus].include?(@state) ? "is-#{@state}" : nil))
    end

    def control_attrs
      { id: @id, class: control_class, "aria-describedby": described_by, "aria-invalid": (@error.present? || @state == "error") ? "true" : nil,
        required: @required, disabled: @disabled, name: @name }
    end

    def field_class = classes("vitae-field", (@width ? "is-#{@width}" : nil))

    def label_row_class = classes("vitae-field__label-row", (@show_label ? nil : "vitae-visually-hidden"))
  end
end
