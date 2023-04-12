## Ticket

### List All Tickets

**URL:** `/tickets`

**Method:** `GET`

**Auth required:** YES

**Permissions required:** NO

#### Success Response

**Code** : `200 OK`

**Content examples**

```
[
    {
        "ticket_id": 1,
        "ticket_code": "CODE01",
        "deleted": false,
        "price": 200.0,
        "ticketType": {
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
        "salesEvent": {
            "salesevent_id": 1,
            "sale_date": "2023-01-01T12:01:00",
            "final_price": 25.5,
            "deleted": false,
            "appUser": null
        }
    },
    {
        "ticket_id": 2,
        "ticket_code": "CODE02",
        "deleted": false,
        "price": 250.0,
        "ticketType": {
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
        "salesEvent": {
            "salesevent_id": 2,
            "sale_date": "2023-02-02T12:02:00",
            "final_price": 11.1,
            "deleted": false,
            "appUser": null
        }
    }
]
```
**Condition** : No tickets exist. Returns empty array.

**Code** : `200 OK`

```
[]
```