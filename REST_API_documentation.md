# TicketGuru REST API

## Base URL
https://ticketguru.com

## EventRecord

### List All Events

**URL:** `/events`

**Method:** `GET`

**Auth required:** NO (needs to be fixed)

**Permissions required:** NO

#### Success Response

**Code** : `200 OK`

**Content examples**

```
[
    {
        "eventrecord_id": 1,
        "eventrecord_name": "Tapahtuma 1",
        "venue": "Paikka 1",
        "city": "Kaupunki 1",
        "ticketsmax": 100,
        "event_starttime": "2023-01-01T11:11:00",
        "event_endtime": "2023-01-01T23:23:00",
        "deleted": false
    },
    {
        "eventrecord_id": 2,
        "eventrecord_name": "Tapahtuma 2",
        "venue": "Paikka 2",
        "city": "Kaupunki 2",
        "ticketsmax": 200,
        "event_starttime": "2023-02-02T12:22:00",
        "event_endtime": "2023-02-02T00:24:00",
        "deleted": false
    },
    {
        "eventrecord_id": 3,
        "eventrecord_name": "Tapahtuma 3",
        "venue": "Paikka 3",
        "city": "Kaupunki 3",
        "ticketsmax": 300,
        "event_starttime": "2023-03-03T13:33:00",
        "event_endtime": "2023-03-04T02:06:00",
        "deleted": false
    }
]
```
#### Error Response

**Condition** : No events exist.

**Code** : `404 Not Found`

### Find By Id

**URL:** `/events/{id}`

**Method:** `GET`

**Auth required:** NO (needs to be fixed)

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
Event with id 99 doesn't exist
```


### Add new event

**URL:** `/events`

**Method:** `POST`

**Auth required:** NO (needs to be fixed)

**Permissions required:** NO

#### Success Response

**Condition** : If everything is OK

**Code** : `201 Created`

**Content examples**
```
{
    "eventrecord_id": 5,
    "eventrecord_name": "Tapahtuma 5 ",
    "venue": "Place 1",
    "city": "Helsinki",
    "ticketsmax": 500,
    "event_starttime": "2023-02-02T19:00:00",
    "event_endtime": "2023-02-02T23:30:00",
    "deleted": false
}
```
#### Error response

**Condition** : Values given in invalid format

**Code** : `400 Bad Request`



### Update event

**URL:** `/events/{id}`

**Method:** `PUT`

**Auth required:** NO (needs to be fixed)

**Permissions required:** NO

#### Success Response

**Code** : `200 OK`

**Content examples**

Response show updated name, city and ticketsmax for event with id 5
```
{
    "eventrecord_id": 5,
    "eventrecord_name": "Tapahtuma 555 ",
    "venue": "Place 5",
    "city": "Vantaa",
    "ticketsmax": 300,
    "event_starttime": "2023-02-02T19:00:00",
    "event_endtime": "2023-02-02T23:30:00",
    "deleted": false
}
```
#### Error response

**Condition** : Id doesn't exist.

**Code** : `404 Not Found`


### Delete By Id

**URL:** `/events/{id}`

**Method:** `DELETE`

**Auth required:** NO (needs to be fixed)

**Permissions required:** NO

#### Success Response

**Code** : `200 OK`

**Content examples**

 ```
 Event with id 4 was successfully deleted
 ```

#### Error response

**Condition** : Id does not exist

**Code** : `404 Not Found`

**Content examples**

/events/99
```
Event with id 99 doesn't exist
```

<br>

## Ticket

### List All Tickets

**URL:** `/tickets`

**Method:** `GET`

**Auth required:** NO (needs to be fixed)

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
        "eventRecord": {
            "eventrecord_id": 1,
            "eventrecord_name": "Tapahtuma 1",
            "venue": "Paikka 1",
            "city": "Kaupunki 1",
            "ticketsmax": 100,
            "event_starttime": "2023-01-01T11:11:00",
            "event_endtime": "2023-01-01T23:23:00",
            "deleted": false
        },
        "salesEvent": {
            "salesevent_id": 1,
            "sale_date": "2023-01-01T12:01:00",
            "price": 25.5,
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
        "eventRecord": {
            "eventrecord_id": 1,
            "eventrecord_name": "Tapahtuma 1",
            "venue": "Paikka 1",
            "city": "Kaupunki 1",
            "ticketsmax": 100,
            "event_starttime": "2023-01-01T11:11:00",
            "event_endtime": "2023-01-01T23:23:00",
            "deleted": false
        },
        "salesEvent": {
            "salesevent_id": 2,
            "sale_date": "2023-02-02T12:02:00",
            "price": 11.1,
            "deleted": false,
            "appUser": null
        }
    }
]
```
#### Error response


