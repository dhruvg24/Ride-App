# API Documentation

## Endpoints

### 1. `/users/register-user`

#### Description

This endpoint is used to register a new user in the application. It accepts user details, validates the input, hashes the password, and creates a new user in the database. Upon successful registration, it returns an authentication token and the user details.

#### Endpoint

**URL:** `/users/register-user`  
**Method:** `POST`

#### Request Body

The request body must be sent in JSON format and include the following fields:

##### Required Fields:

- **fullname.firstname**: (String) First name of the user. Must be at least 3 characters long.
- **fullname.lastname**: (String) Last name of the user. Optional but must be at least 3 characters long if provided.
- **email**: (String) Email address of the user. Must be a valid email format.
- **password**: (String) Password for the user account. Must be at least 6 characters long.

##### Example Request Body:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

#### Response

##### Success Response:

- **Status Code:** `201 Created`
- **Body:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

##### Error Responses:

1. **Validation Errors:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
   ```json
   {
     "errors": [
       {
         "msg": "First name must be atleast 3 characters long",
         "param": "fullname.firstname",
         "location": "body"
       },
       {
         "msg": "Invalid Email",
         "param": "email",
         "location": "body"
       }
     ]
   }
   ```

2. **Missing Fields:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
   ```json
   {
     "message": "All fields are required"
   }
   ```

---

### 2. `/users/login-user`

#### Description

This endpoint is used to authenticate an existing user. It validates the provided email and password, checks if the credentials match, and returns an authentication token along with the user details.

#### Endpoint

**URL:** `/users/login-user`  
**Method:** `POST`

#### Request Body

The request body must be sent in JSON format and include the following fields:

##### Required Fields:

- **email**: (String) Email address of the user. Must be a valid email format.
- **password**: (String) Password for the user account. Must be at least 6 characters long.

##### Example Request Body:

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

#### Response

##### Success Response:

- **Status Code:** `200 OK`
- **Body:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

##### Error Responses:

1. **Invalid Credentials:**
   - **Status Code:** `401 Unauthorized`
   - **Body:**
   ```json
   {
     "message": "Invalid email or password"
   }
   ```

2. **Validation Errors:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
   ```json
   {
     "errors": [
       {
         "msg": "Invalid Email",
         "param": "email",
         "location": "body"
       },
       {
         "msg": "Password must be atleast 6 characters long",
         "param": "password",
         "location": "body"
       }
     ]
   }
   ```

---

### 3. `/users/profile`

#### Description

This endpoint is used to retrieve the profile information of the authenticated user. The user must be logged in and provide a valid authentication token.

#### Endpoint

**URL:** `/users/profile`  
**Method:** `GET`

#### Headers

- **Authorization**: Bearer `<token>`

#### Response

##### Success Response:

