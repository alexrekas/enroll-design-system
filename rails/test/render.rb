# frozen_string_literal: true

# Reads [{ component, args, content }] as JSON on stdin and prints the rendered HTML for each, as JSON.
require_relative "view_component_shim"
root = File.expand_path("../vitae_components", __dir__)
require File.join(root, "lib/vitae_components/icons")
require File.join(root, "app/components/vitae/base_component")
# Load parents before subclasses (Rails autoloading does this for real).
pending = Dir[File.join(root, "app/components/vitae/*.rb")].sort
until pending.empty?
  pending = pending.reject do |f|
    require f
    true
  rescue NameError
    false
  end
end

cases = JSON.parse($stdin.read)
out = cases.map do |c|
  klass = Vitae.const_get(c["component"])
  args = (c["args"] || {}).transform_keys(&:to_sym)
  klass.new(**args).render_with(c["content"])
rescue StandardError => e
  "RENDER ERROR #{e.class}: #{e.message} @ #{e.backtrace.first}"
end
puts JSON.generate(out)
