## Ticket

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