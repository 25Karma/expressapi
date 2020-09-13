# 25Karma API
An Express REST API for [25Karma](https://25karma.github.io).

## Endpoints
The root url of the API is [https://karma-25.uc.r.appspot.com](https://karma-25.uc.r.appspot.com/).

### /player/{username/UUID}
All the information about a player.

* Mojang username and UUID
* Abbreviated player stats
* Online status
* Friends
* Guild

Example: [/player/Technoblade](https://karma-25.uc.r.appspot.com/player/Technoblade)

### /names/{usernames/UUIDs}
Get the name info (username, uuid, rank, '+' color, etc.) about a list of players (up to 16).
The list should be a string with the usernames/uuids separated by ampersands ('&').

Example: [/names/Technoblade&a6df397e-feab-496d-9f2a-6d6eeab10470](https://karma-25.uc.r.appspot.com/names/Technoblade&a6df397e-feab-496d-9f2a-6d6eeab10470)