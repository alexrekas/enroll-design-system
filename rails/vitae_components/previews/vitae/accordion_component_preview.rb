# frozen_string_literal: true

module Vitae
  # @label Accordion
  # @logical_path Layout and data
  class AccordionComponentPreview < ViewComponent::Preview
    # @param style select { choices: [divided, bordered] }
    # @param expand_all toggle
    def playground(style: "divided", expand_all: true)
      render_with_template(locals: { style: style, expand_all: expand_all })
    end
  end
end
