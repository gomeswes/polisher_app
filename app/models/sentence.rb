class Sentence < ApplicationRecord
  validates :english, presence: true
  validates :polish, presence: true
  belongs_to :category
  
  def initialize(english, polish)
    super()
    self.english = english
    self.polish = polish
  end
end