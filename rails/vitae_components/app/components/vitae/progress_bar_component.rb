# frozen_string_literal: true

module Vitae
  # Progress bar for one task, such as a file upload. Storybook: Vitae 27/Components/Feedback/Progress bar.
  #
  #   render Vitae::ProgressBarComponent.new(value: 45, name: "Uploading Employer_letter.pdf")
  #   render Vitae::ProgressBarComponent.new(value: 100, label: "Upload complete", name: "Employer_letter.pdf")
  class ProgressBarComponent < BaseComponent
    # value: 0–100 · label: visible text (default "Uploading… 45%") · name: accessible name, e.g. the file name
    def initialize(value:, label: nil, name: "Upload progress", show_label: true, id: nil, **html)
      @value = value.to_i.clamp(0, 100)
      @label = label || "Uploading… #{@value}%"
      @name = name
      @show_label = show_label
      @id = id || self.class.next_id("pb")
      @html = html
    end
  end
end
