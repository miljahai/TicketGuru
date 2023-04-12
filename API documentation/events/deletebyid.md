## EventRecord

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