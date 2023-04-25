## Ticket

### Update ticket

**URL:** `/tickets/{id}`

**Method:** `PUT`

**Auth required:** YES

**Permissions required:** NO

#### Success Response

**Code** : `200 OK`

**Content examples**

Response show updated price for ticket with id 5
```
{
    "ticket_id": 5,
    "ticket_code": "CODE05",
    "deleted": false,
    "used": false,
    "price": 180.0,
    "ticketType": {
        "ticket_type_id": 7,
        "name": null,
        "price": 0.0,
        "deleted": false,
        "eventRecord": null
    },
    "salesEvent": {
        "salesevent_id": 4,
        "sale_date": null,
        "final_price": 0.0,
        "deleted": false,
        "appUser": null
    }
}
```
#### Error responses

**Condition** : Id does not exist

**Code** : `404 Not Found`

**Content examples**

/tickets/99
```
{
    "timestamp": "27-03-2023 09:36:15",
    "status": 404,
    "message": "Ticket not found with id: 99"
}
```

**Condition** : Linked resources do not exist

**Code** : `400 Bad Request`

**Content examples**
```
{
    "timestamp": "27-03-2023 09:36:58",
    "status": 400,
    "message": "SalesEvent with id 99 doesn't exist"
}
```
```
{
    "timestamp": "27-03-2023 09:36:40",
    "status": 400,
    "message": "TicketType with id 99 doesn't exist"
}
```
**Condition** : Values given in invalid format

**Code** : `400 Bad Request`

**Content examples**
```
{
    "price": "price cannot be negative"
}
```