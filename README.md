# 25Karma API
An Express REST API for [25Karma](https://25karma.github.io).

## Endpoints
The root url of the API is [https://karma-25.uc.r.appspot.com](https://karma-25.uc.r.appspot.com/). `slug` can be the player's username or UUID.

### /cache/`slug`
Returns the value of the key if it exists in the cache.

Example: [/cache/Technoblade](https://karma-25.uc.r.appspot.com/cache/Technoblade)
```javascript
{
    "username": "Technoblade",
    "uuid": "b876ec32-e396-476b-a115-8438d83c67d4",
    "rank": "YOUTUBER",
    "packageRank": "MVP_PLUS",
    "prefix": "§d[PIG§b+++§d]",
    "rankPlusColor": "DARK_PURPLE"
}
```

### /friends/`slug`
Similar to `/player` endpoint, but with a full list of friends.

Example: [/friends/Technoblade](https://karma-25.uc.r.appspot.com/friends/Technoblade)
```javascript
{
    "success": true,
    "slug": "Technoblade",
    "mojang": { ... },
    "player": { ... },
    "friends": [ ... ],
    "guild": { ... }
}
```

### /guild/`slug`
Get the information about a player's guild.

Example: [/guild/Technoblade](https://karma-25.uc.r.appspot.com/guild/Technoblade)
```javascript
{
    "success": true,
    "slug": "Technoblade",
    "mojang": { ... },
    "guild": { ... }
}
```

### /name/`slug`
The name and rank information about a player.

Example: [/name/Technoblade](https://karma-25.uc.r.appspot.com/name/Technoblade)
```javascript
{
    "success": true,
    "slug": "technoblade",
    "username": "Technoblade",
    "uuid": "b876ec32-e396-476b-a115-8438d83c67d4",
    "rank": "YOUTUBER",
    "packageRank": "MVP_PLUS",
    "prefix": "§d[PIG§b+++§d]",
    "rankPlusColor": "DARK_PURPLE"
}
```

### /player/`slug`
All the information about a player.

Example: [/player/Technoblade](https://karma-25.uc.r.appspot.com/player/Technoblade)
```javascript
{
    "success": true,
    "slug": "Technoblade",
    "mojang": { ... },
    "player": { ... },
    "status": { ... },
    "friends": 88,
    "guild": { ... }
}
```
