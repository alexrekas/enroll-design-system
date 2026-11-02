# frozen_string_literal: true

module Vitae
  # Dropdown: a native <select> for about 5–15 options (Radio for 2–4).
  # Storybook: Vitae 27/Components/Forms/Dropdown. Figma: Dropdown.
  #
  #   render Vitae::DropdownComponent.new(label: "Tax filing status", name: "filing_status", placeholder: "Select",
  #                                       options: ["Single", "Married filing jointly"], value: household.filing_status, required: true)
  #   options can also be [label, value] pairs: [["Married filing jointly", "mfj"], ...]
  class DropdownComponent < FieldComponent
    def initialize(placeholder: "Select", **args)
      super(placeholder: placeholder, **args)
    end

    def kind = "select"

    def option_tags
      @options.map do |opt|
        label, value = opt.is_a?(Array) ? opt : [opt, nil]
        selected = (value || label).to_s == @value.to_s && !@value.to_s.empty?
        %(<option#{attrs(value: value, selected: selected)}>#{esc(label)}</option>)
      end.join
    end

    def render_control
      placeholder = %(<option value="" disabled hidden#{@value.to_s.empty? ? ' selected' : ''}>#{esc(@placeholder.to_s.empty? ? 'Select' : @placeholder)}</option>)
      (%(<select#{attrs(**control_attrs, **@html)}>#{placeholder}#{option_tags}</select>) +
        icon("chevron-down", 20, "filled", class_name: "vitae-icon vitae-icon--trailing")).html_safe
    end
  end
end
