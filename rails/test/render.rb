# frozen_string_literal: true

# Reads [{ component, args, content }] as JSON on stdin and prints the rendered HTML for each, as JSON.
require_relative "view_component_shim"
require "date"
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
  klass = c["component"].split("::").reduce(Vitae) { |mod, n| mod.const_get(n) }
  # Strings starting with "\u0000html:" are already-escaped HTML (cells, slot content built by the Storybook markup).
  safe = ->(v) { v.is_a?(String) && v.start_with?("\u0000html:") ? v.delete_prefix("\u0000html:").html_safe : v.is_a?(Array) ? v.map(&safe) : v.is_a?(Hash) ? v.transform_values(&safe) : v }
  args = safe.call((c["args"] || {}).transform_keys(&:to_sym))
  args = args.transform_values { |v| v.is_a?(String) && v.match?(/\A\d{4}-\d{2}-\d{2}\z/) ? Date.parse(v) : v }
  comp = klass.new(**args)
  (c["slots"] || []).each do |slot|
    kw = (slot["args"] || {}).transform_keys(&:to_sym)
    html = slot["content"]
    comp.public_send("with_#{slot['name']}", **kw) { html.to_s.html_safe }
  end
  comp.render_with(c["content"]&.then { |t| t.delete_prefix("\u0000html:").html_safe })
rescue StandardError => e
  "RENDER ERROR #{e.class}: #{e.message} @ #{e.backtrace.first}"
end
puts JSON.generate(out)
