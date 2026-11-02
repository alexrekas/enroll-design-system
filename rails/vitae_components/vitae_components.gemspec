# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name = "vitae_components"
  spec.version = "0.1.0"
  spec.authors = ["IdeaCrew"]
  spec.summary = "Vitae 27 design system components for Rails (ViewComponent)"
  spec.description = "Rails ViewComponents that render the Vitae 27 markup documented in the Enroll design system Storybook, plus the tokens and component CSS."
  spec.homepage = "https://github.com/alexrekas/enroll-design-system"
  spec.required_ruby_version = ">= 3.1"
  spec.files = Dir["lib/**/*", "app/**/*", "previews/**/*", "README.md"]
  spec.require_paths = ["lib"]

  spec.add_dependency "rails", ">= 7.1"
  spec.add_dependency "view_component", ">= 3.12", "< 4"
end
