## EventRecord

### Update event

**URL:** `/events/{id}`

**Method:** `PUT`

**Auth required:** YES

**Permissions required:** ADMIN, EVENTS

#### Success Response

**Code** : `200 OK`

**Content examples**

Response show updated name, city and ticketsmax for event with id 5
```
{
    "eventrecord_id": 5,
    "eventrecord_name": "Tapahtuma 555 ",
    "venue": "Place 5",
    "city": "Vantaa",
    "ticketsmax": 300,
    "event_starttime": "2023-02-02T19:00:00",
    "event_endtime": "2023-02-02T23:30:00",
    "deleted": false
}
```
#### Error response

**Condition** : Id doesn't exist.

**Code** : `404 Not Found`

**Content examples**
```
{
    "timestamp": "27-03-2023 09:18:33",
    "status": 404,
    "message": "Event not found with id: 50"
}
```

**Condition** : Values given in invalid format

**Code** : `400 Bad Request`

**Content examples**
```
{
    "eventrecord_name": "must not be null"
}
```