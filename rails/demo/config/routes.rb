Rails.application.routes.draw do
  mount Lookbook::Engine, at: "/lookbook"
  get "/sample", to: "pages#sample"
  root to: redirect("/lookbook")
end
