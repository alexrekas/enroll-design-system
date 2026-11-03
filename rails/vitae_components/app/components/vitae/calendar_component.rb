# frozen_string_literal: true

require "date"

module Vitae
  # The calendar popover used by the Date picker. Storybook: Vitae 27/Components/Forms/Date picker. Figma: Calendar, Calendar/Day.
  #
  #   render Vitae::CalendarComponent.new(month: Date.new(2026, 10, 1), selected: Date.new(2026, 10, 14), today: Date.current)
  class CalendarComponent < BaseComponent
    MONTHS = %w[January February March April May June July August September October November December].freeze

    def initialize(month: Date.today, selected: nil, today: Date.today, id: nil)
      @first = Date.new(month.year, month.month, 1)
      @selected = selected
      @today = today
      @id = id || self.class.next_id("cal")
    end

    def weeks
      last = @first.next_month.prev_day
      cells = (@first - @first.wday...@first).map { |d| [d, "outside"] }
      cells += (@first..last).map { |d| [d, d == @today ? "today" : d == @selected ? "selected" : "in"] }
      d = last.next_day
      until (cells.size % 7).zero?
        cells << [d, "outside"]
        d = d.next_day
      end
      cells.each_slice(7).to_a
    end

    def day(date, status)
      td = status == "selected" ? '<td aria-selected="true">' : "<td>"
      btn = attrs(type: "button", class: classes("vitae-day", (status == "outside" ? "is-outside" : nil)), "aria-current": (status == "today" ? "date" : nil), tabindex: (status == "selected" ? 0 : -1))
      "#{td}<button#{btn}>#{date.day}</button></td>"
    end
  end
end
