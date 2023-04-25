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