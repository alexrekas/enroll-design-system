# frozen_string_literal: true

module Vitae
  # Choice group: one question with Radio (choose one) or Checkbox (choose any) options.
  # Storybook: Vitae 27/Components/Forms/Choice group. Figma: Choice group.
  #
  #   render Vitae::ChoiceGroupComponent.new(legend: "Is anyone in your household pregnant?", name: "pregnant",
  #     helper: "Pregnancy can affect what coverage people qualify for.",
  #     options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no", checked: true }],
  #     error: @form.errors[:pregnant].first)
  class ChoiceGroupComponent < BaseComponent
    # type: :radio or :checkbox · options: [{ label:, value:, checked:, description: }] · inline: for 2–3 short options
    def initialize(legend:, options:, type: :radio, name: nil, helper: nil, error: nil, inline: false, required: true, id: nil, **html)
      @legend = legend
      @options = options.map { |o| o.transform_keys(&:to_sym) }
      @type = type.to_s
      @helper = helper
      @error = error
      @inline = inline
      @required = required
      @id = id || self.class.next_id("q")
      @name = name || @id
      @html = html
    end

    def described_by
      ids = [(@helper.present? ? "#{@id}-help" : nil), (@error.present? ? "#{@id}-error" : nil)].compact
      ids.empty? ? nil : ids.join(" ")
    end

    def option(o)
      klass = @type == "radio" ? Vitae::RadioComponent : Vitae::CheckboxComponent
      render(klass.new(label: o[:label], name: @name, value: o[:value], checked: o[:checked] ? true : false, description: o[:description], state: (@error.present? ? "error" : nil)))
    end
  end
end
