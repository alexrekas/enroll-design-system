# frozen_string_literal: true

module Vitae
  # Date picker: typed MM/DD/YYYY entry with an optional calendar. Storybook: Vitae 27/Components/Forms/Date picker.
  # Typing always works (date of birth never needs the calendar). Open/close and keyboard navigation are wired with JS.
  #
  #   render Vitae::DatePickerComponent.new(label: "Date of birth", name: "dob", value: "03/14/1985")
  class DatePickerComponent < BaseComponent
    # open: shows the calendar (documentation; JS toggles it) · month/selected/today: Dates for the calendar
    # autocomplete: "bday" for date of birth (the default); pass nil for other dates
    def initialize(label: "Date of birth", name: nil, value: "", open: false, month: nil, selected: nil, today: Date.today, autocomplete: "bday", id: nil, **html)
      @label = label
      @name = name
      @value = value
      @open = open
      @month = month || selected || today
      @selected = selected
      @today = today
      @autocomplete = autocomplete
      @id = id || self.class.next_id("date")
      @html = html
    end

    def calendar = render(Vitae::CalendarComponent.new(month: @month, selected: @selected, today: @today))
  end
end
