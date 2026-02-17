# 📄 Resume Builder — MERN Stack Web App

Resume Builder is a full-stack web application built using the MERN stack that enables users to create, customize, and download professional resumes with a real-time preview. The platform enhances resume content using AI to help users craft impactful summaries and skill descriptions.

---

## 🚀 Features

✅ Create professional resumes easily
✅ Real-time resume preview while editing
✅ Multiple sections: education, experience, skills, projects, summary
✅ Download resumes in a clean, professional format
✅ AI-powered content enhancement
✅ Secure user authentication & data protection
✅ Responsive design for mobile & desktop
✅ Cloud deployment for seamless access

---

## 🤖 AI-Powered Content Enhancement

Integrated **Google Gemini API** to improve:

* Professional summary writing
* Skills descriptions
* Resume content clarity and impact
* Overall resume quality

This helps users generate polished and recruiter-friendly resumes.

---

## 🔐 Authentication & Security

* Secure login & signup system
* JWT-based authentication
* Protected user resume data

---

## 🧰 Tech Stack

### Frontend

* React.js
* Redux Toolkit
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### Authentication

* JSON Web Tokens (JWT)

### AI Integration

* Google Gemini API

### Deployment

* Render

---

## 📁 Project Structure

```
Resume_Builder/
│
├── client/      → React frontend
├── server/      → Node & Express backend
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/yourusername/resume-builder.git
cd resume-builder
```

### 2️⃣ Install dependencies

#### Backend

```
cd server
npm install
```

#### Frontend

```
cd client
npm install
```

---

### 3️⃣ Configure Environment Variables

Create a `.env` file inside the **server** folder:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_api_key
IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_url
```

---

### 4️⃣ Run the application

#### Start backend

```
cd server
npm start
```

#### Start frontend

```
cd client
npm run dev
```

---

## 🌐 Live Deployment

The application is deployed on:

* Backend & API: Render
* Database: MongoDB Atlas

Accessible across devices for seamless resume creation.

---

## 🎯 Future Improvements

* Additional resume templates
* Drag-and-drop section reordering
* Dark mode support
* Resume sharing via link
* ATS optimization suggestions

---

## 👩‍💻 Author

**Pallavi Singh**
B.Tech Student | Aspiring Full-Stack Developer

---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!

---
