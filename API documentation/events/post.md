## EventRecord

### Add new event

**URL:** `/events`

**Method:** `POST`

**Auth required:** YES

**Permissions required:** ADMIN, EVENTS

#### Success Response

**Condition** : If everything is OK

**Code** : `201 Created`

**Content examples**
```
{
    "eventrecord_id": 5,
    "eventrecord_name": "Tapahtuma 5 ",
    "venue": "Place 1",
    "city": "Helsinki",
    "ticketsmax": 500,
    "event_starttime": "2023-02-02T19:00:00",
    "event_endtime": "2023-02-02T23:30:00",
    "deleted": false
}
```
#### Error response

**Condition** : Values given in invalid format

**Code** : `400 Bad Request`

**Content examples**
```
{
    "ticketsmax": "number of tickets cannot be negative"
}
```