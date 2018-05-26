class CreateSentencesTable < ActiveRecord::Migration[5.1]
  def change
    create_table :sentences do |t|
      t.string :english
      t.string :polish
    end
  end
end
