# frozen_string_literal: true

# A tiny stand-in for ViewComponent + ActiveSupport, just enough to render Vitae components with plain Ruby
# (no gems). Used by the markup parity check, which compares each component's HTML with the Storybook markup.
# The real app uses the view_component gem; this file is only for tests.
require "erb"
require "json"
require "securerandom"

class SafeString < String
  def html_safe = self
  def +(other) = SafeString.new(super(other.to_s))
end

class String
  def html_safe = SafeString.new(self)
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
      self.class.compile!
      __render_template
    end
  end

  class Preview; end
end

module Rails
  class Engine; end
end
