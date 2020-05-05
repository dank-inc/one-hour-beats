# ONE HOUR BEATS (again)

## this is the new one hour beats project.

# TODO before release

- add password hashing (bcrypt)
  https://stackoverflow.com/questions/34120548/using-bcrypt-with-sequelize-model
- make chat less ugly
- make mobile experience 30% less bad
- deploy
- countdown disappears after user votes.
- while you're in a jamroom show names at top of who is currently there.
- add entry count to rooms on main
- unfolding timer so it counts down.
- tooltip over user bubble.

-
- one
- challenge, competition
-

* "whaty does it mean when you jam

### MVP - three pages:

Home Page

- [*] add a home page with a list of active jams
- [*] add a "Create Jam" page where anybody can create a jam - anybody can hit the start button

Jam View Page

- [*] add a "Jam View" page where people can see a timer and the challenge
- [*] add a "Submit Jam" where people can paste their soundcloud
  links etc.

- [*] add voting!
- [*] User accounts.
- [*] Add voting
- [*] add vote token functionality. # good enough for now!
- [*] get all initial state from layout.js, either rest or a socket.
- [*] set up remote db.
- [*] plug in a database
- [*] creating entry automatically creates voteToken (trigger)
- [*] unique constraints on vote tokens and other fields.
- add jam sorting
- sort jams by most recent or most active.

### Milestone 1 - stuff:

- expire jams not started in 1 day (shows countdown to expiry on frontpage.)
- user can only create 1 "alive jam" at a time
- user can delete tehir jam
- vote to start jam?
- creator cannot start jam until they have submitted an entry
- jam expires maybe 1 day after opening it?
- profile page.
- voting time limit. maybe submission count \* 10 minutes.

### Milestone 2:

- modal box to provide inspiration to create the challenge.
- push notifiactions
- join jam button
- privtate / password protected jams
- Optional file upload (for pro users because hosting costs real dinero.)

# Ideas:

- sample packs
- possibly unlockiong vsts for an hour.
- maybe some cool indicator that a jam is starting soon to prompt people to get into the jam.
- allow jam creator or 50% vote to extend the jam time.
- allow users to link their twitch streams to OHB, if the channel has the name it in somewhere it will show as "streaming" for people to watch. or stream hashtags.
- allow users to post 'final versions' of their 1 hour beats after the fact!

- score this youtube video.

### achievements:

- Super Creator: created number of successful jams (created & had more than 3 people submit and vote and declare a winner.)
- JamPocalypse: N entries made
- Twitch & Jam: linked N streams to OHC

### delayed challenges!

- allow a time window and a time limit.
- users will have their own local jam timer.
- example: jam is for 24 hours, people can join along that time and partake with their own personal timer.

## other rules to implement

- get a vote token by submitting an entry
- can't start a jam unless 3 people say 'go'

## visual shit

- need cool clock thing
- some cool header accents that span the width of the thing. maybe a mic cable? (generative!)
- fun trippy thing that follows your mouse on the header and expands over menu clickables.
