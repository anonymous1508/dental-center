# 🦷 ENTNT Dental Center Management Dashboard

A fully functional and stylish dental center management dashboard designed for both **Admins** and **Patients**. Built using **React**, this project handles user authentication, appointment scheduling, and patient records — all with a sleek, responsive interface and mock data stored locally.

---

## 🚀 Features

### 🔒 Authentication
- Simple login with mock email/password
- Separate roles for **Admin** and **Patient**

### 👤 Patient Portal
- View & edit personal profile (mock)
- Book new appointments with date & time
- View appointment history
- Data stored locally in browser storage

### 🧑‍⚕️ Admin Portal
- View all patient profiles (mock data)
- Manage all appointment requests
- Approve or reject pending appointments

### 💅 UI & UX
- Clean, professional layout
- Responsive for all screen sizes
- Styled using custom CSS only (no Tailwind/MUI)

---

## 🏗️ Tech Stack

- **Frontend**: React (Functional Components)
- **Routing**: React Router v6
- **State Management**: React Context API
- **Styling**: Custom CSS (Responsive)
- **Storage**: Browser `localStorage` (Mock backend)

---

## 📁 Project Structure

src/
├── components/ # Reusable UI components
├── contexts/ # Auth context and user role logic
├── data/ # Mock patient/appointment data
├── pages/ # Page components for routing
├── utils/ # Helper functions
└── App.js # Main app with routing

yaml
Copy
Edit

---

## 🧪 How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/entnt-dashboard.git
cd entnt-dashboard
2. Install dependencies
bash
Copy
Edit
npm install
3. Start the development server
bash
Copy
Edit
npm run dev
Open http://localhost:5173 in your browser.

🧑‍💻 Sample Credentials
🔹 Patient
makefile
Copy
Edit
Email: patient@example.com
Password: patient123
🔹 Admin
makefile
Copy
Edit
Email: admin@example.com
Password: admin123