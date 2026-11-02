# Vitae 27 for Rails

- **`vitae_components/`**: a gem of [ViewComponent](https://viewcomponent.org) components that render the same HTML as the Storybook docs, plus the tokens and component CSS and the icons.
- **`demo/`**: a small Rails app that shows the components in [Lookbook](https://lookbook.build), with client (EA, DC, MA, ME) and light/dark switchers.
- **`test/`**: the parity check that compares every component's HTML with the Storybook markup (`npm run check:rails`, run in CI).

## Run the demo on a Mac

You only need to do steps 1–3 once.

1. **Open Terminal** (Spotlight: press ⌘ Space, type "Terminal", press Return).
2. **Install Ruby with Homebrew.** Type these, pressing Return after each:
   ```
   xcode-select --install
   brew install ruby
   ```
   The first command installs Apple's build tools (a dialog may open; click Install). If it says they're already installed, that's fine. The second takes a few minutes.
3. **Use the Homebrew Ruby instead of the Mac's built-in one**, then check it:
   ```
   echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ruby -v
   ```
   `ruby -v` should print 3.3 or newer (not 2.6).
4. **Install the demo's gems** (a few minutes the first time):
   ```
   cd ~/Documents/enroll-design-system/rails/demo
   bundle install
   ```
5. **Start it:**
   ```
   bin/rails server
   ```
   Open http://localhost:3000/lookbook for the components, or http://localhost:3000/sample for a sample form page (add `?client=dc` or `?mode=dark` to the address). Press Ctrl C in Terminal to stop.

`bundle install` creates `rails/demo/Gemfile.lock`; commit it so everyone gets the same gem versions.

## Use the components in Enroll

```ruby
# Gemfile
gem "vitae_components", path: "../enroll-design-system/rails/vitae_components"   # or a git source
```

```erb
<%# app/views/layouts/application.html.erb %>
<html data-client="dc" data-mode="light">
  <%= stylesheet_link_tag "vitae/tokens", "vitae/components" %>

<%# any view %>
<%= render Vitae::ButtonComponent.new(label: "Continue", type: "submit") %>
```

Every component's options are listed at the top of its file in `vitae_components/app/components/vitae/`, and each Storybook page has a Rails example.

## Components so far

Button, Link, Alert, Tag, Metal badge, Input, Dropdown, Checkbox, Radio, Toggle. The rest follow in batches.

## Keeping it in sync

- `npm run build` copies the tokens CSS, component CSS and icons into the gem (`sync-rails.mjs`). Commit the copies.
- `npm run check:rails` fails if a copy is stale, or if any component's HTML differs from the Storybook markup in `stories/vitae/markup/`. When you change a component, change both and run it.
