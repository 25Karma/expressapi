# 25Karma API
An Express REST API for [25Karma](https://25karma.github.io).

## Endpoints
The root url of the API is [https://karma-25.uc.r.appspot.com](https://karma-25.uc.r.appspot.com/). `slug` can be the player's username or UUID.

### /player/`slug`
All the information about a player.

* Mojang username and UUID
* Abbreviated player stats
* Online status
* Number of friends
* Guild

Example: [/player/Technoblade](https://karma-25.uc.r.appspot.com/player/Technoblade)

### /guild/`slug`
Get the information about a player's guild.

* Data about the guild itself
* List of player data (player names, ranks, etc.)

Example: [/guild/Technoblade](https://karma-25.uc.r.appspot.com/guild/Technoblade)

### /cache/`slug`
Returns the value of the key if it exists in the cache.

Example: [/cache/Technoblade](https://karma-25.uc.r.appspot.com/cache/Technoblade)