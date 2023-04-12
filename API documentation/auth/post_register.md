## Auth

### Register a new user, return JWT token

**URL:** `/auth/authenticate`

**Method:** `GET`

**Body:**
```
{
    "firstname":"",
    "lastname":"",
    "email":"",
    "password":""
}
```

**Auth required:** YES

**Permissions required:** ADMIN

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

**Condition** : Authorization missing

**Code** : `401 Unauthorized`

**Content examples**

/auth/register
```
```

**Condition** : Password is not valid

**Code** : `400 Bad Request`

**Content examples**

/auth/register
```
{
    "timestamp": "12-04-2023 12:59:41",
    "status": 400,
    "message": "The password must be between 8 and 30 characters long and include at least one uppercase letter, one lowercase letter, one special character, and one number."
}
```

<br><br>Not yet implemented
**Condition** : Email is not valid

**Code** : `400 Bad Request`

**Content examples**

/auth/register
```
{
    
}
```