- **Status Code:** `200 OK`
- **Body:**
```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

##### Error Responses:

1. **Unauthorized Access:**
   - **Status Code:** `401 Unauthorized`
   - **Body:**
   ```json
   {
     "message": "Authentication required"
   }
   ```

---

### 4. `/users/logout`

#### Description

This endpoint is used to log out the authenticated user. It clears the authentication token from cookies and adds the token to a blacklist to prevent reuse.

#### Endpoint

**URL:** `/users/logout`  
**Method:** `GET`

#### Headers

- **Authorization**: Bearer `<token>`

#### Response

##### Success Response:

- **Status Code:** `200 OK`
- **Body:**
```json
{
  "message": "Logged out successfully"
}
```

##### Error Responses:

1. **Unauthorized Access:**
   - **Status Code:** `401 Unauthorized`
   - **Body:**
   ```json
   {
     "message": "Authentication required"
   }
   ```

---

## Notes

- Passwords are hashed before being stored in the database for security purposes.
- All endpoints use `express-validator` for input validation where applicable.
- Ensure the `Authorization` header is included in requests requiring authentication.

## Related Files

- **Controller:** `user.controller.js`
- **Model:** `user.model.js`
- **Service:** `user.service.js`
- **Routes:** `user.routes.js`

# API Documentation

## Driver Endpoints

### 1. `/drivers/register-driver`

#### Description

This endpoint is used to register a new driver in the application. It accepts driver details, validates the input, hashes the password, and creates a new driver in the database. Upon successful registration, it returns an authentication token and the driver details.

#### Endpoint

**URL:** `/drivers/register-driver`  
**Method:** `POST`

#### Request Body

The request body must be sent in JSON format and include the following fields:

##### Required Fields:

```json
{
  "fullname": {
    "firstname": "Jane", // String: Must be at least 3 characters long
    "lastname": "Doe" // String: Optional, but must be at least 3 characters long if provided
  },
  "email": "jane.doe@example.com", // String: Must be a valid email format
  "password": "securepassword123", // String: Must be at least 6 characters long
  "vehicle": {
    "color": "Red", // String: Must be at least 3 characters long
    "plateNum": "MH 12 AB 1234", // String: Must match the format [A-Z]{2}\s?[0-9]{1,2}\s?[A-Z]{1,3}\s?[0-9]{1,4}
    "capacity": 4, // Number: Must be at least 1
    "vehicleType": "car" // String: Must be one of "car", "bike", "scooty", "auto"
  }
}
```

#### Response

##### Success Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // String: Authentication token
  "driver": {
    "_id": "60d21b4667d0d8992e610c85", // String: Unique identifier for the driver
    "fullname": {
      "firstname": "Jane", // String: First name of the driver
      "lastname": "Doe" // String: Last name of the driver
    },
    "email": "jane.doe@example.com", // String: Email address of the driver
    "vehicle": {
      "color": "Red", // String: Color of the vehicle
      "plateNum": "MH 12 AB 1234", // String: Vehicle plate number
      "capacity": 4, // Number: Capacity of the vehicle
      "vehicleType": "car" // String: Type of the vehicle
    }
  }
}
```

##### Error Responses:

1. **Validation Errors:**
   ```json
   {
     "errors": [
       {
         "msg": "First name should be at least 3 characters long", // Error message
         "param": "fullname.firstname", // Field causing the error
         "location": "body" // Location of the error
       },
       {
         "msg": "Please enter a valid vehicle plate number", // Error message
         "param": "vehicle.plateNum", // Field causing the error
         "location": "body" // Location of the error
       }
     ]
   }
   ```

2. **Driver Already Exists:**
   ```json
   {
     "error": "Driver with this email already exists" // Error message
   }
   ```

---

### 2. `/drivers/login-driver`

#### Description

This endpoint is used to authenticate an existing driver. It validates the provided email and password, checks if the credentials match, and returns an authentication token along with the driver details.

#### Endpoint

**URL:** `/drivers/login-driver`  
**Method:** `POST`

#### Request Body

```json
{
  "email": "jane.doe@example.com", // String: Must be a valid email format
  "password": "securepassword123" // String: Must be at least 6 characters long
}
```

#### Response

