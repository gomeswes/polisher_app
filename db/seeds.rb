# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


cats = ["Communication", "Numbers", "Time", "Family", "Colours", "Shopping", "Clothes", "Body Parts", 
        "Appearance", "Character Traits", "Food", "House", "Everyday Activities", "School", "Work",
        "Health and illnesses", "Sport", "Travels and Transport", "Animals", "Nature and Weather",
        "Nationalities", "Free Time"]
  
Category.delete_all
cats.each do |c|
  cat = Category.new c
  cat.save!
end