# frozen_string_literal: true

module Vitae
  # @label Menu and Search
  # @logical_path Layout and data
  class MenuComponentPreview < ViewComponent::Preview
    def menu
      render Vitae::MenuComponent.new(label: "Plan", entries: [
        { group: "Gold", items: [{ label: "CareFirst BlueChoice HMO Gold $0", secondary: "$442.07 per month", icon: "health" },
                                 { label: "Kaiser Permanente Gold 0/20", secondary: "$468.30 per month", icon: "health", state: :selected }] },
        :divider,
        { group: "Silver", items: [{ label: "Kaiser Permanente DC Silver 2500/40 HMO", secondary: "$389.15 per month", icon: "health" }] }
      ])
    end

    # @param value text
    def search(value: "kai")
      render Vitae::SearchComponent.new(label: "Search plans", name: "q", value: value, open: true,
        results: [{ label: "Kaiser Permanente DC Silver 2500/40 HMO", state: :highlighted }, { label: "Kaiser Permanente Gold 0/20" }])
    end
  end
end
