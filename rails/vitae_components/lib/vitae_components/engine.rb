# frozen_string_literal: true

module VitaeComponents
  # Adds app/components (Vitae::*Component) and app/assets/stylesheets/vitae (tokens + component CSS)
  # to the host app. In the host layout:
  #   <%= stylesheet_link_tag "vitae/tokens", "vitae/components" %>
  #   <html data-client="dc" data-mode="light">
  #
  # To browse the components in Lookbook, add the previews to the host app's config:
  #   config.view_component.preview_paths << VitaeComponents::Engine.root.join("previews").to_s
  class Engine < ::Rails::Engine
  end
end
