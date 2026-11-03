# frozen_string_literal: true

module Vitae
  # @label Table
  # @logical_path Layout and data
  class TableComponentPreview < ViewComponent::Preview
    # @label Data grid
    # @param width select { choices: ["", "560", "375"] }
    def data_grid(width: "")
      render_with_template(locals: { width: width.presence&.to_i })
    end

    # @label Summary
    def summary
      render_with_template
    end
  end
end
