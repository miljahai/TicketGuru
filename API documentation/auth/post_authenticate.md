## Auth

### Authenticate username (email) and password, return JWT token

**URL:** `/auth/authenticate`

**Method:** `GET`

**Body:**
```
{
    "email":"",
    "password":""
}
```

**Auth required:** NO

**Permissions required:** NO

#### Success Response

**Condition**: Email and password are valid. User with email and password exist in AppUser table.

**Code** : `200 OK`

**Content examples**

/events/2

```
{
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0LmFkbWluQHRpY2tldGd1cnUuY29tIiwiaWF0IjoxNjgxMjkzMTYwLCJleHAiOjE2ODEyOTQ2MDB9.tLcdrj8R-DgdVJd4PGca62WcMPB4_SFOFGfDzKfPivs"
}
```
#### Error response

**Condition** : Email does not exist or password is incorrect

**Code** : `401 Unauthorized`

**Content examples**

/events/99
```
{
    "timestamp": "12-04-2023 12:53:37",
    "status": 401,
    "message": "Authentication failed"
}
```