# frozen_string_literal: true

module Vitae
  # Accordion. Storybook: Vitae 27/Components/Layout and data/Accordion. Figma: Accordion, Accordion/Item.
  # Sections open independently; wire the header buttons to toggle aria-expanded and the panel's hidden attribute.
  #
  #   <%= render Vitae::AccordionComponent.new(style: :bordered) do |accordion| %>
  #     <% accordion.with_item(title: "Household", summary: "5 people", open: true) do %>
  #       <p>Marcus Bennett (41), Dana Bennett (39) …</p>
  #       <%= render Vitae::LinkComponent.new(label: "Edit household", href: edit_household_path, standalone: true) %>
  #     <% end %>
  #     <% accordion.with_item(title: "Income", summary: "$68,400 / year") do %>…<% end %>
  #   <% end %>
  class AccordionComponent < BaseComponent
    renders_many :items, lambda { |title:, summary: nil, open: false|
      ItemComponent.new(title: title, summary: summary, open: open, heading_level: @heading_level)
    }

    # style: :divided (FAQs, plan details, filters) or :bordered (review pages)
    # expand_all: shows the "Expand all" toolbar button · heading_level: 2–4 to fit the page outline
    def initialize(style: :divided, expand_all: true, heading_level: 3, **html)
      @style = style.to_s
      @expand_all = expand_all
      @heading_level = heading_level
      @html = html
    end

    # One section: a heading with a button, and a region panel.
    class ItemComponent < BaseComponent
      def initialize(title:, summary: nil, open: false, heading_level: 3, id: nil)
        @title = title
        @summary = summary
        @open = open
        @heading_level = heading_level
        @id = id || self.class.next_id("acc")
      end

      def heading_tag = "h#{@heading_level}"

      # Rendered in Ruby (no template) so the nested class needs no extra file.
      def call
        summary = @summary.present? ? %(<span class="vitae-accordion__summary">#{esc(@summary)}</span>) : ""
        html = %(<div class="vitae-accordion__item"><#{heading_tag} class="vitae-accordion__heading"><button type="button" class="vitae-accordion__button" aria-expanded="#{@open}" aria-controls="#{@id}"><span class="vitae-accordion__title">#{esc(@title)}</span>#{summary}#{icon("chevron-down", 20, "filled")}</button></#{heading_tag}>)
        html << %(<div class="vitae-accordion__panel" id="#{@id}" role="region"#{attrs(hidden: !@open)}>#{content}</div></div>)
        html.html_safe
      end
    end
  end
end
