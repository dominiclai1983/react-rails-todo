module Api  
  class UsersController < ApplicationController
    def create
      @user = User.new(user_params)
      if @user.save
        render 'api/users/create'
      else
        @user = User.find_by(username: params[:username])
        if @user
          render json: {
            success: false,
            error: "*Username already exists"
          }
        else
          render json: {
            success: false,
            error: "*Email already exists"
          }
        end
      end
    end

    private

      def user_params
        params.require(:user).permit(:password, :username, :email)
      end
      
  end
end