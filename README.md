# AI Learning Platform

A mini AI-driven science learning platform that allows users to select topics, send prompts to an AI, receive generated lessons, and view their learning history.

---

## About This Project

This project is a mini MVP for an AI-powered science learning platform. Users can register, select what they want to learn (by category and sub-category), send prompts to an AI (OpenAI GPT or mock), receive lesson-like responses, and view their learning history. An admin dashboard allows management of users, categories, and prompts.

This project demonstrates skills in software architecture, modular code organization, API integration, and delivery quality.

---

## Main Technologies

- **Frontend:** React (Vite)
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB Atlas (Cloud) 
- **AI Integration:** OpenAI API (with mock support)
- **Authentication:** JWT-based user authentication

---

## Features

- User registration and login
- Category and sub-category selection
- Sending prompts to AI and receiving lesson-like responses
- Viewing personal learning history
- **Admin Dashboard:**  
  - View all users and their prompt history  
  - Manage categories and sub-categories  
  - Manage prompts and users  
  - Create and manage admin users  
  - Includes two styled admin pages: `AdminDashboard` and `AdminPanel`
- Full CRUD API with validation and error handling
- Cascade delete for related entities (e.g., deleting a user deletes their prompts)
- Modular and scalable code structure
- Improved Navbar and Login page UX

---

## Assumptions

- AI responses can be mocked for local development.
- JWT authentication is used for protected routes.
- Admin users are managed via the admin dashboard.

---

## Installation & Usage

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rachel-Horovits/ai-learning-platform.git

   cd ai-learning-platform
   ```

2. **Install dependencies:**
   - Server:
     ```bash
     cd server
     npm install
     ```
   - Client:
     ```bash
     cd ../client
     npm install
     ```

3. **Configure environment variables:**
   - In the server folder, create a `.env` file with :
     ```
     MONGO_URI=.env.example-mongo-uri
    # Get your API key from https://platform.openai.com/account/api-keys
     OPENAI_API_KEY=your-own-openai-api-key
     PORT=5000
     JWT_SECRET=.env.example-jwt-secret
     USE_MOCK_AI=true
     ```
   - Example `.env` file is provided as `.env.example`.

4. **Run the server:**
   ```bash
   cd server
   npx ts-node src/app.ts  
or
   npx ts-node -r dotenv/config src/app.ts 
    ```

5. **Run the client:**
   ```bash
   cd ../client
   npm run dev
   ```
---

## Initial Admin User

> **Note:** 
> The system requires at least one admin user to be defined at all times.

The system includes a default admin user for immediate access:

- **Name:** rachel
- **Phone:** 0548535482

Use these details to log in as an admin after setup.

---

## Project Structure

```
```markdown
---
## Project Structure

```
ai-learning-platform/
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── app.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md

```

---

## Bonus Features

- TypeScript used in both backend and frontend
- JWT-based authentication
- Modular, production-grade code structure
- Easily extendable for more features
- Only an admin user can create (add) another admin user.
- The system requires at least one admin user to be defined.

---

## Example Use Case

Israel signs up and selects to learn about Science → Space. He enters a prompt: “Teach me about black holes.” The system stores his input, sends it to an AI model, and returns a lesson. He can revisit the dashboard later to view all the lessons he received.

---

## Quality & Best Practices

- Organized project structure with clear separation of concerns (routes/controllers/models/services)
- Clean, well-documented code following best practices
- Input validation and API error handling
- Uses dotenv for configuration management
- Public GitHub repository with clear commit history

---
