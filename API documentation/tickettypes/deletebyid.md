## TicketType

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