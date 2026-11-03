# frozen_string_literal: true

module Vitae
  # Menu: the floating list used by Search suggestions, custom dropdowns and header menus.
  # Storybook: Vitae 27/Components/Layout and data/Menu. Figma: Menu, Menu/Item.
  #
  #   render Vitae::MenuComponent.new(label: "Plan", entries: [
  #     { group: "Gold", items: [{ label: "Kaiser Permanente Gold 0/20", secondary: "$468.30 per month", icon: "health", state: :selected }] },
  #     :divider,
  #     { label: "Kaiser Permanente DC Silver 2500/40 HMO", secondary: "$389.15 per month", icon: "health" }
  #   ])
  class MenuComponent < BaseComponent
    # entries: items ({ label:, secondary:, icon:, state: :selected | :disabled | :highlighted, match: "kai" }),
    #   groups ({ group: "Gold", items: [...] }) or :divider
    # Keyboard (arrows, Home/End, Enter, Esc, type-ahead) and aria-activedescendant are wired by the owning control.
    def initialize(entries:, label: nil, id: nil, style: nil, **html)
      @entries = entries
      @label = label
      @id = id
      @style = style
      @html = html
    end

    def item(e)
      e = e.transform_keys(&:to_sym)
      state = e[:state]&.to_s
      text = String.new(esc(e[:label]))
      text = text.sub(/(#{Regexp.escape(e[:match].to_s)})/i, '<mark>\1</mark>') if e[:match].present?
      secondary = e[:secondary].present? ? %(<span class="vitae-menu__secondary">#{esc(e[:secondary])}</span>) : ""
      lead = e[:icon] ? icon(e[:icon], 20, "filled") : ""
      check = state == "selected" ? icon("checkmark", 20, "filled") : ""
      cls = classes("vitae-menu__item", (%w[hover highlighted].include?(state) ? "is-#{state}" : nil))
      %(<li#{attrs(role: "option", class: cls, "aria-selected": (state == "selected" ? "true" : nil), "aria-disabled": (state == "disabled" ? "true" : nil), id: e[:id])}>#{lead}<span class="vitae-menu__text">#{text}#{secondary}</span>#{check}</li>)
    end

    def entry(e)
      return '<li class="vitae-menu__divider" role="none"></li>' if e.to_s == "divider"
      e = e.transform_keys(&:to_sym)
      return item(e) unless e[:group]
      gid = self.class.next_id("menu-group")
      %(<li role="none"><ul class="vitae-menu__group-list" role="group" aria-labelledby="#{gid}"><li class="vitae-menu__group" id="#{gid}" role="presentation">#{esc(e[:group])}</li>#{e[:items].map { |i| item(i) }.join}</ul></li>)
    end

    def call
      %(<ul#{attrs(class: "vitae-menu", role: "listbox", id: @id, "aria-label": @label, style: @style, **@html)}>#{@entries.map { |e| entry(e) }.join}</ul>).html_safe
    end
  end
end
