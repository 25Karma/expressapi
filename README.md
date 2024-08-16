# 25Karma API `deploy` branch
An Express REST API for [25Karma](https://25karma.github.io).

## Endpoints
The root url of the API is currently [https://karma-25.uc.r.appspot.com](https://karma-25.uc.r.appspot.com/). `slug` can be the player's username or UUID.

### /achievements/`slug`
Get the information about a player's achievements.

Example: [/achievements/Technoblade](https://karma-25.uc.r.appspot.com/achievements/Technoblade)
```javascript
{
    "success": true,
    "slug": "Technoblade",
    "mojang": { ... },
    "player": { ... }
}
```

### /cache/`slug`
Returns the value of the key if it exists in the cache. Returns null if it does not.

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

### /guild/`slug`
Get the information about a player's guild.

Example: [/guild/Technoblade](https://karma-25.uc.r.appspot.com/guild/Technoblade)
```javascript
{
    "success": true,
    "slug": "Technoblade",
    "mojang": { ... },
    "guild": { ... },
    "names": { ... }
}
```

### /name/`slug`
The name and rank information about a player.

Example: [/name/Technoblade](https://karma-25.uc.r.appspot.com/name/Technoblade)
```javascript
{
    "success": true,
    "slug": "Technoblade",
    "name": { ... }
}
```

### /player/`slug`
Get all the information about a player.

Example: [/player/Technoblade](https://karma-25.uc.r.appspot.com/player/Technoblade)
```javascript
{
    "success": true,
    "slug": "Technoblade",
    "mojang": { ... },
    "player": { ... },
    "status": { ... },
    "guild": { ... }
}
```

### /pets/`slug`
Get the information about a player's pets.

Example: [/pets/Technoblade](https://karma-25.uc.r.appspot.com/pets/Technoblade)
```javascript
{
    "success": true,
    "slug": "Technoblade",
    "mojang": { ... },
    "player": { ... }
}
```

### /quests/`slug`
Get the information about a player's quests.

Example: [/quests/Technoblade](https://karma-25.uc.r.appspot.com/quests/Technoblade)
```javascript
{
    "success": true,
    "slug": "Technoblade",
    "mojang": { ... },
    "player": { ... }
}
```
