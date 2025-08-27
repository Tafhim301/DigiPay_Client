# 💳 DigiPay Frontend 

---

## **Project Overview**

**DigiPay** is a **secure, role-based digital wallet frontend** built with **React.js**, **Redux Toolkit**, and **RTK Query**.  
It interacts with a backend API to provide seamless financial operations for **Users**, **Agents**, and **Admins**, inspired by services like **bKash** and **Nagad**.

This project emphasizes:

- **Role-based dashboards** with tailored features
- **Secure authentication and state management**
- **Responsive, polished UI with interactive components**
- **Data visualization and guided tours**

---

## **Tech Stack**

**Frontend**

- **Framework**: React.js, React Router
- **State Management**: Redux Toolkit, RTK Query
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI, Lucide Icons, React Chart.js 2
- **Notifications**: react-toastify or sonner
- **Guided Tour**: react-joyride / driver.js

**Backend API**

- **Base URL**: [https://digital-wallet-backend-phi.vercel.app/api/v1](https://digital-wallet-backend-phi.vercel.app/api/v1)
- **Authentication**: JWT
- **Database**: MongoDB

---

## **📌 Features**

### **🌐 Public Landing Pages**

- **Home** – Hero banner, tagline, CTA buttons, responsive navbar & footer.
- **About** – Company mission, story, and team info.
- **Features** – Highlight app capabilities with icons and visuals.
- **Pricing (optional)** – Subscription tiers & service fees.
- **Contact** – Inquiry form with simulated submission.
- **FAQ** – Frequently asked questions.

---

### **🔑 Authentication**

- JWT-based login
- Registration with role selection (**User/Agent**)
- Role-based dashboard redirection
- Persistent login state
- Logout functionality

---

### **👤 User Dashboard**

- Wallet overview & recent transactions
- Deposit money via agent
- Withdraw money from wallet/ATM
- Send money to other users (search by phone/email)
- Transaction history with pagination & filters
- Profile management (name, phone, password)

---

### **🧑‍💼 Agent Dashboard**

- Cash-in / Cash-out summary
- Deposit money to users
- Withdraw money from users
- Transaction history
- Commission history (optional)
- Profile management

---

### **🛡️ Admin Dashboard**

- Total users, agents, transactions & volume overview
- Manage users (block/unblock)
- Manage agents (approve/suspend)
- View & filter all transactions
- Adjust system fees/limits (optional)
- Profile management

---

### **⚡ General Features**

- Role-based navigation menus
- Global loading indicators & error handling
- Form validations & numeric checks
- Pagination for long lists
- Dynamic charts and data visualizations
  - **Cards, Pie Charts, Bar Charts, Line Charts, Tables**
- Toast notifications for success/error messages
- Guided tour (react-joyride) with:
  1. Navigation menu
  2. Dashboard stats cards
  3. Chart section
  4. Table search/filter
  5. Theme toggle
- Fully responsive UI & light/dark mode support
- Optimized performance with lazy-loading & skeleton screens


---
## **🚀 Getting Started**

1. Clone the Repository

```bash
git clone https://github.com/Tafhim301/Digital-Wallet-Frontend
cd Digital-Wallet-Frontend
```

2. Install Dependencies

```bash
npm install

```

3.**_Environment Variables_**

Create a .env file:

```bash
VITE_BASE_URL=https://digital-wallet-backend-phi.vercel.app/api/v1
```
4. Run the App

```bash
npm start
```

---

## **📂 Project Structure**

```bash
src/
├── redux/            # RTK Query API features
├── assets/           # Images, logos, icons
├── components/       # Reusable UI components
├── features/         # Redux slices
├── hooks/            # Custom hooks
├── pages/            # React Router pages
├── routes/           # Route definitions
└── App.tsx           # App entry point
```
 

<!-- 
## 🎥 Demo

Watch a short demo of DigiPay Frontend in action: -->
<!-- Video will be added soon -->
---
## **🎯 Goals & Best Practices**

>Modular, reusable components

>Clean code & folder structure

>Responsive & accessible UI

>Optimized for performance & scalability

>Professional finish with realistic data

---



## 👨‍💻 Live Demo

**Here Is The Live Link Of The Project**  
[Live Demo](https://digi-pay-eta.vercel.app/)

---

## 👨‍💻 Author

**Tafhimul Islam**  
GitHub: [@tafhim301](https://github.com/tafhim301)

---
