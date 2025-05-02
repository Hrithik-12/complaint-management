
# 🛠 Complaint Management System

A full-stack web application enabling users to submit complaints and allowing administrators to manage them efficiently. Built using **Next.js**, **React**, **Node.js**, and **MongoDB**, with **JWT authentication** and **Nodemailer** integration for real-time email notifications.

---

## 🎯 Objective

Develop a complaint tracking system where users can raise complaints and admins can view, filter, update, and resolve them—while receiving email alerts on complaint submission and updates.

---

## 📸 Features

### 👤 User Interface

* Submit complaints via a form with:

  * **Title**, **Description**
  * **Category**: Product, Service, Support
  * **Priority**: Low, Medium, High
* Fully responsive design

### 🛠 Admin Interface

* View all complaints in a table
* Filter by **Status** or **Priority**
* Update complaint status (Pending, In Progress, Resolved)
* Delete or resolve complaints
* Role-based access via **JWT**

### 📩 Email Notifications

* Email on **new complaint submission** to admin
* Email on **status update** to admin

---

## 🧰 Tech Stack

| Technology   | Purpose                           |
| ------------ | --------------------------------- |
| React.js     | Frontend user interface           |
| Next.js      | Fullstack framework (API + SSR)   |
| MongoDB      | Complaint storage                 |
| Mongoose     | Object modeling for MongoDB       |
| Nodemailer   | Email notification service        |
| JWT          | Authentication and route security |
| Tailwind CSS | (Optional) UI Styling             |

---

## 🔐 JWT Authentication

Routes `/com-man/user` and `/com-man/admin` are protected using JWT.

### ✅ Middleware-based Route Protection

```bash
middleware.js protects:
- /com-man/user
- /com-man/admin
```

Tokens are stored in cookies and verified on each request. Unauthorized users are redirected to `/login`.

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/complaint-management-system.git
cd complaint-management-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env.local`

```env
# MongoDB
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/complaints_db

# Email (Gmail SMTP or other)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_TO=admin@example.com

# JWT
JWT_SECRET=your_jwt_secret
```

> 💡 Use an **App Password** if using Gmail with 2FA: [Generate App Password](https://myaccount.google.com/apppasswords)

---

### 4. Start the Dev Server

```bash
npm run dev
```

Go to: `http://localhost:3000`

---

## 📦 MongoDB Schema

**Complaint Model**

```js
{
  title: String,
  description: String,
  category: String,
  priority: String,
  status: { type: String, default: "Pending" },
  dateSubmitted: { type: Date, default: Date.now }
}
```

---

## 🔗 API Endpoints

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| POST   | `/api/complaint`     | Create new complaint     |
| GET    | `/api/complaint`     | Get all complaints       |
| PUT    | `/api/complaint/:id` | Update complaint details |
| DELETE | `/api/complaint/:id` | Delete complaint         |

---

## 📧 Email Integration

* Triggered using **Nodemailer**
* Located in `app/utility/mailer.js`
* Uses Gmail SMTP

### On Submission:

Sends email to admin with complaint title, category, priority, and description.

### On Status Update:

Sends email with complaint title, new status, and update date.

---

## 🧪 Testing

Use **Postman** or browser to:

* Submit new complaints
* Update complaint status
* Ensure admin receives emails

---

## 🚀 Deployment

Recommended: [**Vercel**](https://vercel.com)

Set environment variables in the Vercel dashboard.

Live Demo: \[Add your link here]

---

## ✅ Evaluation Checklist

* [x] Clean, modular code
* [x] MongoDB CRUD ops
* [x] JWT-based route protection
* [x] Email notifications
* [x] UI/UX responsive design
* [x] Git history + branching

---

## 🧠 Optional Enhancements

* JWT refresh tokens
* Admin dashboard analytics
* Image/file attachments in complaints

---

## 👨‍💻 Author

**Hrithik** — [LinkedIn](https://www.linkedin.com/in/hrithikgarg1/)

---

Would you like me to save this as a file or help you push it to your GitHub repo?
