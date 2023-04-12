## AppUser

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