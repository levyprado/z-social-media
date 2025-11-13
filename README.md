# Z - Modern Social Media Platform

> **Live Demo:** [https://z-social-media-production.up.railway.app](https://z-social-media-production.up.railway.app)

## Showcase Videos

https://github.com/user-attachments/assets/bff71514-9ddc-4cd9-b27c-a5991eb4f73f

https://github.com/user-attachments/assets/740fa932-0152-44a0-a76e-98af9ecd6b16

<div align="center">

**A full-stack X clone built with modern web technologies**

[![Live Demo](https://img.shields.io/badge/Live-Demo-6366f1?style=for-the-badge)](https://z-social-media-production.up.railway.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/levyprado/z-social-media)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/levy-prado)

[Live Demo](https://z-social-media-production.up.railway.app)

</div>

Z is a modern social media application designed for high performance and type safety. The project demonstrates solid full-stack architecture built with Bun, Hono, and React. It features robust authentication, sophisticated data handling for complex structures (like reply threads), and efficient data fetching techniques, all contributing to a seamless user experience.

### Home Feed
![Home Feed Light Mode](https://github.com/user-attachments/assets/e12d20b1-ca90-406a-a823-c99fa23e0ace)
![Home Feed Dark Mode](https://github.com/user-attachments/assets/5d5e1ea8-9479-470b-b7e0-3596ef313eeb)

### Profile Page
![User Profile](https://github.com/user-attachments/assets/76a67088-e719-4dbc-81cc-838eb782e665)

### Post Detail & Reply Threads
![Post Detail with Threads](https://github.com/user-attachments/assets/df7497d8-2cf1-4459-b237-a375fdd0aa2a)


### Create Post Dialog
![Create Post](https://github.com/user-attachments/assets/e0803795-1516-4c92-a556-49220dc3e84f)

---

### Features

- 🔐 **Authentication System**
  - Email & Password/GitHub OAuth authentication
  - Protected routes with session management
  - Built with [Better Auth](https://www.better-auth.com/)
- 👤 **User Profiles**
  - Dynamic profile pages with user information
  - Editable profiles (name, bio, website)
  - Follower/Following system with real-time counts
  - Profile tabs: Posts, Posts & Replies, Liked Posts

- 💬 **Social Interactions**
  - Create posts (280 character limit)
  - Like/Unlike posts
  - Reply to posts with nested threading
  - Follow/Unfollow users
  - Share posts (Copy link, Web Share API)

- 🏠 **Feed System**
  - Dual feed tabs: All & Following
  - Tab preference persisted with Zustand
  - Infinite scroll with loading skeletons
  - Real-time updates after interactions

- 🎨 **User Experience**
  - Dark/Light theme toggle with persistence
  - Responsive design (mobile, tablet, desktop)
  - Loading skeletons everywhere
  - Human-readable timestamps

---

---

## 🛠️ Built With

### **Frontend**
- React
- TypeScript
- Vite
- TanStack Router
- TanStack Query
- TanStack Form
- Zustand
- 9ui.dev
- Lucide Icons
- Sonner
- Tailwind CSS

### **Backend**
- Bun
- Hono
- PostgreSQL
- Drizzle ORM
- Better Auth
- Zod

### **Deployment**
- Railway

---

## Usage

To use this project, you will first need to have a running postgres server. You can set this up with Docker.

### Development

1. Clone the repo
2. Run `bun install`
3. Add in environment variables to .env
4. Run `bun dev` for backend `cd frontend && bun dev` for frontend

### Production

1. Clone the repo
2. Add in environment variables to .env
3. Build the frontend `cd frontend && bun run build`
4. Run `bun server/index.ts`


---

## 📧 Contact

**Levy Prado**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/levy-prado)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/levyprado)
