## Ticket

### Add new ticket

**URL:** `/tickets`

**Method:** `POST`

**Auth required:** YES

**Permissions required:** NO

#### Success Response

**Condition**: If everything is OK

**Code** : `201 Created`

**Content examples**
```
{
    "ticket_code": "CODE50",
    "deleted": false,
    "price": 150.0,
    "ticketType": {
        "ticket_type_id": 4
    },
    "salesEvent": {
        "salesevent_id": 4
    }
}
```
#### Error response

**Condition** : Values given in invalid format

**Code** : `400 Bad Request`

**Content examples**
```
{
    "price": "price cannot be negative"
}
```

**Condition** : Linked resources do not exist

**Code** : `400 Bad Request`

**Content examples**
```
{
    "timestamp": "27-03-2023 09:32:57",
    "status": 400,
    "message": "SalesEvent with id 99 doesn't exist"
}
```
```
{
    "timestamp": "27-03-2023 09:32:42",
    "status": 400,
    "message": "TicketType with id 99 doesn't exist"
}
```