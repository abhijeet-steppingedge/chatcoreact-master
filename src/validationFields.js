const fields = {
  "fields": {
    "checkout": {
      "name": {
        "hidden": [
          "original",
          "api",
          "hidden"
        ],
        "original": {
          "id": 1,
          "name": "Name",
          "code": "name",
          "validate": "checkout",
          "type": "text",
          "required": true,
          "enabled": true
        },
        "api": {
          "attributes": [],
          "query": {},
          "ordering": {
            "url": "https://apiv4.ordering.co",
            "version": "v400",
            "project": "myfoodv4",
            "language": "en",
            "accessToken": null,
            "apiKey": null,
            "appId": "ordering-react"
          }
        },
        "id": 1,
        "name": "Name",
        "code": "name",
        "validate": "checkout",
        "type": "text",
        "required": true,
        "enabled": true
      },
      "lastname": {
        "hidden": [
          "original",
          "api",
          "hidden"
        ],
        "original": {
          "id": 2,
          "name": "Last Name",
          "code": "lastname",
          "validate": "checkout",
          "type": "text",
          "required": false,
          "enabled": false
        },
        "api": {
          "attributes": [],
          "query": {},
          "ordering": {
            "url": "https://apiv4.ordering.co",
            "version": "v400",
            "project": "myfoodv4",
            "language": "en",
            "accessToken": null,
            "apiKey": null,
            "appId": "ordering-react"
          }
        },
        "id": 2,
        "name": "Last Name",
        "code": "lastname",
        "validate": "checkout",
        "type": "text",
        "required": false,
        "enabled": false
      },
      "email": {
        "hidden": [
          "original",
          "api",
          "hidden"
        ],
        "original": {
          "id": 3,
          "name": "Email",
          "code": "email",
          "validate": "checkout",
          "type": "text",
          "required": true,
          "enabled": true
        },
        "api": {
          "attributes": [],
          "query": {},
          "ordering": {
            "url": "https://apiv4.ordering.co",
            "version": "v400",
            "project": "myfoodv4",
            "language": "en",
            "accessToken": null,
            "apiKey": null,
            "appId": "ordering-react"
          }
        },
        "id": 3,
        "name": "Email",
        "code": "email",
        "validate": "checkout",
        "type": "text",
        "required": true,
        "enabled": true
      },
      "cellphone": {
        "hidden": [
          "original",
          "api",
          "hidden"
        ],
        "original": {
          "id": 4,
          "name": "Mobile phone",
          "code": "mobile_phone",
          "validate": "checkout",
          "type": "text",
          "required": true,
          "enabled": true
        },
        "api": {
          "attributes": [],
          "query": {},
          "ordering": {
            "url": "https://apiv4.ordering.co",
            "version": "v400",
            "project": "myfoodv4",
            "language": "en",
            "accessToken": null,
            "apiKey": null,
            "appId": "ordering-react"
          }
        },
        "id": 4,
        "name": "Mobile phone",
        "code": "mobile_phone",
        "validate": "checkout",
        "type": "text",
        "required": true,
        "enabled": true
      },
      "city_dropdown_option": {
        "hidden": [
          "original",
          "api",
          "hidden"
        ],
        "original": {
          "id": 5,
          "name": "City and dropdown option",
          "code": "city_dropdown_option",
          "validate": "checkout",
          "type": "select",
          "required": false,
          "enabled": true
        },
        "api": {
          "attributes": [],
          "query": {},
          "ordering": {
            "url": "https://apiv4.ordering.co",
            "version": "v400",
            "project": "myfoodv4",
            "language": "en",
            "accessToken": null,
            "apiKey": null,
            "appId": "ordering-react"
          }
        },
        "id": 5,
        "name": "City and dropdown option",
        "code": "city_dropdown_option",
        "validate": "checkout",
        "type": "select",
        "required": false,
        "enabled": true
      },
      "address": {
        "hidden": [
          "original",
          "api",
          "hidden"
        ],
        "original": {
          "id": 6,
          "name": "Address",
          "code": "address",
          "validate": "checkout",
          "type": "text",
          "required": true,
          "enabled": true
        },
        "api": {
          "attributes": [],
          "query": {},
          "ordering": {
            "url": "https://apiv4.ordering.co",
            "version": "v400",
            "project": "myfoodv4",
            "language": "en",
            "accessToken": null,
            "apiKey": null,
            "appId": "ordering-react"
          }
        },
        "id": 6,
        "name": "Address",
        "code": "address",
        "validate": "checkout",
        "type": "text",
        "required": true,
        "enabled": true
      },
      "zipcode": {
        "hidden": [
          "original",
          "api",
          "hidden"
        ],
        "original": {
          "id": 7,
          "name": "Zipcode",
          "code": "zipcode",
          "validate": "checkout",
          "type": "text",
          "required": true,
          "enabled": true
        },
        "api": {
          "attributes": [],
          "query": {},
          "ordering": {
            "url": "https://apiv4.ordering.co",
            "version": "v400",
            "project": "myfoodv4",
            "language": "en",
            "accessToken": null,
            "apiKey": null,
            "appId": "ordering-react"
          }
        },
        "id": 7,
        "name": "Zipcode",
        "code": "zipcode",
        "validate": "checkout",
        "type": "text",
        "required": true,
        "enabled": true
      },
      "address_notes": {
        "hidden": [
          "original",
          "api",
          "hidden"
        ],
        "original": {
          "id": 8,
          "name": "Address notes",
          "code": "address_notes",
          "validate": "checkout",
          "type": "text",
          "required": false,
          "enabled": true
        },
        "api": {
          "attributes": [],
          "query": {},
          "ordering": {
            "url": "https://apiv4.ordering.co",
            "version": "v400",
            "project": "myfoodv4",
            "language": "en",
            "accessToken": null,
            "apiKey": null,
            "appId": "ordering-react"
          }
        },
        "id": 8,
        "name": "Address notes",
        "code": "address_notes",
        "validate": "checkout",
        "type": "text",
        "required": false,
        "enabled": true
      },
      "coupon": {
        "name": "Table No.",
        "code": "table_no",
        "validate": "checkout",
        "type": "select",
        "required": true,
        "enabled": true
      },
      "coupon": {
        "hidden": [
          "original",
          "api",
          "hidden"
        ],
        "original": {
          "id": 9,
          "name": "Coupon",
          "code": "coupon",
          "validate": "checkout",
          "type": "text",
          "required": false,
          "enabled": true
        },
        "api": {
          "attributes": [],
          "query": {},
          "ordering": {
            "url": "https://apiv4.ordering.co",
            "version": "v400",
            "project": "myfoodv4",
            "language": "en",
            "accessToken": null,
            "apiKey": null,
            "appId": "ordering-react"
          }
        },
        "id": 9,
        "name": "Coupon",
        "code": "coupon",
        "validate": "checkout",
        "type": "text",
        "required": false,
        "enabled": true
      },
      "driver_tip": {
        "hidden": [
          "original",
          "api",
          "hidden"
        ],
        "original": {
          "id": 10,
          "name": "Driver tip",
          "code": "driver_tip",
          "validate": "checkout",
          "type": "text",
          "required": false,
          "enabled": true
        },
        "api": {
          "attributes": [],
          "query": {},
          "ordering": {
            "url": "https://apiv4.ordering.co",
            "version": "v400",
            "project": "myfoodv4",
            "language": "en",
            "accessToken": null,
            "apiKey": null,
            "appId": "ordering-react"
          }
        },
        "id": 10,
        "name": "Driver tip",
        "code": "driver_tip",
        "validate": "checkout",
        "type": "text",
        "required": false,
        "enabled": true
      },
      "middle_name": {
        "hidden": [
          "original",
          "api",
          "hidden"
        ],
        "original": {
          "id": 22,
          "name": "Middle name",
          "code": "middle_name",
          "validate": "checkout",
          "type": "text",
          "required": false,
          "enabled": false
        },
        "api": {
          "attributes": [],
          "query": {},
          "ordering": {
            "url": "https://apiv4.ordering.co",
            "version": "v400",
            "project": "myfoodv4",
            "language": "en",
            "accessToken": null,
            "apiKey": null,
            "appId": "ordering-react"
          }
        },
        "id": 22,
        "name": "Middle name",
        "code": "middle_name",
        "validate": "checkout",
        "type": "text",
        "required": false,
        "enabled": false
      },
      "second_lastname": {
        "hidden": [
          "original",
          "api",
          "hidden"
        ],
        "original": {
          "id": 23,
          "name": "Second lastname",
          "code": "second_lastname",
          "validate": "checkout",
          "type": "text",
          "required": false,
          "enabled": false
        },
        "api": {
          "attributes": [],
          "query": {},
          "ordering": {
            "url": "https://apiv4.ordering.co",
            "version": "v400",
            "project": "myfoodv4",
            "language": "en",
            "accessToken": null,
            "apiKey": null,
            "appId": "ordering-react"
          }
        },
        "id": 23,
        "name": "Second lastname",
        "code": "second_lastname",
        "validate": "checkout",
        "type": "text",
        "required": false,
        "enabled": false
      }
    },
    "address": {
      "address": {
        "hidden": [
          "original",
          "api",
          "hidden"
        ],
        "original": {
          "id": 11,
          "name": "Address",
          "code": "address",
          "validate": "address",
          "type": "text",
          "required": false,
          "enabled": true
        },
        "api": {
          "attributes": [],
          "query": {},
          "ordering": {
            "url": "https://apiv4.ordering.co",
            "version": "v400",
            "project": "myfoodv4",
            "language": "en",
            "accessToken": null,
            "apiKey": null,
            "appId": "ordering-react"
          }
        },
        "id": 11,
        "name": "Address",
        "code": "address",
        "validate": "address",
        "type": "text",
        "required": false,
        "enabled": true
      },
      "address_notes": {
        "hidden": [
          "original",
          "api",
          "hidden"
        ],
        "original": {
          "id": 12,
          "name": "Address notes",
          "code": "address_notes",
          "validate": "address",
          "type": "text",
          "required": false,
          "enabled": true
        },
        "api": {
          "attributes": [],
          "query": {},
          "ordering": {
            "url": "https://apiv4.ordering.co",
            "version": "v400",
            "project": "myfoodv4",
            "language": "en",
            "accessToken": null,
            "apiKey": null,
            "appId": "ordering-react"
          }
        },
        "id": 12,
        "name": "Address notes",
        "code": "address_notes",
        "validate": "address",
        "type": "text",
        "required": false,
        "enabled": true
      },
      "city_dropdown_option": {
        "hidden": [
          "original",
          "api",
          "hidden"
        ],
        "original": {
          "id": 13,
          "name": "City and dropdown option",
          "code": "city_dropdown_option",
          "validate": "address",
          "type": "select",
          "required": false,
          "enabled": false
        },
        "api": {
          "attributes": [],
          "query": {},
          "ordering": {
            "url": "https://apiv4.ordering.co",
            "version": "v400",
            "project": "myfoodv4",
            "language": "en",
            "accessToken": null,
            "apiKey": null,
            "appId": "ordering-react"
          }
        },
        "id": 13,
        "name": "City and dropdown option",
        "code": "city_dropdown_option",
        "validate": "address",
        "type": "select",
        "required": false,
        "enabled": false
      },
      "internal_number": {
        "hidden": [
          "original",
          "api",
          "hidden"
        ],
        "original": {
          "id": 14,
          "name": "Internal Number",
          "code": "internal_number",
          "validate": "address",
          "type": "text",
          "required": false,
          "enabled": true
        },
        "api": {
          "attributes": [],
          "query": {},
          "ordering": {
            "url": "https://apiv4.ordering.co",
            "version": "v400",
            "project": "myfoodv4",
            "language": "en",
            "accessToken": null,
            "apiKey": null,
            "appId": "ordering-react"
          }
        },
        "id": 14,
        "name": "Internal Number",
        "code": "internal_number",
        "validate": "address",
        "type": "text",
        "required": false,
        "enabled": true
      },
      "zipcode": {
        "hidden": [
          "original",
          "api",
          "hidden"
        ],
        "original": {
          "id": 15,
          "name": "Zipcode",
          "code": "zipcode",
          "validate": "address",
          "type": "text",
          "required": false,
          "enabled": true
        },
        "api": {
          "attributes": [],
          "query": {},
          "ordering": {
            "url": "https://apiv4.ordering.co",
            "version": "v400",
            "project": "myfoodv4",
            "language": "en",
            "accessToken": null,
            "apiKey": null,
            "appId": "ordering-react"
          }
        },
        "id": 15,
        "name": "Zipcode",
        "code": "zipcode",
        "validate": "address",
        "type": "text",
        "required": false,
        "enabled": true
      },
      "name": {
        "hidden": [
          "original",
          "api",
          "hidden"
        ],
        "original": {
          "id": 16,
          "name": "Name",
          "code": "name",
          "validate": "address",
          "type": "text",
          "required": false,
          "enabled": false
        },
        "api": {
          "attributes": [],
          "query": {},
          "ordering": {
            "url": "https://apiv4.ordering.co",
            "version": "v400",
            "project": "myfoodv4",
            "language": "en",
            "accessToken": null,
            "apiKey": null,
            "appId": "ordering-react"
          }
        },
        "id": 16,
        "name": "Name",
        "code": "name",
        "validate": "address",
        "type": "text",
        "required": false,
        "enabled": false
      },
      "lastname": {
        "hidden": [
          "original",
          "api",
          "hidden"
        ],
        "original": {
          "id": 17,
          "name": "Lastname",
          "code": "lastname",
          "validate": "address",
          "type": "text",
          "required": false,
          "enabled": false
        },
        "api": {
          "attributes": [],
          "query": {},
          "ordering": {
            "url": "https://apiv4.ordering.co",
            "version": "v400",
            "project": "myfoodv4",
            "language": "en",
            "accessToken": null,
            "apiKey": null,
            "appId": "ordering-react"
          }
        },
        "id": 17,
        "name": "Lastname",
        "code": "lastname",
        "validate": "address",
        "type": "text",
        "required": false,
        "enabled": false
      },
      "cellphone": {
        "hidden": [
          "original",
          "api",
          "hidden"
        ],
        "original": {
          "id": 18,
          "name": "Cellphone",
          "code": "mobile_phone",
          "validate": "address",
          "type": "text",
          "required": false,
          "enabled": false
        },
        "api": {
          "attributes": [],
          "query": {},
          "ordering": {
            "url": "https://apiv4.ordering.co",
            "version": "v400",
            "project": "myfoodv4",
            "language": "en",
            "accessToken": null,
            "apiKey": null,
            "appId": "ordering-react"
          }
        },
        "id": 18,
        "name": "Cellphone",
        "code": "mobile_phone",
        "validate": "address",
        "type": "text",
        "required": false,
        "enabled": false
      },
      "email": {
        "hidden": [
          "original",
          "api",
          "hidden"
        ],
        "original": {
          "id": 19,
          "name": "Email",
          "code": "email",
          "validate": "address",
          "type": "text",
          "required": false,
          "enabled": false
        },
        "api": {
          "attributes": [],
          "query": {},
          "ordering": {
            "url": "https://apiv4.ordering.co",
            "version": "v400",
            "project": "myfoodv4",
            "language": "en",
            "accessToken": null,
            "apiKey": null,
            "appId": "ordering-react"
          }
        },
        "id": 19,
        "name": "Email",
        "code": "email",
        "validate": "address",
        "type": "text",
        "required": false,
        "enabled": false
      },
      "middle_name": {
        "hidden": [
          "original",
          "api",
          "hidden"
        ],
        "original": {
          "id": 20,
          "name": "Middle name",
          "code": "middle_name",
          "validate": "address",
          "type": "text",
          "required": false,
          "enabled": false
        },
        "api": {
          "attributes": [],
          "query": {},
          "ordering": {
            "url": "https://apiv4.ordering.co",
            "version": "v400",
            "project": "myfoodv4",
            "language": "en",
            "accessToken": null,
            "apiKey": null,
            "appId": "ordering-react"
          }
        },
        "id": 20,
        "name": "Middle name",
        "code": "middle_name",
        "validate": "address",
        "type": "text",
        "required": false,
        "enabled": false
      },
      "second_lastname": {
        "hidden": [
          "original",
          "api",
          "hidden"
        ],
        "original": {
          "id": 21,
          "name": "Second lastname",
          "code": "second_lastname",
          "validate": "address",
          "type": "text",
          "required": false,
          "enabled": false
        },
        "api": {
          "attributes": [],
          "query": {},
          "ordering": {
            "url": "https://apiv4.ordering.co",
            "version": "v400",
            "project": "myfoodv4",
            "language": "en",
            "accessToken": null,
            "apiKey": null,
            "appId": "ordering-react"
          }
        },
        "id": 21,
        "name": "Second lastname",
        "code": "second_lastname",
        "validate": "address",
        "type": "text",
        "required": false,
        "enabled": false
      }
    }
  }
}

export default fields;