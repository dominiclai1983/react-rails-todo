Rails.application.routes.draw do

    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: 'static_pages#index'

  get 'login'     => 'static_pages#login'
  get 'user'      => 'static_pages#user'
  get 'signup'    => 'static_pages#signup'

  namespace :api do
    #USERS
    post '/users' => 'users#create'

    #SESSIONS
    post '/sessions'      => 'sessions#create'
    get '/authenticated'  => 'sessions#authenticated'
    delete '/sessions'    => 'sessions#destroy'

    #TASKS

    post '/tasks'                    => 'tasks#create'
    get '/users/:username/tasks'     => 'tasks#index_by_current_user'
    get '/users/:username/active'    => 'tasks#index_by_current_user_with_active'
    get '/users/:username/completed' => 'tasks#index_by_current_user_with_completed'
    delete '/tasks/:id'              => 'tasks#destroy'
    put 'tasks/:id/completed'        => 'tasks#mark_complete'
    put 'tasks/:id/active'           => 'tasks#mark_active'
    
  end

end
