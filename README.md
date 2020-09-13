# 25Karma API
An Express REST API for [25Karma](https://25karma.github.io).

## Documentation
The root url of the API is [https://karma-25.uc.r.appspot.com](https://karma-25.uc.r.appspot.com/).

### Player
All the information about a player.

* Mojang username and UUID
* Abbreviated player stats
* Online status
* Friends
* Guild

| Get          | From             | Endpoint                             |
|--------------|------------------|--------------------------------------|
| Player stats | username or UUID | {root}/player/stats/{username/UUID} |