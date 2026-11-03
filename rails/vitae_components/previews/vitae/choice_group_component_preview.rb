# frozen_string_literal: true

module Vitae
  # @label Choice group and Field-set
  # @logical_path Forms
  class ChoiceGroupComponentPreview < ViewComponent::Preview
    # @param type select "Radio for one answer, checkbox for any number of answers." { choices: [radio, checkbox] }
    # @param error toggle "Show the group error (in code, error: takes the message)."
    # @param inline toggle "Options side by side. Only for two or three short options like Yes / No."
    def choice_group(type: "radio", error: false, inline: false)
      radio = type == "radio"
      render Vitae::ChoiceGroupComponent.new(
        type: type, inline: inline, name: radio ? "pregnant" : "other_coverage[]",
        legend: radio ? "Is anyone in your household pregnant?" : "Does anyone have other health coverage?",
        helper: radio ? "Pregnancy can affect what coverage people qualify for." : "Select all that apply.",
        options: (radio ? %w[Yes No] : ["Medicare", "Medicaid or CHIP", "Coverage through a job", "VA health care"]).map { |l| { label: l, value: l.parameterize } },
        error: error ? (radio ? "Choose Yes or No." : "Choose at least one, or None of these.") : nil
      )
    end

    # @label Field-set (address)
    def fieldset
      render_with_template
    end
  end
end
