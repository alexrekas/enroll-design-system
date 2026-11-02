# frozen_string_literal: true

module Vitae
  # Radio. Storybook: Vitae 27/Components/Forms/Radio. Figma: Radio.
  # Always inside a <fieldset> with a <legend> (see Choice group), sharing one name.
  #
  #   render Vitae::RadioComponent.new(label: "Yes", name: "has_job_coverage", value: "yes", checked: true)
  class RadioComponent < CheckboxComponent
    def radio? = true
  end
end
