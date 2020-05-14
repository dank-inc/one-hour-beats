# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# TODO: UUID
# TODO: bcrypt

User.create!({
  username: 'eli7vh',
  name: 'elijah',
  email: 'elijahlucian@gmail.com',
  password: 'toffee15',
  thumbs: 50,
  wins: 2,
})

User.create!({
  username: "toffee",
  name: "El Doge",
  password: "toffee15",
  email: "vapsquad@gmail.com",
  thumbs: 20,
  wins: 5,
})

Jam.create!({
  name: "first one hour beat!",
  description: "make a beat within the hour! anything goes!",
  time_limit: 60 * 4,
  started_at: Time.now,
  user_id: "eli7vh", # createdBy
})

Jam.create!({
  name: "a new ohb",
  description: "make a sketch with only human noises!",
  time_limit: 3600,
  started_at: nil,
  user_id: "toffee",
})

Entry.create!({
  link: "https://soundcloud.com/vapsquad/vapsquad-whats-a-dik-4",
  title: "whats a dik 4",
  user_id: "eli7vh",
  jam_id: "dank-rhinos",
})

VoteToken.create!({ 
  jam_id: "dank-rhinos", 
  user_id: "eli7vh"
})