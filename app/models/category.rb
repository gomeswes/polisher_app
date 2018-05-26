class Category < ApplicationRecord
  validates :name, presence: true
  has_many :sentences

  def initialize(name)
    super()
    self.name = name
  end
end