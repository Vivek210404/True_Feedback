# True Feedback

A full-stack anonymous feedback platform built with **Next.js 15.5**,
**TypeScript**, **MongoDB**, and **NextAuth**.\
Users can send and receive anonymous feedback after email or Google
authentication.

🚀 Live URL: https://true-feedback-sand.vercel.app

------------------------------------------------------------------------

## ✨ Features

-   🔐 Email & Google Authentication
-   ✅ Email verification system
-   ✉️ Anonymous message submission
-   📬 Real-time inbox
-   🎨 Tailwind + ShadCN modern UI
-   🗄️ MongoDB with Mongoose
-   🔑 JWT-based Auth via NextAuth
-   🌐 Deployed on Vercel

------------------------------------------------------------------------

## 📂 Folder Structure

    root
     ┣ 📁 src
     ┃ ┣ 📁 app
     ┃ ┣ 📁 components
     ┃ ┣ 📁 lib
     ┃ ┣ 📁 model
     ┃ ┗ 📁 utils
     ┣ 📁 public
     ┣ .env
     ┣ next.config.ts
     ┣ package.json
     ┣ README.md

------------------------------------------------------------------------

## 🛠️ Tech Stack

  Category   Tech
  ---------- --------------------------------------
  Frontend   Next.js 15.5, TailwindCSS, ShadCN UI
  Backend    Next.js API Routes / Server Actions
  Database   MongoDB + Mongoose
  Auth       NextAuth (Google & Credentials)
  Other      TypeScript, bcrypt, Zod

------------------------------------------------------------------------

## ⚙️ Environment Variables

Create `.env.local` (local) or `.env` (production):

``` env
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email SMTP
EMAIL_USER=your_email_smtp_username
EMAIL_PASS=your_email_smtp_password

# Gemini AI Features
GEMINI_API_KEY=your_gemini_api_key

# Next Auth URL
NEXT_AUTH_URL=http://localhost:3000
```

------------------------------------------------------------------------

## ▶️ Run Locally

``` bash
git clone https://github.com/Vivek210404/true-feedback.git
cd true-feedback

npm install
npm run dev
```

Visit ➜ http://localhost:3000

------------------------------------------------------------------------

## 🚀 Deployment (Vercel)

1.  Push code to GitHub
2.  Import on Vercel
3.  Add all env variables under `Settings → Environment Variables`
4.  Deploy ✅

### ✅ Google Console OAuth Setup

**Authorized redirect URIs**

    http://localhost:3000/api/auth/callback/google
    https://true-feedback-sand.vercel.app/api/auth/callback/google

**Authorized JavaScript Origins**

    http://localhost:3000
    https://true-feedback-sand.vercel.app

------------------------------------------------------------------------

## 🧪 Commands

  Command           Description
  ----------------- ------------------------
  `npm run dev`     Run development server

------------------------------------------------------------------------

## 🤝 Contribution

Pull requests welcome! Open issue for major changes.

------------------------------------------------------------------------

## 👨‍💻 Author

**Vivek Kumar**\
Passionate UI & Next.js Developer 🚀

------------------------------------------------------------------------

⭐ Like this project? Star the repository!