### Find By Id

**URL:** `/tickets/{id}`

**Method:** `GET`

**Auth required:** NO (needs to be fixed)

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
        "price": 44.4,
        "deleted": false,
        "appUser": null
    }
}
```
#### Error response

**Condition** : Id does not exist

**Code** : `400 Bad Request`

**Content examples**

/tickets/99
```
Ticket with id 99 doesn't exist
```

### Add new ticket

**URL:** `/tickets`

**Method:** `POST`

**Auth required:** NO (needs to be fixed)

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
    "eventRecord": {
        "eventrecord_id": 2
    },
    "salesEvent": {
        "salesevent_id": 4
    }
}
```
#### Error response

**Condition** : Values given in invalid format

**Code** : `403 Forbidden`


### Update ticket

**URL:** `/tickets/{id}`

**Method:** `PUT`

**Auth required:** NO (needs to be fixed)

**Permissions required:** NO

#### Success Response

**Code** : `200 OK`

**Content examples**

Response show updated price for ticket with id 5
```
{
    "ticket_id": 7,
    "ticket_code": "CODE05",
    "deleted": false,
    "price": 180.0,
    "ticketType": {
        "ticket_type_id": 7,
        "name": null,
        "price": 0.0,
        "deleted": false,
        "eventRecord": null
    },
    "eventRecord": {
        "eventrecord_id": 3,
        "eventrecord_name": null,
        "venue": null,
        "city": null,
        "ticketsmax": 0,
        "event_starttime": null,
        "event_endtime": null,
        "deleted": false
    },
    "salesEvent": {
        "salesevent_id": 4,
        "sale_date": null,
        "price": 0.0,
        "deleted": false,
        "appUser": null
    }
}
```
#### Error responses

**Condition** : Id does not exist

**Code** : `400 Bad Request`

**Content examples**

/tickets/99
```
Ticket with id 99 doesn't exist
```

**Condition** : Linked resources do not exist

**Code** : `400 Bad Request``

**Content examples**
```
SalesEvent with id 99 doesn't exist
```
```
Event with id 99 doesn't exist
```
```
TicketType with id 99 doesn't exist
```



### Delete By Id

**URL:** `/tickets/{id}`

**Method:** `DELETE`

**Auth required:** NO (needs to be fixed)

**Permissions required:** NO

#### Success Response

**Code** : `200 OK`

**Content examples**

 ```
