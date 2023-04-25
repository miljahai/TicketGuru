## AppUser

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