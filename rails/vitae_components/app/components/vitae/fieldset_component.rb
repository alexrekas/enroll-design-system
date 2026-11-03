# frozen_string_literal: true

module Vitae
  # Field-set: a labelled group of related fields that reflows with width.
  # Storybook: Vitae 27/Components/Forms/Field-set. Figma: Field-set.
  #
  #   <%= render Vitae::FieldsetComponent.new(legend: "Home address") do |fs| %>
  #     <% fs.with_row { render Vitae::InputComponent.new(label: "Address line 1", name: "address1", width: :full, autocomplete: "address-line1") } %>
  #     <% fs.with_row do %>
  #       <%= render Vitae::InputComponent.new(label: "City", name: "city", autocomplete: "address-level2") %>
  #       <%= render Vitae::FieldsetComponent::PairComponent.new do %>
  #         <%= render Vitae::DropdownComponent.new(label: "State", name: "state", options: %w[DC MA ME]) %>
  #         <%= render Vitae::InputComponent.new(label: "ZIP code", name: "zip", autocomplete: "postal-code") %>
  #       <% end %>
  #     <% end %>
  #   <% end %>
  class FieldsetComponent < BaseComponent
    renders_many :rows

    def initialize(legend:, **html)
      @legend = legend
      @html = html
    end

    # Keeps two short fields (State + ZIP) side by side until the row is very narrow.
    class PairComponent < BaseComponent
      def call = %(<div class="vitae-fieldset__pair">#{content}</div>).html_safe
    end
  end
end
