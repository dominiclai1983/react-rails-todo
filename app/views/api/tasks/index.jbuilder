json.tasks do
  json.array! @tasks do |task|
    json.id         task.id
    json.item       task.item
    json.completed  task.completed
    json.due        task.due
    json.created_at task.created_at
  end
end 