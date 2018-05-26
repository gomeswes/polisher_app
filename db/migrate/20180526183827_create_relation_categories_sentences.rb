class CreateRelationCategoriesSentences < ActiveRecord::Migration[5.1]
  def change
    add_reference :sentences, :category
  end
end
