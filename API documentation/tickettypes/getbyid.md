## TicketType

### Find By Id

**URL:** `/tickettypes/{id}`

**Method:** `GET`

**Auth required:** YES

**Permissions required:** NO

#### Success Response

**Condition**: If everything is OK and tickettype_id is found

**Code** : `200 OK`

**Content examples**

/tickettypes/1

```
{
    "ticket_type_id": 1,
    "name": "Aikuinen",
    "price": 20.0,
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
    "timestamp": "27-03-2023 09:44:02",
    "status": 404,
    "message": "TicketType not found with id 99"
}
```