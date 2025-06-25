# AI Learning Platform

A mini AI-driven learning platform that allows users to select topics, send prompts to an AI, receive generated lessons, and view their learning history.

## Main Technologies

- **Frontend:** React (Vite)
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB Atlas (Cloud)
- **ORM:** Mongoose
- **AI Integration:** OpenAI API

## Features

- User registration and login
- Category and sub-category selection
- Sending prompts to AI and receiving lesson-like responses
- Viewing personal learning history
- Admin dashboard: view all users and their prompt history
- Full CRUD API with validation and error handling
- Cascade delete for related entities (e.g., deleting a user deletes their prompts)
- Modular and scalable code structure

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
     MONGO_URI=mongodb+srv://r0548535482:r215161167@cluster0.5tgoceo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
     
     OPENAI_API_KEY=your-openai-key
     PORT=5000
     ```
   - Example `.env` file is provided as `.env.example`.

4. **Run the server:**
   ```bash
   cd server
   npm run dev
   ```

5. **Run the client:**
   ```bash
   cd ../client
   npm run dev
   ```

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