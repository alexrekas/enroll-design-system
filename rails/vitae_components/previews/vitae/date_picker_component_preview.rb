# frozen_string_literal: true

module Vitae
  # @label Date picker
  # @logical_path Forms
  class DatePickerComponentPreview < ViewComponent::Preview
    # @param open toggle "Show the calendar. People can always type the date instead."
    def playground(open: true)
      render_with_template(locals: { open: open })
    end
  end
end