Ticket with id 7 was successfully deleted
 ```

#### Error response

**Condition** : Id does not exist

**Code** : `400 Bad Request`

**Content examples**

/tickets/99
```
Ticket with id 99 doesn't exist
```



<br>

## TicketType

### List All TicketTypes

**URL:** `/tickettypes`

**Method:** `GET`

**Auth required:** NO (needs to be fixed)

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
#### Error Response

### Find By Id

**URL:** `/tickettypes/{id}`

**Method:** `GET`

**Auth required:** NO (needs to be fixed)

**Permissions required:** NO

#### Success Response

**Condition**: If everything is OK and tickettype_id is found

**Code** : `200 OK`

**Content examples**

/ticketttypes/1

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

**Code** : `400 Bad Request`

**Content examples**

/tickettypes/99
```
TicketType with id 99 doesn't exist
```

### Add new TicketType

**URL:** `/tickettypes`

**Method:** `POST`

**Auth required:** NO (needs to be fixed)

**Permissions required:** NO

#### Success Response

**Condition**: If everything is OK

**Code** : `201 Created`

**Content examples**
```
{
    "ticket_type_id": 5,
    "name": "test",
    "price": 11.0,
    "deleted": false,
    "eventRecord": {
        "eventrecord_id": 1
    }
}
```
#### Error Response

**Condition** : Linked resource does not exist

**Code** : `400 Bad Request`

**Content examples**

/tickettypes
```
Event with id 99 doesn't exist
```

### Update TicketType

**URL:** `/tickettypes/{id}`

**Method:** `PUT`

**Auth required:** NO (needs to be fixed)

**Permissions required:** NO

#### Success Response

**Code** : `200 OK`

**Content examples**

Response show updated name for ticket type with id 1
```
{
    "ticket_type_id": 1,
    "name": "Mörkö",
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

**Code** : `400 Bad Request`

**Content examples**

/tickettypes/99
```
TicketType with id 99 doesn't exist
```

**Condition** : Linked resource does not exist

**Code** : `400 Bad Request``

**Content examples**
```
Event with id 99 doesn't exist
```


### Delete By Id

**URL:** `/tickettypes/{id}`

**Method:** `DELETE`

**Auth required:** NO (needs to be fixed)

**Permissions required:** NO

#### Success Response

**Code** : `200 OK`

**Content examples**

 ```
 TicketType with id 5 was successfully deleted
 ```

#### Error Response

**Condition** : Id does not exist

**Code** : `400 Bad Request`

**Content examples**

/tickettypes/99
```
TicketType with id 99 doesn't exist
```

<br>

## SalesEvent

### List All SalesEvents

**URL:** `/salesevent`

**Method:** `GET`

**Auth required:** NO (needs to be fixed)

**Permissions required:** NO

#### Success Response

**Code** : `200 OK`

**Content examples**

```
[
    {
        "salesevent_id": 1,
        "sale_date": "2023-01-01T12:01:00",
        "price": 25.5,
        "deleted": false,
        "appUser": null
    },
    {
        "salesevent_id": 2,
        "sale_date": "2023-02-02T12:02:00",
        "price": 11.1,
        "deleted": false,
        "appUser": null
    },
...
...
...
    {
        "salesevent_id": 9,
        "sale_date": "2023-09-09T12:09:00",
        "price": 88.8,
        "deleted": false,
        "appUser": null
    }

]
```
#### Error Response

### Find By Id

**URL:** `/salesevents/{id}`

**Method:** `GET`

**Auth required:** NO (needs to be fixed)

**Permissions required:** NO

#### Success Response

**Condition**: If everything is OK and salesevent_id is found

**Code** : `200 OK`

**Content examples**

/salesevents/3

```
{
    "salesevent_id": 3,
    "sale_date": "2023-03-03T12:03:00",
    "price": 22.2,
    "deleted": false,
    "appUser": null
}
```
#### Error Response

**Condition** : Id does not exist

**Code** : `400 Bad Request`

**Content examples**

/salesevents/99
```
SalesEvent with id 99 doesn't exist
```

### Add new SalesEvent

**URL:** `/salesevents`

**Method:** `POST`

**Auth required:** NO (needs to be fixed)

**Permissions required:** NO

#### Success Response

**Condition**: If everything is OK

**Code** : `201 Created`

**Content examples**
```
{
    "salesevent_id": 11,
    "sale_date": "2023-03-03T12:03:00",
    "price": 59.9,
    "deleted": false,
    "appUser": null
}
```
#### Error Response

**Condition** : Values given in invalid format

**Code** : `403 Forbidden`

### Update SalesEvent

**URL:** `/salesevents/{id}`

**Method:** `PUT`

**Auth required:** NO (needs to be fixed)

**Permissions required:** NO

#### Success Response

**Code** : `200 OK`

**Content examples**

Response show updated price for sales event with id 10
```
{
    "salesevent_id": 10,
    "sale_date": "2023-01-01T12:01:00",
    "price": 30.5,
    "deleted": false,
    "appUser": null
}
```
#### Error Response

**Condition** : Id does not exist

**Code** : `400 Bad Request`

**Content examples**

/salesevents/99
```
SalesEvent with id 99 doesn't exist
```


### Delete By Id

**URL:** `/salesevents/{id}`

**Method:** `DELETE`

**Auth required:** NO (needs to be fixed)

**Permissions required:** NO

#### Success Response

**Code** : `200 OK`

**Content examples**

 ```
 SalesEvent with id 10 was successfully deleted
 ```

#### Error Response

**Condition** : Id does not exist

**Code** : `400 Bad Request`

**Content examples**

/salesevents/99
```
SalesEvent with id 99 doesn't exist
```

<br>

## AppUser

<br>

## UserRole

