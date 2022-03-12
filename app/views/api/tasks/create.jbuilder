json.task do
  json.id         @task.id
  json.item       @task.item
  json.completed  @task.completed
  json.due        @task.due
  json.created_at @task.created_at
end
