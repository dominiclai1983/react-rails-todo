class User < ApplicationRecord

  has_many :tasks
  has_many :sessions

  validates :username, presence: true, length: { minimum: 3, maximum: 64 }
  validates :password, presence: true, length: { minimum: 8, maximum: 64 } 
  after_validation :hash_password
  validates_uniqueness_of :username
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i

  private

    def hash_password
      self.password = BCrypt::Password.create(self.password)
    end

end
