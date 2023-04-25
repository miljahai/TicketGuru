## AppUser

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