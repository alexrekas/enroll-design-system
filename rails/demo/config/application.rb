require_relative "boot"

# Only what's needed to show components: no database, mailers or jobs.
require "rails"
require "action_controller/railtie"
require "action_view/railtie"
require "action_cable/engine"
require "propshaft"

Bundler.require(*Rails.groups)

module VitaeDemo
  class Application < Rails::Application
    config.load_defaults 8.0
    config.eager_load = false

    # Lookbook: client and mode switchers in the Display panel, applied by the preview layout.
    config.view_component.preview_paths << VitaeComponents::Engine.root.join("previews").to_s
    config.view_component.default_preview_layout = "vitae_preview"
    config.lookbook.live_updates = false
    config.lookbook.project_name = "Vitae 27 · Rails components"
    config.lookbook.preview_display_options = {
      client: [["EA", "ea"], ["DC", "dc"], ["MA", "ma"], ["ME", "me"]],
      mode: [["Light", "light"], ["Dark", "dark"]]
    }
  end
end
