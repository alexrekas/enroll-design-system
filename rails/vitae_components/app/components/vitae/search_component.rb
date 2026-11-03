# frozen_string_literal: true

module Vitae
  # Search with suggestions. Storybook: Vitae 27/Components/Forms/Search. Figma: Search.
  #
  #   render Vitae::SearchComponent.new(label: "Search plans", name: "q", value: params[:q])
  #   render Vitae::SearchComponent.new(label: "Search plans", value: "kai", open: true,
  #                                     results: [{ label: "Kaiser Permanente Gold 0/20", state: :highlighted }])
  class SearchComponent < BaseComponent
    # label: kept for screen readers even though it's visually hidden · results show once there are 2+ characters
    def initialize(label: "Search plans", placeholder: nil, name: nil, value: "", open: false, results: [], id: nil, **html)
      @label = label
      @placeholder = placeholder || label
      @name = name
      @value = value.to_s
      @open = open
      @results = results
      @id = id || self.class.next_id("q")
      @html = html
    end

    def shown = @value.length >= 2 ? @results : []
    def status_text = "#{shown.size} result#{shown.size == 1 ? '' : 's'}"

    def menu
      entries = shown.map { |r| r.transform_keys(&:to_sym).merge(match: @value) }
      render(Vitae::MenuComponent.new(id: "#{@id}-list", style: "width:100%", entries: entries))
    end
  end
end
