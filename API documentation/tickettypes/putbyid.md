## TicketType

### Update TicketType

**URL:** `/tickettypes/{id}`

**Method:** `PUT`

**Auth required:** YES

**Permissions required:** ADMIN, EVENTS

#### Success Response

**Code** : `200 OK`

**Content examples**

Response show updated name for ticket type with id 1
```
{
    "ticket_type_id": 11,
    "name": "Mörkö",
    "price": 30.0,
    "deleted": false,
    "eventRecord": {
        "eventrecord_id": 1,
        "eventrecord_name": "Tapahtuma 1",
        "venue": "Paikka 1",
        "city": "Kaupunki 1",
        "ticketsmax": 100,
        "event_starttime": "2023-01-01T11:11:00",
        "event_endtime": "2023-01-01T23:23:00",
        "deleted": false
    }
}
```
#### Error Response

**Condition** : Id does not exist

**Code** : `404 Not Found`

**Content examples**

/tickettypes/99
```
{
    "timestamp": "27-03-2023 09:47:30",
    "status": 404,
    "message": "TicketType not found with id: 99"
}
```

**Condition** : Linked resource does not exist

**Code** : `400 Bad Request``

**Content examples**
```
{
    "timestamp": "27-03-2023 09:48:10",
    "status": 400,
    "message": "Event with id 99 doesn't exist"
}
```