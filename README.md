# Lithic Labs Vehicle Bookings API

A RESTful API for managing **vehicle rentals and bookings**, including pricing logic and overlap validation.

---
 ## Project Setup Instructions
1. Clone the repository
git clone https://github.com/heshaaa0/lithic-labs-project-v1.git
cd lithic-labs-project-v1

2. Install dependencies
npm install

3. Environment setup

Create a .env file in the root directory:

cp .env.example .env

Update required environment variables such as:

DB_HOST=localhost
DB_PORT=5432
DB_USER=root
DB_PASSWORD=root
DB_NAME=vehicle-book-db

## Database Setup
# Option 1: Using Docker (Recommended)

docker compose up -d

This will automatically:

Start the database container
Connect backend service
Apply configuration

# Option 2: Manual Setup (PostgreSQL example)
Install PostgreSQL
Create database:
CREATE DATABASE vehicle-book-db;

## How to Run Locally

npm run start:dev

## Run with Docker (Recommended)
docker compose up --build

Run in background:

docker compose up -d --build

Stop containers:

docker compose down

## Live API

* Base URL: http://13.233.111.98:3000
* Swagger Docs: http://13.233.111.98:3000/api

---

## Features

* Vehicle CRUD operations
* Booking creation with:

  * Pricing (hourly / daily)
  * Date validation
  * Overlap prevention
* Pagination support for vehicles

---

## Vehicle Endpoints

### Create Vehicle

`POST /vehicles`

**Body**

```json
{
  "title": "Toyota Prius",
  "hourlyRate": 2500,
  "dailyRate": 12000,
  "status": "active"
}
```

---

### Get All Vehicles (Paginated)

`GET /vehicles/all?page=1&limit=10`

---

### Get Vehicle by ID

`GET /vehicles/{id}`

---

### Update Vehicle

`PATCH /vehicles/{id}`

---

### Delete Vehicle

`DELETE /vehicles/{id}`

---

## Booking Endpoints

### Create Booking

`POST /bookings`

**Body**

```json
{
  "vehicleId": 1,
  "pickupDateTime": "2026-04-20T11:00:00",
  "returnDateTime": "2026-04-20T15:00:00",
  "pricingMode": "hourly"
}
```

**Rules**

* Pickup must not be in the past
* Return must be after pickup
* Vehicle must be active
* No overlapping bookings allowed

---

### Get All Bookings

`GET /bookings`

---

### Get Booking by ID

`GET /bookings/{id}`

---

## Data Models

### Vehicle

| Field      | Type              | Description       |
| ---------- | ----------------- | ----------------- |
| id         | number            | Unique ID         |
| title      | string            | Vehicle name      |
| hourlyRate | number            | Cost per hour     |
| dailyRate  | number            | Cost per day      |
| status     | active | inactive | Availability      |
| createdAt  | datetime          | Created timestamp |
| updatedAt  | datetime          | Updated timestamp |

---

### Booking

| Field          | Type           | Description       |
| -------------- | -------------- | ----------------- |
| id             | number         | Unique ID         |
| vehicleId      | number         | مرتبط vehicle     |
| pickupDateTime | datetime       | Start time        |
| returnDateTime | datetime       | End time          |
| pricingMode    | hourly | daily | Pricing type      |
| totalAmount    | number         | Calculated price  |
| createdAt      | datetime       | Created timestamp |

---

## Error Handling

| Code | Meaning                                    |
| ---- | ------------------------------------------ |
| 400  | Validation error / business rule violation |
| 404  | Resource not found                         |
| 409  | Booking conflict (overlap)                 |

---

## Running the Project

```bash
docker compose up --build
```

---

## Local Development

```bash
npm install
npm run start:dev
```

---

## Notes

* API follows REST principles
* All timestamps use ISO 8601 format
* Pricing is calculated automatically based on duration

---

## Author

Hesha Edmon
