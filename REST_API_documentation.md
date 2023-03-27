# TicketGuru REST API

## Base URL
https://ticketguru.com

## EventRecord

### List All Events

**URL:** `/events`

**Method:** `GET`

**Auth required:** YES

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

**Condition** : No events exist. Returns empty array.

**Code** : `200 OK`

```
[]
```

<br>

### Find By Id

**URL:** `/events/{id}`

**Method:** `GET`

**Auth required:** YES

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
{
    "timestamp": "27-03-2023 08:35:27",
    "status": 404,
    "message": "Event not found with id 50"
}
```
<br>

### Add new event

**URL:** `/events`

**Method:** `POST`

**Auth required:** YES

**Permissions required:** ADMIN, EVENTS

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

**Content examples**
```
{
    "ticketsmax": "number of tickets cannot be negative"
}
```


### Update event

**URL:** `/events/{id}`

**Method:** `PUT`

**Auth required:** YES

**Permissions required:** ADMIN, EVENTS

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

**Content examples**
```
{
    "timestamp": "27-03-2023 09:18:33",
    "status": 404,
    "message": "Event not found with id: 50"
}
```

**Condition** : Values given in invalid format

**Code** : `400 Bad Request`

**Content examples**
```
{
    "eventrecord_name": "must not be null"
}
```

<br>

### Delete By Id

**URL:** `/events/{id}`

**Method:** `DELETE`

**Auth required:** YES

**Permissions required:** ADMIN, EVENTS

#### Success Response

**Code** : `200 OK`

#### Error response

**Condition** : Id does not exist

**Code** : `404 Not Found`

**Content examples**

/events/99
```
{
    "timestamp": "27-03-2023 09:20:37",
    "status": 404,
    "message": "Event not found with id 99"
}
```

<br>

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

<br>

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

<br>

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

<br>

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
<br>

### Delete By Id

**URL:** `/tickets/{id}`

**Method:** `DELETE`

**Auth required:** YES

**Permissions required:** NO

#### Success Response

**Code** : `200 OK`

#### Error response

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

<br>

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

<br>

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
<br>

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
<br>

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

<br>

### Delete By Id

**URL:** `/tickettypes/{id}`

**Method:** `DELETE`

**Auth required:** YES

**Permissions required:** ADMIN, EVENTS

#### Success Response

**Code** : `200 OK`

#### Error Response

**Condition** : Id does not exist

**Code** : `404 Not Found`

**Content examples**

/tickettypes/99
```
{
    "timestamp": "27-03-2023 09:49:37",
    "status": 404,
    "message": "TicketType not found with id 99"
}
```

<br>

## SalesEvent

### List All SalesEvents

**URL:** `/salesevent`

**Method:** `GET`

**Auth required:** YES

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
**Condition** : No SalesEvents exist. Returns empty array.

**Code** : `200 OK`

```
[]
```

<br>

### Find By Id

**URL:** `/salesevents/{id}`

**Method:** `GET`

**Auth required:** YES

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

**Code** : `404 Not Found`

**Content examples**

/salesevents/99
```
{
    "timestamp": "27-03-2023 09:54:54",
    "status": 404,
    "message": "SalesEvent not found with id 99"
}
```
<br>

### Add new SalesEvent

**URL:** `/salesevents`

**Method:** `POST`

**Auth required:** YES

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

**Code** : `400 Bad Request`

**Content examples**
```
{
    "final_price": "price cannot be negative"
}
```

<br>

### Update SalesEvent

**URL:** `/salesevents/{id}`

**Method:** `PUT`

**Auth required:** YES

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

**Code** : `404 Not Found`

**Content examples**

/salesevents/99
```
{
    "timestamp": "27-03-2023 09:57:59",
    "status": 404,
    "message": "SalesEvent not found with id: 99"
}
```
<br>

### Delete By Id

**URL:** `/salesevents/{id}`

**Method:** `DELETE`

**Auth required:** YES

**Permissions required:** ADMIN, EVENTS

#### Success Response

**Code** : `200 OK`

#### Error Response

**Condition** : Id does not exist

**Code** : `404 Not Found`

**Content examples**

/salesevents/99
```
{
    "timestamp": "27-03-2023 09:59:46",
    "status": 404,
    "message": "SalesEvent not found with id 99"
}
```

<br>

## AppUser

### List All Users

**URL:** `/users`

**Method:** `GET`

**Auth required:** YES

**Permissions required:** ADMIN

#### Success Response

**Code** : `200 OK`

**Content examples**

```
[
    {
        "appuser_id": 1,
        "firstname": "Test",
        "lastname": "Admin",
        "email": "test.admin@ticketguru.com",
        "password": bcrypted password,
        "deleted": false,
        "userrole": "ADMIN",
        "enabled": true,
        "accountNonExpired": true,
        "credentialsNonExpired": true,
        "authorities": [
            {
                "authority": "ADMIN"
            }
        ],
        "username": "test.admin@ticketguru.com",
        "accountNonLocked": true
    },
    {
        "appuser_id": 2,
        "firstname": "Test",
        "lastname": "Sales",
        "email": "test.sales@ticketguru.com",
        "password": bcrypted password,
        "deleted": false,
        "userrole": "SALES",
        "enabled": true,
        "accountNonExpired": true,
        "credentialsNonExpired": true,
        "authorities": [
            {
                "authority": "SALES"
            }
        ],
        "username": "test.sales@ticketguru.com",
        "accountNonLocked": true
    },
    {
        "appuser_id": 3,
        "firstname": "Test",
        "lastname": "Events",
        "email": "test.events@ticketguru.com",
        "password": bcrypted password,
        "deleted": false,
        "userrole": "EVENTS",
        "enabled": true,
        "accountNonExpired": true,
        "credentialsNonExpired": true,
        "authorities": [
            {
                "authority": "EVENTS"
            }
        ],
        "username": "test.events@ticketguru.com",
        "accountNonLocked": true
    }
]
```

<br>

### Find By Id

**URL:** `/users/{id}`

**Method:** `GET`

**Auth required:** YES

**Permissions required:** ADMIN

#### Success Response

**Condition**: If everything is OK and appuser_id is found

**Code** : `200 OK`

**Content examples**

/users/3

```
{
    "appuser_id": 3,
    "firstname": "Test",
    "lastname": "Events",
    "email": "test.events@ticketguru.com",
    "password": bcrypted password,
    "deleted": false,
    "userrole": "EVENTS",
    "enabled": true,
    "accountNonExpired": true,
    "credentialsNonExpired": true,
    "authorities": [
        {
            "authority": "EVENTS"
        }
    ],
    "username": "test.events@ticketguru.com",
    "accountNonLocked": true
}
```
#### Error Response

**Condition** : Id does not exist

**Code** : `404 Not Found`

**Content examples**

/users/99
```
{
    "timestamp": "27-03-2023 10:07:50",
    "status": 404,
    "message": "User not found with id 99"
}
```
<br>

### Register new AppUser

**URL:** `/auth/register`

**Method:** `POST`

**Auth required:** YES

**Permissions required:** ADMIN

#### Success Response

**Condition**: If everything is OK

**Code** : `201 Created`

**Content examples**
```
{
    "token": JWT token
}
```
#### Error Response

**Condition** : Values given in invalid format

**Code** : `400 Bad Request`

**Content examples**
```
{
    "email": "must be a well-formed email address"
}
```
**Condition** : Email already exists

**Code** : `409 Conflict`

**Content examples**
```
{
    "timestamp": "27-03-2023 10:12:58",
    "status": 409,
    "message": "Email already exists"
}
```

<br>

### Update User

**URL:** `/users/{id}`

**Method:** `PUT`

**Auth required:** YES

**Permissions required:** ADMIN

#### Success Response

**Code** : `200 OK`

**Content examples**

Response show updated authority for appUser 4
```
{
    "appuser_id": 4,
    "firstname": "Test",
    "lastname": "Admin2",
    "email": "test.admin2@ticketguru.com",
    "password": bcrypted password,
    "deleted": false,
    "userrole": "ADMIN",
    "enabled": true,
    "accountNonExpired": true,
    "credentialsNonExpired": true,
    "authorities": [
        {
            "authority": "ADMIN"
        }
    ],
    "username": "test.admin2@ticketguru.com",
    "accountNonLocked": true
}
```
#### Error Response

**Condition** : Id does not exist

**Code** : `404 Not Found`

**Content examples**

/users/99
```
{
    "timestamp": "27-03-2023 10:21:59",
    "status": 404,
    "message": "User not found with id: 99"
}
```
<br>

### Delete By Id

**URL:** `/users/{id}`

**Method:** `DELETE`

**Auth required:** YES

**Permissions required:** ADMIN

#### Success Response

**Code** : `200 OK`

#### Error Response

**Condition** : Id does not exist

**Code** : `404 Not Found`

**Content examples**

/users/99
```
{
    "timestamp": "27-03-2023 10:23:06",
    "status": 404,
    "message": "User not found with id 99"
}
```

<br>

## UserRole

