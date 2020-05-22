# One Hour Beats Server

## scaffold shit


```sh
# note these are just for example purposes, not actually used in the app
rails g scaffold users username:string name:string email:string password:string thumbs:integer wins:integer
rails g scaffold jams name:string description:string time_limit:integer user_id:string started_at:datetime
rails g scaffold entries title:string link:string user_id:string jam_id: string
rails g scaffold vote_tokens user_id:string jam_id:string entry_id:string
rails g scaffold chats user_id:string jam_id:string message:string
rails g model Invitation invited_by:uuid claimed_by:uuid token:string
```
