class StaticPagesController < ApplicationController
  def index
    render 'index'
  end

  def login
    redirect_to '/user'
  end

  def user
    render 'user'
  end

  def signup
    redirect_to '/login'
  end
end
