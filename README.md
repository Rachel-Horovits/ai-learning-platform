# AI Learning Platform

A mini AI-driven learning platform that allows users to select topics, send prompts to an AI, receive generated lessons, and view their learning history.

---

## About This Project

This project is a mini MVP for an AI-powered learning platform. Users can register, select what they want to learn (by category and sub-category), send prompts to an AI (OpenAI GPT or mock), receive lesson-like responses, and view their learning history. An admin dashboard allows management of users, categories, and prompts.

This project demonstrates skills in software architecture, modular code organization, API integration, and delivery quality.

---

## Main Technologies

- **Frontend:** React (Vite)
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB Atlas (Cloud) via Mongoose ORM
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

- The platform is intended for demo/educational purposes.
- AI responses can be mocked for local development.
- JWT authentication is used for protected routes.
- Admin users are managed via the admin dashboard.

---

## Installation & Usage

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
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
   - In the server folder, create a `.env` file with:
     ```
     MONGO_URI=your-mongo-uri
     OPENAI_API_KEY=your-openai-key
     PORT=5000
     JWT_SECRET=your-jwt-secret
     USE_MOCK_AI=true
     ```
   - Example `.env` file is provided as `.env.example`.

4. **(Optional) Run MongoDB with Docker:**
   ```bash
   docker-compose up -d
   ```

5. **Run the server:**
   ```bash
   cd server
   npm run dev
   ```

6. **Run the client:**
   ```bash
   cd ../client
   npm run dev
   ```

---

## Project Structure

```
ai-learning-platform/
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── app.ts
│   └── package.json
│
├── client/
│   └── (React app files)
│
└── README.md
```

---

## Bonus Features

- TypeScript used in both backend and frontend
- JWT-based authentication
- Modular, production-grade code structure
- Easily extendable for more features

---

## Example Use Case

Israel signs up and selects to learn about Science → Space. He enters a prompt: “Teach me about black holes.” The system stores his input, sends it to an AI model, and returns a lesson. He can revisit the dashboard later to view all the lessons he received.

---

## Quality & Best Practices

- Organized project structure with clear separation of concerns (routes/controllers/models/services/etc.)
- Clean, well-documented code following best practices
- Input validation and API error handling
- Uses dotenv for configuration management
- Public GitHub repository with clear commit history

---

## License

This project is for demonstration and educational purposes.