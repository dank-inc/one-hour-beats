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
  id: "dank-rhinos",
  name: "first one hour beat!",
  description: "make a beat within the hour! anything goes!",
  timeLimit: 60 * 4,
  startedAt: new Date(),
  userId: "eli7vh", // createdBy
})

Jam.create!({
  id: "cool-unicorns",
  name: "a new ohb",
  description: "make a sketch with only human noises!",
  timeLimit: 3600,
  startedAt: null,
  userId: "toffee",
})

Entry.create!({
  id: "whatsadik4",
  link: `https://soundcloud.com/vapsquad/vapsquad-whats-a-dik-4`,
  title: "whats a dik 4",
  artist: "vapsquad",
  userId: "eli7vh",
  jamId: "dank-rhinos",
})

VoteToken.create!({ 
  jamId: "dank-rhinos", 
  userId: "eli7vh"
})