##### Success Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // String: Authentication token
  "driver": {
    "_id": "60d21b4667d0d8992e610c85", // String: Unique identifier for the driver
    "fullname": {
      "firstname": "Jane", // String: First name of the driver
      "lastname": "Doe" // String: Last name of the driver
    },
    "email": "jane.doe@example.com", // String: Email address of the driver
    "vehicle": {
      "color": "Red", // String: Color of the vehicle
      "plateNum": "MH 12 AB 1234", // String: Vehicle plate number
      "capacity": 4, // Number: Capacity of the vehicle
      "vehicleType": "car" // String: Type of the vehicle
    }
  }
}
```

##### Error Responses:

1. **Invalid Credentials:**
   ```json
   {
     "error": "Invalid email or password" // Error message
   }
   ```

2. **Validation Errors:**
   ```json
   {
     "errors": [
       {
         "msg": "Invalid email address", // Error message
         "param": "email", // Field causing the error
         "location": "body" // Location of the error
       },
       {
         "msg": "Password must be at least 6 characters long", // Error message
         "param": "password", // Field causing the error
         "location": "body" // Location of the error
       }
     ]
   }
   ```

---

### 3. `/drivers/profile`

#### Description

This endpoint is used to retrieve the profile information of the authenticated driver. The driver must be logged in and provide a valid authentication token.

#### Endpoint

**URL:** `/drivers/profile`  
**Method:** `GET`

#### Headers

```json
{
  "Authorization": "Bearer <token>" // String: Authentication token
}
```

#### Response

##### Success Response:

```json
{
  "driver": {
    "_id": "60d21b4667d0d8992e610c85", // String: Unique identifier for the driver
    "fullname": {
      "firstname": "Jane", // String: First name of the driver
      "lastname": "Doe" // String: Last name of the driver
    },
    "email": "jane.doe@example.com", // String: Email address of the driver
    "vehicle": {
      "color": "Red", // String: Color of the vehicle
      "plateNum": "MH 12 AB 1234", // String: Vehicle plate number
      "capacity": 4, // Number: Capacity of the vehicle
      "vehicleType": "car" // String: Type of the vehicle
    }
  }
}
```

##### Error Responses:

1. **Unauthorized Access:**
   ```json
   {
     "error": "Authentication required" // Error message
   }
   ```

---

### 4. `/drivers/logout`

#### Description

This endpoint is used to log out the authenticated driver. It clears the authentication token from cookies and adds the token to a blacklist to prevent reuse.

#### Endpoint

**URL:** `/drivers/logout`  
**Method:** `GET`

#### Headers

```json
{
  "Authorization": "Bearer <token>" // String: Authentication token
}
```

#### Response

##### Success Response:

```json
{
  "message": "Logged out successfully" // Success message
}
```

##### Error Responses:

1. **Unauthorized Access:**
   ```json
   {
     "error": "Authentication required" // Error message
   }
   ```
# API Documentation

## Maps Endpoints

### 1. `/maps/get-coordinates`

#### Description

This endpoint retrieves the latitude and longitude coordinates for a given address.

#### Endpoint

**URL:** `/maps/get-coordinates`  
**Method:** `GET`

#### Query Parameters

- **address**: (String) The address for which coordinates are required. Must be at least 3 characters long.

#### Headers

- **Authorization**: Bearer `<token>`

#### Response

##### Success Response:

- **Status Code:** `200 OK`
- **Body:**
```json
{
  "lat": 23.0225,
  "lng": 72.5714
}
```

##### Error Responses:

1. **Validation Errors:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
   ```json
   {
     "errors": [
       {
         "msg": "Invalid address",
         "param": "address",
         "location": "query"
       }
     ]
   }
   ```

2. **Coordinates Not Found:**
   - **Status Code:** `404 Not Found`
   - **Body:**
   ```json
   {
     "message": "Coordinates not found!"
   }
   ```

---

### 2. `/maps/get-distance-time`

#### Description

This endpoint calculates the distance and estimated travel time between two locations.

#### Endpoint

**URL:** `/maps/get-distance-time`  
**Method:** `GET`

#### Query Parameters

- **origin**: (String) The starting location. Must be at least 3 characters long.
- **destination**: (String) The destination location. Must be at least 3 characters long.

#### Headers

- **Authorization**: Bearer `<token>`

#### Response

##### Success Response:

- **Status Code:** `200 OK`
- **Body:**
```json
{
  "distance": {
    "text": "10.5 km",
    "value": 10500
  },
  "duration": {
    "text": "25 mins",
    "value": 1500
  }
}
```

##### Error Responses:

1. **Validation Errors:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
   ```json
   {
     "errors": [
       {
         "msg": "Invalid origin",
         "param": "origin",
         "location": "query"
       },
       {
         "msg": "Invalid destination",
         "param": "destination",
         "location": "query"
       }
     ]
   }
   ```

2. **No Routes Found:**
   - **Status Code:** `404 Not Found`
   - **Body:**
   ```json
   {
     "message": "No routes found!"
   }
   ```

---

### 3. `/maps/get-address-suggestions`

#### Description

This endpoint provides autocomplete suggestions for addresses based on user input.

#### Endpoint

**URL:** `/maps/get-address-suggestions`  
**Method:** `GET`

#### Query Parameters

- **input**: (String) The partial address input for suggestions. Must be at least 3 characters long.

#### Headers

- **Authorization**: Bearer `<token>`

#### Response

##### Success Response:

- **Status Code:** `200 OK`
- **Body:**
```json
[
  {
    "description": "123 Main Street, Ahmedabad, India"
  },
  {
    "description": "456 Elm Street, Ahmedabad, India"
  }
]
```

##### Error Responses:

1. **Validation Errors:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
   ```json
   {
     "errors": [
       {
         "msg": "Invalid input",
         "param": "input",
         "location": "query"
       }
     ]
   }
   ```

---

## Rides Endpoints

### 1. `/rides/create-ride`

#### Description

This endpoint creates a new ride request for a user.

#### Endpoint

**URL:** `/rides/create-ride`  
**Method:** `POST`

#### Request Body

The request body must be sent in JSON format and include the following fields:

##### Required Fields:

- **pickup**: (String) The pickup location. Must be at least 3 characters long.
- **destination**: (String) The destination location. Must be at least 3 characters long.
- **vehicleType**: (String) The type of vehicle requested. Must be one of `auto`, `car`, or `bike`.

#### Headers

- **Authorization**: Bearer `<token>`

#### Response

##### Success Response:

- **Status Code:** `201 Created`
- **Body:**
```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "user": "60d21b4667d0d8992e610c84",
  "pickup": "123 Main Street, Ahmedabad, India",
  "destination": "456 Elm Street, Ahmedabad, India",
  "fare": 190.20,
  "status": "pending",
  "otp": "12345"
}
```

##### Error Responses:

1. **Validation Errors:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
   ```json
   {
     "errors": [
       {
         "msg": "Invalid pickup address",
         "param": "pickup",
         "location": "body"
       },
       {
         "msg": "Invalid destination address",
         "param": "destination",
         "location": "body"
       },
       {
         "msg": "Invalid vehicle type",
         "param": "vehicleType",
         "location": "body"
       }
     ]
   }
   ```

2. **Missing Fields:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
   ```json
   {
     "message": "All fields are required"
   }
   ```

---

### 2. `/rides/get-fare`

#### Description

This endpoint calculates the fare for a ride based on the pickup and destination locations.

#### Endpoint

**URL:** `/rides/get-fare`  
**Method:** `GET`

#### Query Parameters

- **pickup**: (String) The pickup location. Must be at least 3 characters long.
- **destination**: (String) The destination location. Must be at least 3 characters long.

#### Headers

- **Authorization**: Bearer `<token>`

#### Response

##### Success Response:

- **Status Code:** `200 OK`
- **Body:**
```json
{
  "auto": 120.66,
  "car": 220.66,
  "bike": 90.66
}
```

##### Error Responses:

1. **Validation Errors:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
   ```json
   {
     "errors": [
       {
         "msg": "Invalid pickup location",
         "param": "pickup",
         "location": "query"
       },
       {
         "msg": "Invalid destination location",
         "param": "destination",
         "location": "query"
       }
     ]
   }
   ```

2. **Missing Fields:**
   - **Status Code:** `400 Bad Request`
   - **Body:**
   ```json
   {
     "message": "pickup and destination required"
   }
   ```

---

## Notes

- All endpoints use `express-validator` for input validation where applicable.
- Ensure the `Authorization` header is included in requests requiring authentication.

## Related Files

- **Controller:** `map.controller.js`, `ride.controller.js`
- **Service:** `map.service.js`, `ride.service.js`
- **Routes:** `map.routes.js`, `ride.routes.js`