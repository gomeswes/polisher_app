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
categories = []
cats.each do |c|
  cat = Category.new c
  cat.save!
  categories << cat
end


Sentence.delete_all

File.readlines(Dir.pwd + "/db/sentences.txt").each_with_index do |line, index|
  sentence_line = line.split("|")
  cat = sentence_line[0]
  english = sentence_line[1]
  polish = sentence_line[2].delete("\n")

  sentence = Sentence.new english, polish
  sentence.category = categories.select {|c| c.name == cat}.first
  sentence.save!

  print "." if index % 10 == 0
end

puts ""

puts "Sentences: #{Sentence.count}"
puts "Categories: #{Category.count}"