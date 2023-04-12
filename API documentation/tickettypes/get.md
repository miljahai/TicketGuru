## TicketType

### List All TicketTypes

**URL:** `/tickettypes`

**Method:** `GET`

**Auth required:** YES

**Permissions required:** NO

#### Success Response

**Code** : `200 OK`

**Content examples**

```
[
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
    },
    {
        "ticket_type_id": 2,
        "name": "Lapsi",
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
    },
...
...
...
    {
        "ticket_type_id": 10,
        "name": "Eläkeläinen",
        "price": 20.0,
        "deleted": false,
        "eventRecord": {
            "eventrecord_id": 3,
            "eventrecord_name": "Tapahtuma 3",
            "venue": "Paikka 3",
            "city": "Kaupunki 3",
            "ticketsmax": 300,
            "event_starttime": "2023-03-03T13:33:00",
            "event_endtime": "2023-03-04T02:06:00",
            "deleted": false
        }
    }
]
```
**Condition** : No TicketTypes exist. Returns empty array.

**Code** : `200 OK`

```
[]
```