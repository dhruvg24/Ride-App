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

---

## Notes

- Passwords are hashed before being stored in the database for security purposes.
- All endpoints use `express-validator` for input validation where applicable.
- Ensure the `Authorization` header is included in requests requiring authentication.

## Related Files

- **Controller:** `driver.controller.js`
- **Model:** `driver.model.js`
- **Service:** `driver.service.js`
- **Routes:** `driver.routes.js`