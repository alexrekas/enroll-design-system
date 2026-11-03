# frozen_string_literal: true

module Vitae
  # Table: a data grid (selectable rows, sortable headers, bulk actions) or a read-only summary.
  # Storybook: Vitae 27/Components/Layout and data/Table. Figma: Table, Table/Header cell, Table/Cell.
  #
  #   <%= render Vitae::TableComponent.new(caption: "Employees", selectable: true,
  #         columns: [{ label: "Name", sort: :ascending, pinned: true }, { label: "Status" }, { label: "Premium", numeric: true },
  #                   { label: "Actions", hidden: true, numeric: true }],
  #         rows: employees.map { |e| { label: e.name, selected: selected_ids.include?(e.id),
  #                                     cells: [link_to(e.name, e, class: "vitae-link"), render(Vitae::TagComponent.new(label: e.status, type: :success)),
  #                                             number_to_currency(e.premium), link_to("View", e, class: "vitae-link")] } }) do |table| %>
  #     <% table.with_bulk_actions do %>
  #       <%= render Vitae::ButtonComponent.new(label: "Send reminder", style: :outline) %>
  #       <%= render Vitae::ButtonComponent.new(label: "Export", style: :ghost) %>
  #     <% end %>
  #   <% end %>
  #
  # Cells are escaped unless they're html_safe (link_to, render and the like return safe HTML).
  class TableComponent < BaseComponent
    renders_one :bulk_actions

    # caption: names the table and its scroll region (visually hidden)
    # columns: [{ label:, sort: nil | :none | :ascending | :descending, numeric: false, pinned: false, hidden: false }]
    #   sort: nil means not sortable; :none means sortable but not sorted. hidden: header text for screen readers only.
    # rows: [{ cells: [...], selected: false, label: "Marcus Bennett" }]  (label is used in "Select Marcus Bennett")
    # selectable: adds the select-all header checkbox, row checkboxes and the bulk-action bar
    # width: fixed width in px, for demos of horizontal scrolling
    def initialize(caption:, columns:, rows:, selectable: false, width: nil, **html)
      @caption = caption
      @columns = columns.map { |c| c.transform_keys(&:to_sym) }
      @rows = rows.map { |r| r.transform_keys(&:to_sym) }
      @selectable = selectable
      @width = width
      @html = html
    end

    def selected_count = @rows.count { |r| r[:selected] }

    def all_checked
      return false unless @selectable
      return true if selected_count == @rows.size
      selected_count.positive? ? :indeterminate : false
    end

    def cell_class(index)
      c = @columns[index] || {}
      edge = c[:pinned] && !@columns[index + 1]&.dig(:pinned)
      cls = classes((c[:numeric] ? "is-numeric" : nil), (c[:pinned] ? "is-pinned" : nil), (edge ? "is-edge" : nil))
      cls.empty? ? nil : cls
    end

    def header_cell(col, index)
      sort = col[:sort]&.to_s
      inner = if col[:hidden]
        %(<span class="vitae-visually-hidden">#{esc(col[:label])}</span>)
      elsif sort
        name = { "ascending" => "arrow-up", "descending" => "arrow-down" }.fetch(sort, "chevron-expand")
        %(<button type="button" class="vitae-sort">#{esc(col[:label])}#{icon(name, 16, "filled")}</button>)
      else
        esc(col[:label])
      end
      %(<th#{attrs(scope: "col", class: cell_class(index), "aria-sort": (sort && sort != "none" ? sort : nil))}>#{inner}</th>).html_safe
    end

    def cell(value) = value.respond_to?(:html_safe?) && value.html_safe? ? value : esc(value)

    def check(label, checked)
      render(Vitae::CheckboxComponent.new(label: label, checked: checked, hide_label: true))
    end
  end
end
