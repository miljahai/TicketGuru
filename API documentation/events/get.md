## EventRecord

### List All Events

**URL:** `/events`

**Method:** `GET`

**Auth required:** YES

**Permissions required:** NO

#### Success Response

**Code** : `200 OK`

**Content examples**

```
[
    {
        "eventrecord_id": 1,
        "eventrecord_name": "Tapahtuma 1",
        "venue": "Paikka 1",
        "city": "Kaupunki 1",
        "ticketsmax": 100,
        "event_starttime": "2023-01-01T11:11:00",
        "event_endtime": "2023-01-01T23:23:00",
        "deleted": false
    },
    {
        "eventrecord_id": 2,
        "eventrecord_name": "Tapahtuma 2",
        "venue": "Paikka 2",
        "city": "Kaupunki 2",
        "ticketsmax": 200,
        "event_starttime": "2023-02-02T12:22:00",
        "event_endtime": "2023-02-02T00:24:00",
        "deleted": false
    },
    {
        "eventrecord_id": 3,
        "eventrecord_name": "Tapahtuma 3",
        "venue": "Paikka 3",
        "city": "Kaupunki 3",
        "ticketsmax": 300,
        "event_starttime": "2023-03-03T13:33:00",
        "event_endtime": "2023-03-04T02:06:00",
        "deleted": false
    }
]
```

**Condition** : No events exist. Returns empty array.

**Code** : `200 OK`

```
[]
```