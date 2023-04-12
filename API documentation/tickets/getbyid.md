## Ticket

### Find By Id

**URL:** `/tickets/{id}`

**Method:** `GET`

**Auth required:** YES

**Permissions required:** NO

#### Success Response

**Condition**: If everything is OK and ticket is found

**Code** : `200 OK`

**Content examples**

/tickets/5

```
{
    "ticket_id": 5,
    "ticket_code": "CODE03",
    "deleted": false,
    "price": 50.7,
    "ticketType": {
        "ticket_type_id": 4,
        "name": "Aikuinen",
        "price": 20.0,
        "deleted": false,
        "eventRecord": {
            "eventrecord_id": 2,
            "eventrecord_name": "Tapahtuma 2",
            "venue": "Paikka 2",
            "city": "Kaupunki 2",
            "ticketsmax": 200,
            "event_starttime": "2023-02-02T12:22:00",
            "event_endtime": "2023-02-02T00:24:00",
            "deleted": false
        }
    },
    "eventRecord": {
        "eventrecord_id": 2,
        "eventrecord_name": "Tapahtuma 2",
        "venue": "Paikka 2",
        "city": "Kaupunki 2",
        "ticketsmax": 200,
        "event_starttime": "2023-02-02T12:22:00",
        "event_endtime": "2023-02-02T00:24:00",
        "deleted": false
    },
    "salesEvent": {
        "salesevent_id": 5,
        "sale_date": "2023-05-05T12:05:00",
        "final_price": 44.4,
        "deleted": false,
        "appUser": null
    }
}
```
#### Error response

**Condition** : Id does not exist

**Code** : `404 Not Found`

**Content examples**

/tickets/99
```
{
    "timestamp": "27-03-2023 09:25:30",
    "status": 404,
    "message": "Ticket not found with id 99"
}
```