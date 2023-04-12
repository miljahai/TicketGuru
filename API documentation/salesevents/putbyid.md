## SalesEvent

### Update SalesEvent

**URL:** `/salesevents/{id}`

**Method:** `PUT`

**Auth required:** YES

**Permissions required:** NO

#### Success Response

**Code** : `200 OK`

**Content examples**

Response show updated price for sales event with id 10
```
{
    "salesevent_id": 10,
    "sale_date": "2023-01-01T12:01:00",
    "price": 30.5,
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
    "timestamp": "27-03-2023 09:57:59",
    "status": 404,
    "message": "SalesEvent not found with id: 99"
}
```