# Question 10: Event Registration Saved in registrations.json

## Student Details

**Name:** Akhila Anish Das  
**Roll No.:** 150096725016  
**Cohort:** Larry Page  
**Course:** B.Tech CSE 2025–2029  

---

# Problem Statement

The college is organising a Tech Fest. Students must register for events through an API. Registrations must be saved permanently in a JSON file, and the same student must not be able to register twice for the same event.

---

# Objective

Practise reading and writing a JSON file with `fs`, checking the received data, and stopping duplicate entries.

---

# Requirements

1. Create `registrations.json`. At the start it must contain only an empty array `[]`.

2. Run the server on port `5050`.

3. `POST /registrations` must receive:
   - `participantName`
   - `email`
   - `eventName`

4. Use `express.json()` to receive JSON request data.

5. Read existing registrations using `fs.readFile()` and `JSON.parse()`.

6. Add the new registration with a unique numeric `id`.

7. Save the updated registrations using `JSON.stringify()` and `fs.writeFile()`.

8. If a field is missing, return status `400`.

9. If the same email is already registered for the same `eventName`, return status `409` with the message:

```text
Already registered for this event
````

10. On successful registration, return status `201` with the saved registration.

11. `GET /registrations` must return all registrations along with a count.

---

# Required Endpoints

## POST /registrations

Validates the received data, checks for duplicate registrations, adds the new registration, and saves it permanently in `registrations.json`.

## GET /registrations

Returns all saved registrations along with the total number of registrations.

---

# Sample POST Request

```text
POST http://localhost:5050/registrations
```

### JSON Body

```json
{
    "participantName": "Priya",
    "email": "priya@gmail.com",
    "eventName": "Code Sprint"
}
```

---

# Successful POST Response

**Status: 201 Created**

```json
{
    "success": true,
    "message": "Registration successful",
    "data": {
        "id": 1,
        "participantName": "Priya",
        "email": "priya@gmail.com",
        "eventName": "Code Sprint"
    }
}
```

![Successful POST Registration](screenshots/01_POST_registrations.png)

---

# Duplicate Registration

The same email cannot register for the same event twice.

### Request

```json
{
    "participantName": "Priya",
    "email": "priya@gmail.com",
    "eventName": "Code Sprint"
}
```

### Response

**Status: 409 Conflict**

```json
{
    "success": false,
    "message": "Already registered for this event"
}
```

![Duplicate Registration - 409 Conflict](screenshots/03_DUPLICATE_409.png)

---

# Same Email With a Different Event

The same email is allowed to register for a different event.

### Request

```json
{
    "participantName": "Priya",
    "email": "priya@gmail.com",
    "eventName": "AI Quiz"
}
```

### Response

**Status: 201 Created**

```json
{
    "success": true,
    "message": "Registration successful",
    "data": {
        "id": 4,
        "participantName": "Priya",
        "email": "priya@gmail.com",
        "eventName": "AI Quiz"
    }
}
```

![Same Email With Different Event](screenshots/04_DIFFERENT_EVENT_201.png)

---

# GET All Registrations

### Request

```text
GET http://localhost:5050/registrations
```

### Response

**Status: 200 OK**

```json
{
    "success": true,
    "count": 4,
    "data": [
        {
            "id": 1,
            "participantName": "Priya",
            "email": "priya@gmail.com",
            "eventName": "Code Sprint"
        },
        {
            "id": 2,
            "participantName": "Rahul",
            "email": "rahul@gmail.com",
            "eventName": "Web Hackathon"
        },
        {
            "id": 3,
            "participantName": "Aisha",
            "email": "aisha@gmail.com",
            "eventName": "AI Quiz"
        },
        {
            "id": 4,
            "participantName": "Priya",
            "email": "priya@gmail.com",
            "eventName": "AI Quiz"
        }
    ]
}
```

![GET All Registrations](screenshots/02_GET_registrations.png)

---

# Testing Requirements

## Test 1: Register 3 Participants for Different Events

Three participants were registered successfully.

### Registration 1

```json
{
    "participantName": "Priya",
    "email": "priya@gmail.com",
    "eventName": "Code Sprint"
}
```

### Registration 2

```json
{
    "participantName": "Rahul",
    "email": "rahul@gmail.com",
    "eventName": "Web Hackathon"
}
```

### Registration 3

```json
{
    "participantName": "Aisha",
    "email": "aisha@gmail.com",
    "eventName": "AI Quiz"
}
```

The `GET /registrations` endpoint returned all 3 registrations with:

```text
count: 3
```

![GET Registrations](screenshots/02_GET_registrations.png)

---

# Test 2: Register the Same Email for the Same Event

The same email was submitted again for the same event:

```json
{
    "participantName": "Priya",
    "email": "priya@gmail.com",
    "eventName": "Code Sprint"
}
```

The API returned:

```text
409 Conflict
```

with:

```text
Already registered for this event
```

![Duplicate Registration](screenshots/03_DUPLICATE_409.png)

---

# Test 3: Register the Same Email for a Different Event

The same email was submitted for a different event:

```json
{
    "participantName": "Priya",
    "email": "priya@gmail.com",
    "eventName": "AI Quiz"
}
```

The API successfully returned:

```text
201 Created
```

A new registration with `id: 4` was created.

![Different Event Registration](screenshots/04_DIFFERENT_EVENT_201.png)

---

# Test 4: Restart the Server

The server was stopped and restarted using:

```bash
node index.js
```

The server started successfully on:

```text
http://localhost:5050
```

After restarting the server, the following request was performed:

```text
GET http://localhost:5050/registrations
```

The API still returned all 4 registrations.

```text
Status: 200 OK
count: 4
```

This confirms that the registrations were permanently saved in `registrations.json`.

![Data Persistence After Server Restart](screenshots/05_RESTART_DATA.png)

---

# Important Rules Followed

* Old registrations are never deleted.
* Old registrations are never overwritten.
* The same email can register for a different event.
* The same email cannot register twice for the same event.
* `registrations.json` always contains a valid JSON array.
* No database is used.
* `express.json()` is used.
* Each registration receives a unique numeric ID.
* Registrations are permanently stored in `registrations.json`.
* The server runs on port `5050`.

---

# Technologies Used

* Node.js
* Express.js
* JavaScript
* File System (`fs`)
* JSON
* Postman
* Visual Studio Code

---

# File System Operations Used

## Reading the JSON File

```javascript
fs.readFile()
```

## Converting JSON to JavaScript Data

```javascript
JSON.parse()
```

## Converting JavaScript Data to JSON

```javascript
JSON.stringify()
```

## Writing Updated Data to the File

```javascript
fs.writeFile()
```

---

# Initial registrations.json

At the beginning of the project:

```json
[]
```

After successful registrations, the file contains the saved registration objects.

---

# Project Structure

```text
q10-event-registration/
│
├── index.js
├── registrations.json
├── package.json
├── package-lock.json
├── README.md
├── .gitignore
│
└── screenshots/
    ├── 01_POST_registrations.png
    ├── 02_GET_registrations.png
    ├── 03_DUPLICATE_409.png
    ├── 04_DIFFERENT_EVENT_201.png
    └── 05_RESTART_DATA.png
```

---

# How to Run the Project

## 1. Open the Project Folder

```bash
cd q10-event-registration
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Start the Server

```bash
node index.js
```

The server runs on:

```text
http://localhost:5050
```

## 4. Test the API

Use Postman to test:

```text
POST http://localhost:5050/registrations
```

and:

```text
GET http://localhost:5050/registrations
```

---

# API Status Codes

| Status Code       | Description                                      |
| ----------------- | ------------------------------------------------ |
| `200 OK`          | Registrations retrieved successfully             |
| `201 Created`     | Registration created successfully                |
| `400 Bad Request` | Required field is missing                        |
| `409 Conflict`    | Same email already registered for the same event |

---

# Conclusion

The Event Registration API successfully stores participant registrations permanently in a JSON file using Node.js, Express.js, and the File System module.

The project implements registration creation, JSON file reading and writing, unique numeric IDs, input validation, duplicate registration prevention, retrieval of all registrations with a count, registration for different events using the same email, and persistence of data after restarting the server.