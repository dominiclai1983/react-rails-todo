class StaticPagesController < ApplicationController
  def index
    render 'index'
  end

  def login
    redirect_to '/'
  end
end
