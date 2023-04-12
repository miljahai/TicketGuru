## SalesEvent

## SalesEvent

### List All SalesEvents

**URL:** `/salesevent`

**Method:** `GET`

**Auth required:** YES

**Permissions required:** NO

#### Success Response

**Code** : `200 OK`

**Content examples**

```
[
    {
        "salesevent_id": 1,
        "sale_date": "2023-01-01T12:01:00",
        "price": 25.5,
        "deleted": false,
        "appUser": null
    },
    {
        "salesevent_id": 2,
        "sale_date": "2023-02-02T12:02:00",
        "price": 11.1,
        "deleted": false,
        "appUser": null
    },
...
...
...
    {
        "salesevent_id": 9,
        "sale_date": "2023-09-09T12:09:00",
        "price": 88.8,
        "deleted": false,
        "appUser": null
    }

]
```
**Condition** : No SalesEvents exist. Returns empty array.

**Code** : `200 OK`

```
[]
```