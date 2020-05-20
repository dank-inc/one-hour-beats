# One Hour Beats Server

## scaffold shit

```sh
rails generate scaffold users username:string name:string email:string password:string color:integer thumbs:integer wins:integer
rails generate scaffold jams name:string description:string time_limit:integer user_id:string started_at:datetime
rails generate scaffold entries title:string link:string user_id:string jam_id: string
rails generate scaffold vote_tokens user_id:string jam_id:string entry_id:string
rails generate scaffold chats user_id:string jam_id:string message:string
```
