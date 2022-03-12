class AddForeignKeyToSessions < ActiveRecord::Migration[6.1]
  def change
    add_foreign_key :sessions, :users
  end
end
