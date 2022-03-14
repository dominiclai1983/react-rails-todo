module Api  
  class TasksController < ApplicationController

    def index_by_current_user
      token = cookies.signed[:todolist_session_token]
      session = Session.find_by(token: token)

      if session
        @tasks = session.user.tasks
        render 'api/tasks/index' # can be omitted
      else
        render json: { tasks: [] }
      end
    end

    def index_by_current_user_with_active
      token = cookies.signed[:todolist_session_token]
      session = Session.find_by(token: token)

      if session
        @tasks = session.user.tasks.where(completed: false)
        render 'api/tasks/index' # can be omitted
      else
        render json: { tasks: [] }
      end
    end

    def index_by_current_user_with_completed
      token = cookies.signed[:todolist_session_token]
      session = Session.find_by(token: token)

      if session
        @tasks = session.user.tasks.where(completed: true)
        render 'api/tasks/index' # can be omitted
      else
        render json: { tasks: [] }
      end
    end

    def create
      token = cookies.signed[:todolist_session_token]
      session = Session.find_by(token: token)

      if session
        user = session.user
        @task = user.tasks.new(task_params)

        if @task.save
          render 'api/tasks/create' # can be omitted
        else
          render json: { success: false }
        end
      else
        render json: { success: false }
      end
    end

    def update_item
      token = cookies.signed[:todolist_session_token]
      session = Session.find_by(token: token)

      if session
        @task = Task.find_by(id: params[:id])

        if @task and @task.update(task_params)
          render 'api/tasks/update'
        end
      end
    
    end

    def destroy
      @task = Task.find_by(id: params[:id])

      if @task and @task.destroy
        render json: { success: true }
      else
        render json: { success: false }
      end
    end

    def mark_complete
      @task = Task.find_by(id: params[:id])

      if @task and @task.update(completed: true)
        render 'api/tasks/update'
      end
    end

    def mark_active
      @task = Task.find_by(id: params[:id])

      if @task and @task.update(completed: false)
        render 'api/tasks/update'
      end
    end

    private

      def task_params
        params.require(:task).permit(:item)
      end
  end
end