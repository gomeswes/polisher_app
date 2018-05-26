Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get   "/sentences/new",       to: "sentences#new"
  post  "/sentences/create",    to: "sentences#create"
  get   "/sentences/show",      to: "sentences#show"
  get   "/sentences/play",      to: "sentences#play"
  get   "/sentences/play/:cat", to: "sentences#play"
  get   "/sentences/get_new",   to: "sentences#get_new"
end
