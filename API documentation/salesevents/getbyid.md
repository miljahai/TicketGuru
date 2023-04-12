## SalesEvent

### Find By Id

**URL:** `/salesevents/{id}`

**Method:** `GET`

**Auth required:** YES

**Permissions required:** NO

#### Success Response

**Condition**: If everything is OK and salesevent_id is found

**Code** : `200 OK`

**Content examples**

/salesevents/3

```
{
    "salesevent_id": 3,
    "sale_date": "2023-03-03T12:03:00",
    "price": 22.2,
    "deleted": false,
    "appUser": null
}
```
#### Error Response

**Condition** : Id does not exist

**Code** : `404 Not Found`

**Content examples**

/salesevents/99
```
{
    "timestamp": "27-03-2023 09:54:54",
    "status": 404,
    "message": "SalesEvent not found with id 99"
}
```