# frozen_string_literal: true

module Vitae
  # Card. Storybook: Vitae 27/Components/Layout and data/Card. Figma: Card.
  #
  # Static card with a tag and a footer action:
  #   <%= render Vitae::CardComponent.new(title: "Health coverage", body: "Marcus, Dana, Ava, Leo and Mia are covered through December 31, 2027.") do |card| %>
  #     <% card.with_tag { render Vitae::TagComponent.new(label: "Enrolled", type: :success) } %>
  #     <% card.with_footer { render Vitae::ButtonComponent.new(label: "View details", style: :outline) } %>
  #   <% end %>
  #
  # Selectable card (the whole card is the label for a real radio or checkbox; no buttons inside):
  #   render Vitae::CardComponent.new(type: :radio, name: "payment_plan", value: "monthly", title: "Monthly payment", body: "Pay $412.88 on the 1st of each month.", checked: true)
  class CardComponent < BaseComponent
    renders_one :tag
    renders_one :footer

    # type: :static, :radio or :checkbox (radio cards need a shared name:) · body: text (or pass a block) · checked/disabled/error for selectable cards
    # heading_level: 2–6 to fit the page outline (default 4) · state: "hover", "pressed" or "focus" (documentation only)
    def initialize(title:, body: nil, type: :static, name: nil, value: nil, checked: false, disabled: false, error: false, heading_level: 4, state: nil, **html)
      @title = title
      @body = body
      @type = type.to_s
      @name = name
      @value = value
      @checked = checked
      @disabled = disabled
      @error = error
      @heading_level = heading_level
      @state = state&.to_s
      @html = html
    end

    def selectable? = @type != "static"
    def heading_tag = "h#{@heading_level}"

    def css_class
      forced = %w[hover pressed focus].include?(@state) ? "is-#{@state}" : nil
      classes("vitae-card", forced, (@error ? "is-error" : nil), (selectable? && @checked ? "is-selected" : nil))
    end

    def control
      component = (@type == "radio" ? Vitae::RadioComponent : Vitae::CheckboxComponent)
        .new(label: nil, name: @name, value: @value, checked: @checked, disabled: @disabled)
      %(<span class="vitae-card__control">#{render(component)}</span>).html_safe
    end

    def body_text = @body ? esc(@body) : content
  end
end
