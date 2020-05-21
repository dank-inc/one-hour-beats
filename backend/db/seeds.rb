# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# TODO: UUID
# TODO: bcrypt

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

users = [{
  username: 'chocobobafett',
  password: 'toffee15',
  color: 'zesty',
  name: 'George',
  email: 'berkleegeorge@gmail.com',
},
{
  username: 'metacusis',
  password: 'toffee15',
  name: 'Meta',
  color: 'wonky',
  email: 'cjamieschmitz@gmail.com',
},
{
  username: 'JasonOne',
  password: 'toffee15',
  name: 'Meta',
  color: 'aloof',
  email: 'Jason@danceshout.com',
},
{
  username: 'iwishiwereadinosaur',
  password: 'toffee15',
  name: 'iwishiwereadinosaur',
  color: 'visionary',
  email: 'iwishiwere@adinosaur.net',
}]

users.each { |user| User.create!(user) }

User.create({
  username: 'otherdude',
  name: 'blah',
  color: 'dank',
  password: 'toffee15',
  email: 'toffee@toffee.com',
  thumbs: 20,
  wins: 10,
})

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
  { jam: jam, user: toffee, message: 'hello world' },
  {
    jam: jam, 
    user: elijah,
    message:
      'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.',
  },
  {
    jam: jam, 
    user: toffee,
    message:
      'I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.',
  },
  {
    jam: jam, 
    user: elijah,
    message:
      'When I hear the dank buzz of the little world among the stalks, and grow familiar with the countless indescribable forms',
  },
  {
    jam: jam, 
    user: elijah,
    message:
      'When I hear the dank buzz of the little world among the stalks, and grow familiar with the countless indescribable forms',
  },
]

chats.each {|chat| Chat.create!(chat) } 