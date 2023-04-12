## Ticket

### Mark Ticket used

**URL:** `/tickets/{id}`

**Method:** `PATCH`

**Body:**
```
{
    "ticket_id": 5
}
```


**Auth required:** YES

**Permissions required:** SALES, EVENTS, ADMIN

#### Success Response

**Code** : `200 OK`

**Content examples**

/tickets/5
```
{
    "ticket_id": 5,
    "code": "6cbe2d09-4f08-44c8-bb1e-c391f7fdfa57",
    "deleted": false,
    "used": "2023-04-12T13:07:57.6069931",
    "price": 50.7,
    "ticketType": {
        "ticket_type_id": 4,
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
        },
        "name": "Aikuinen"
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
<br>
Needs fixing!
<br>
**Condition** : Id does not exist

**Code** : `404 Not Found`

**Content examples**

/tickets/99
```
{
    "timestamp": "27-03-2023 09:40:53",
    "status": 404,
    "message": "Ticket not found with id 99"
}
```