## TicketType

### Add new TicketType

**URL:** `/tickettypes`

**Method:** `POST`

**Auth required:** YES

**Permissions required:** ADMIN, EVENTS

#### Success Response

**Condition**: If everything is OK

**Code** : `201 Created`

**Content examples**
```
{
    "ticket_type_id": 11,
    "name": "Aikuinen",
    "price": 25.0,
    "deleted": false,
    "eventRecord": {
        "eventrecord_id": 1,
        "eventrecord_name": null,
        "venue": null,
        "city": null,
        "ticketsmax": 0,
        "event_starttime": null,
        "event_endtime": null,
        "deleted": false
    }
}
```
#### Error Response

**Condition** : Linked resource does not exist

**Code** : `400 Bad Request`

**Content examples**

/tickettypes
```
{
    "timestamp": "27-03-2023 09:45:49",
    "status": 400,
    "message": "Event with id 99 doesn't exist"
}
```