class Task < ApplicationRecord

  validates :item, presence: true
  validates :item, length: {maximum: 200}, presence: true
  

  belongs_to :user, required: true
end
