module Api  
  class UsersController < ApplicationController
    def create
      @user = User.new(user_params)
      if @user.save
        render 'api/users/create'
      else
        render json: {
          success: false
        }
      end
    end

    private

      def user_params
        params.require(:user).permit(:password, :username, :email)
      end
      
  end
end