# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# TODO: UUID
# TODO: bcrypt

puts "Creating Users..."

elijah = User.create!({
  username: 'eli7vh',
  name: 'elijah',
  email: 'elijahlucian@gmail.com',
  password: 'toffee15',
  color: 'fresh',
  thumbs: 50,
  wins: 2,
})

toffee = User.create!({
  username: "toffee",
  name: "El Doge",
  color: 'dank',
  password: "toffee15",
  email: "vapsquad@gmail.com",
})

puts "Creating Jams..."

jam = Jam.create!({
  id: 'dank-rhinos',
  name: "first one hour beat!",
  description: "make a beat within the hour! anything goes!",
  time_limit: 60,
  started_at: Time.now,
  user_id: elijah.id, 
})

Jam.create!({
  id: 'cool-unicorns',
  name: "Toffee's new ohb",
  description: "make a sketch with only human noises!",
  time_limit: 60,
  started_at: nil,
  user_id: toffee.id,
})

chats = [
  { jam_id: jam.id, user_id: toffee.id, message: 'hello world' },
  {
    jam_id: jam.id, 
    user_id: elijah.id,
    message:
      'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.',
  },
  {
    jam_id: jam.id, 
    user_id: toffee.id,
    message:
      'I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.',
  },
  {
    jam_id: jam.id, 
    user_id: elijah.id,
    message:
      'When I hear the dank buzz of the little world among the stalks, and grow familiar with the countless indescribable forms',
  },
  {
    jam_id: jam.id, 
    user_id: elijah.id,
    message:
      'When I hear the dank buzz of the little world among the stalks, and grow familiar with the countless indescribable forms',
  },
]

# chats.each do |chat| 
#   Chat.create!(chat)
# end