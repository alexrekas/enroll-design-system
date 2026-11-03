# frozen_string_literal: true

# A tiny stand-in for ViewComponent + ActiveSupport, just enough to render Vitae components with plain Ruby
# (no gems). Used by the markup parity check, which compares each component's HTML with the Storybook markup.
# The real app uses the view_component gem; this file is only for tests.
require "erb"
require "json"
require "securerandom"

class SafeString < String
  def html_safe = self
  def html_safe? = true
  def +(other) = SafeString.new(super(other.to_s))
end

class String
  def html_safe = SafeString.new(self)
  def html_safe? = false
end

# Like Rails: escaping returns a safe string, and an already-safe string isn't escaped again.
module ERB::Util
  class << self
    alias_method :__raw_html_escape, :html_escape
    def html_escape(value) = value.is_a?(SafeString) ? value : SafeString.new(__raw_html_escape(value.to_s))
  end
end

class Object
  def present? = !(nil? || (respond_to?(:empty?) && empty?))
end

class NilClass
  def present? = false
end

module ViewComponent
  class Base
    def self.template_path
      klass = self
      while klass && klass != ViewComponent::Base
        file = klass.instance_method(:initialize).source_location&.first
        path = file&.sub(/\.rb\z/, ".html.erb")
        return path if path && File.exist?(path)
        klass = klass.superclass
      end
      raise "No template for #{name}"
    end

    # Compile the template into a method on the component class (as ViewComponent does), so constants
    # like ICONS resolve inside the template.
    def self.compile!
      return if @compiled
      src = File.read(template_path).gsub(/<%=(.+?)%>/m) { "<%= __h((#{Regexp.last_match(1)})) %>" }
      class_eval("def __render_template\n#{ERB.new(src).src}\nend", template_path, 0)
      @compiled = true
    end

    def __h(value)
      return "" if value.nil?
      value.is_a?(SafeString) ? value : ERB::Util.html_escape(value.to_s)
    end

    def content = @__content

    def render_with(content = nil)
      @__content = content&.html_safe
      return call.to_s.html_safe if respond_to?(:call)
      self.class.compile!
      __render_template
    end

    # render(SomeComponent.new(...)) inside a template or method
    def render(component, &block) = component.render_with(block&.call).html_safe

    # Slots, as in ViewComponent: renders_one :footer / renders_many :items, ItemComponent / renders_many :items, ->(**) { ... }
    def self.renders_one(name, kind = nil) = define_slot(name, kind, many: false)
    def self.renders_many(name, kind = nil) = define_slot(name.to_s.sub(/s\z/, ""), kind, many: true, plural: name)

    def self.define_slot(name, kind, many:, plural: nil)
      store = :"@__slot_#{name}"
      define_method(:"with_#{name}") do |*args, **kwargs, &block|
        built = if kind.is_a?(Proc)
          instance_exec(*args, **kwargs, &kind).render_with(block&.call)
        elsif kind
          kind.new(*args, **kwargs).render_with(block&.call)
        else
          (block ? block.call : args.first).to_s.html_safe
        end
        many ? (instance_variable_get(store) || instance_variable_set(store, [])) << built : instance_variable_set(store, built)
        self
      end
      reader = many ? plural : name
      define_method(reader) { instance_variable_get(store) || (many ? [] : nil) }
      define_method(:"#{reader}?") { many ? !(instance_variable_get(store) || []).empty? : !instance_variable_get(store).nil? }
    end
  end

  class Preview; end
end

module Rails
  class Engine; end
end
