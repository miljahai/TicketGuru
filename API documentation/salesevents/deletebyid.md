## SalesEvent

### Delete By Id

**URL:** `/salesevents/{id}`

**Method:** `DELETE`

**Auth required:** YES

**Permissions required:** NO

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