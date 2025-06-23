# AI Learning Platform

A mini AI-driven learning platform that allows users to select topics, send prompts to an AI, receive generated lessons, and view their learning history.

## Main Technologies

- **Frontend:** React (Vite)
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB Atlas (Cloud)
- **ORM:** Mongoose
- **AI Integration:** OpenAI API

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
   - In the `server` folder, create a `.env` file with:
     ```
     MONGO_URI=your-mongodb-uri
     OPENAI_API_KEY=your-openai-key
     PORT=5000
     ```

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

---

## הערות (עברית)

- ודאו שקובץ `.env` לא נמצא ב-GitHub (הוסיפו אותו ל-`.gitignore`).
- יש להגדיר את ה-MONGO_URI לכתובת של MongoDB Atlas שלכם.
- יש להכניס את מפתח ה-API של OpenAI (או להשתמש ב-mock בשלב הפיתוח).
- ניתן להרחיב את ההוראות בהתאם לצורך.