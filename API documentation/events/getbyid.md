## EventRecord

### Find By Id

**URL:** `/events/{id}`

**Method:** `GET`

**Auth required:** YES

**Permissions required:** NO

#### Success Response

**Condition**: If everything is OK and eventrecord_id is found

**Code** : `200 OK`

**Content examples**

/events/2

```
{
    "eventrecord_id": 2,
    "eventrecord_name": "Tapahtuma 2",
    "venue": "Paikka 2",
    "city": "Kaupunki 2",
    "ticketsmax": 200,
    "event_starttime": "2023-02-02T12:22:00",
    "event_endtime": "2023-02-02T00:24:00",
    "deleted": false
}
```
#### Error response

**Condition** : Id does not exist

**Code** : `404 Not Found`

**Content examples**

/events/99
```
{
    "timestamp": "27-03-2023 08:35:27",
    "status": 404,
    "message": "Event not found with id 50"
}
```