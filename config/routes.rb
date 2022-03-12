Rails.application.routes.draw do

    # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: 'static_pages#index'

  get 'login'     => 'static_pages#login'

  namespace :api do
    #USERS
    post '/users' => 'users#create'

    #SESSIONS
    post '/sessions'      => 'sessions#create'
    get '/authenticated'  => 'sessions#authenticated'
    delete '/sessions'    => 'sessions#destory'

    #TASKS

    post '/tasks'                 => 'tasks#create'
    get '/users/:username/tasks'  => 'tasks#index_by_current_user'
    delete '/tasks/:id'           => 'tasks#destroy'
    put 'tasks/:id/completed'     => 'tasks#mark_complete'
    put 'task/:id/active'         => 'tasks#mark_active'
    
  end

end
