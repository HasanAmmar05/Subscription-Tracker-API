# Subscription Tracker API

## Overview
Welcome to the Subscription Tracker API, a robust Node.js backend application designed to manage user subscriptions efficiently. Built with modern tools like Express.js and MongoDB, this API handles user authentication, subscription management, and optional features like rate limiting and reminders. This project is ideal for developers looking to build or learn about secure, scalable API systems for subscription tracking.

## Tech Stack
- **Node.js**: Powers the server runtime
- **Express.js**: Simplifies routing and middleware for the API
- **MongoDB**: Stores data with flexible, schema-based models via Mongoose
- **Arcjet** (optional): Enhances security with rate limiting and bot protection
- **Upstash Workflow** (optional): Manages scheduled reminders (currently disabled)
- **Nodemailer** (optional): Handles email notifications for reminders (currently disabled)
- **JWT**: Ensures secure user authentication and authorization

## Key Features
- **User Management**: Secure sign-up, sign-in, and sign-out with JWT-based authentication.
- **Subscription Handling**: Create, retrieve, update, and delete subscriptions with comprehensive validation.
- **Database Integration**: Leverage MongoDB and Mongoose for robust data modeling and relationships.
- **Error Handling**: Implement global error handling, input validation, and middleware for reliability.
- **Logging**: Include logging mechanisms for debugging and monitoring application behavior.
- **Optional Rate Limiting**: Use Arcjet to secure the API against abuse (disabled in development, optional in production).
- **Optional Workflows**: Support for automated reminders via Upstash Workflow (disabled for simplicity, can be re-enabled).
- **Optional Email Notifications**: Send subscription reminders via Nodemailer or SendGrid (disabled for now, can be re-enabled).

## Getting Started
Follow these steps to set up and run the project locally on your machine.

### Prerequisites
Ensure you have the following installed:
- **Git** (for cloning the repository)
- **Node.js** (v16 or higher recommended)
- **npm** (Node Package Manager, comes with Node.js)
- Optional: MongoDB (local or MongoDB Atlas for cloud), Arcjet account, Upstash account, and an email service (e.g., Gmail, SendGrid) for reminders

### Cloning the Repository
```bash
git clone https://github.com/your-username/subscription-tracker-project.git
cd subscription-tracker-project




**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
# PORT
PORT=5500
SERVER_URL="http://localhost:5500"

# ENVIRONMENT
NODE_ENV=development

# DATABASE
DB_URI=

# JWT AUTH
JWT_SECRET=
JWT_EXPIRES_IN="1d"

# ARCJET
ARCJET_KEY=
ARCJET_ENV="development"

# UPSTASH
QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=

# NODEMAILER
EMAIL_PASSWORD=
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:5500](http://localhost:5500) in your browser or any HTTP client to test the project.

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>Dummy JSON Data</code></summary>

```json
{
  "name": "Javascript Mastery Elite Membership",
  "price": 139.00,
  "currency": "USD",
  "frequency": "monthly",
  "category": "Entertainment",
  "startDate": "2025-01-20T00:00:00.000Z",
  "paymentMethod": "Credit Card"
}
```

</details>
