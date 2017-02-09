# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Record.destroy_all

expense_descriptions = [
  'groceries',
  'party',
  'bar',
  'concert tickets',
  'football game',
  'pizza',
  'buffalo wings'
].map do |desc|
  { type: :expense, description: desc}
end

income_descriptions = [
  'freelance programming',
  'freelance programming',
  'freelance design',
  'freelance design',
  'walk dog',
  'walk dog',
  'deejaying',
  'deejaying',
  'sold old old furniture',
  'sold old old furniture'
].map do |desc|
  { type: :income, description: desc}
end

descriptions = (expense_descriptions + income_descriptions).shuffle

30.times do
  description = descriptions.sample
  amount = (10..100).step(10).to_a.sample
  amount = description[:type] == :expense ? -amount : amount
  Record.create description: description[:description], amount: amount
end
