# API Documentation: `/users/register-user`

## Endpoint Description

This endpoint is used to register a new user in the application. It accepts user details, validates the input, hashes the password, and creates a new user in the database. Upon successful registration, it returns an authentication token and the user details.

## Endpoint

**URL:** `/users/register-user`
**Method:** `POST`

## Request Body

The request body must be sent in JSON format and include the following fields:

### Required Fields:

- **fullname.firstname**: (String) First name of the user. Must be at least 3 characters long.
- **fullname.lastname**: (String) Last name of the user. Optional but must be at least 3 characters long if provided.
- **email**: (String) Email address of the user. Must be a valid email format.
- **password**: (String) Password for the user account. Must be at least 6 characters long.

### Example Request Body:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}

Response
Success Response:
Status Code: 201 Created
Body:
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
Error Responses:
Validation Errors:

Status Code: 400 Bad Request
Body:
}
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

GitHub Copilot
Response
Success Response:
Status Code: 201 Created
Body:
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
Error Responses:
Validation Errors:

Status Code: 400 Bad Request
Body:
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
Missing Fields:

Status Code: 400 Bad Request
Body:
```
