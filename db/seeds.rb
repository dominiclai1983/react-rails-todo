# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = User.create([{username: 'test1', email:'test1@test.com', password:'12345678'},
  {username: 'test2', email:'test2@test.com', password:'12345678'},
  {username: 'test3', email:'test3@test.com', password:'12345678'},])

tasks = Task.create([{item:'this is good', user_id: 2},
  {item:'this is no good', user_id: 2},
  {item:'shall we go to shopping?', user_id: 2},
  {item:'shall we go to shopping?', user_id: 3},
  {item:'shall we go to shopping, again?', user_id: 3},
  {item:'shall we go to shopping, again, again?', user_id: 3},
  {item:'this is no good', user_id: 6},
  {item:'shall we go to shopping?', user_id: 6},
  {item:'shall we go to shopping?', user_id: 6},
  {item:'shall we go to shopping, again?', user_id: 6},
  {item:'shall we go to shopping, again, again?', user_id: 6},])