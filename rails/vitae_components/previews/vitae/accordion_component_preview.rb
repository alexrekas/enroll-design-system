# frozen_string_literal: true

module Vitae
  # @label Accordion
  # @logical_path Layout and data
  class AccordionComponentPreview < ViewComponent::Preview
    # @param style select "Divided: rules between sections. Bordered: each section in its own box." { choices: [divided, bordered] }
    # @param expand_all toggle "Show the Expand all / Collapse all button."
    def playground(style: "divided", expand_all: true)
      render_with_template(locals: { style: style, expand_all: expand_all })
    end
  end
end
