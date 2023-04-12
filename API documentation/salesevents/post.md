## SalesEvent

### Add new SalesEvent

**URL:** `/salesevents`

**Method:** `POST`

**Auth required:** YES

**Permissions required:** NO

#### Success Response

**Condition**: If everything is OK

**Code** : `201 Created`

**Content examples**
```
{
    "salesevent_id": 11,
    "sale_date": "2023-03-03T12:03:00",
    "price": 59.9,
    "deleted": false,
    "appUser": null
}
```
#### Error Response

**Condition** : Values given in invalid format

**Code** : `400 Bad Request`

**Content examples**
```
{
    "final_price": "price cannot be negative"
}
```