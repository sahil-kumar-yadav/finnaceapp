# 💼 Freelance Finance CRM

An **open-source Finance CRM Dashboard** built with **Next.js (App Router) + Supabase + Tailwind CSS**.
Designed for **freelancers and solopreneurs** to **track clients, invoices, wallets, and transactions** in one clean dashboard.

---

## ✨ Features

* 🔐 **Authentication** with Supabase (Sign up, Login, Logout, Middleware Protected Routes)
* 👥 **Client Management** – Add, view, and track client details
* 🧾 **Invoices** – Create, manage, and monitor invoice status (`draft`, `sent`, `paid`, `overdue`)
* 💰 **Transactions** – Record income, expenses, transfers, and investments
* 👛 **Wallets** – Multi-wallet support with balances & currencies (default: INR)
* 📊 **Reports & Insights** *(coming soon)* – Burn rate, income patterns, top clients
* 🎨 **Modern UI** – TailwindCSS + clean dashboard layout
* 🚀 **Deployed easily** on Vercel (frontend) + Supabase (backend)

---

## 🖼️ Screenshots

### 🔐 Auth Flow

<img src="./public/demo-auth.png" width="600">

### 📊 Dashboard

<img src="./public/demo-dashboard.png" width="600">

### 🧾 Invoices

<img src="./public/demo-invoices.png" width="600">

### 👥 Clients

<img src="./public/demo-clients.png" width="600">

---

## 🛠️ Tech Stack

* **Frontend:** [Next.js 14 (App Router)](https://nextjs.org/) + React
* **Backend / Database:** [Supabase](https://supabase.com/) (Postgres + Auth + Row Level Security)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Deployment:** [Vercel](https://vercel.com/)
* **Charts (coming soon):** Recharts for insights & reports

---

## ⚡ Getting Started

1. **Clone repo**

   ```bash
   git clone https://github.com/yourusername/freelance-finance-crm.git
   cd freelance-finance-crm
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment**

   * Create `.env.local`

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   ```

4. **Run locally**

   ```bash
   npm run dev
   ```

5. Visit 👉 [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Database Schema

```sql
-- Profiles
profiles(id, full_name, avatar_url)

-- Clients
clients(id, user_id, name, email, phone, company, notes)

-- Invoices
invoices(id, user_id, client_id, issue_date, due_date, amount, status, notes)

-- Wallets
wallets(id, user_id, name, currency, balance)

-- Transactions
transactions(id, user_id, wallet_id, amount, type, category, notes, client_id)
```

---

## 🌟 Why This Project?

* **For Freelancers / Solopreneurs:** replaces spreadsheets with a modern dashboard
* **For Recruiters:** shows end-to-end ability to design, build, and deploy a SaaS-style product
* **For Developers:** clean architecture, Supabase integration, and dashboard scaffolding

---

## 🚀 Roadmap

* [ ] Stripe Integration → subscription + payments
* [ ] Premium Reports → Burn rate, MRR, income trends
* [ ] Role-based access (admin vs user)
* [ ] Deploy on Vercel (demo link soon)

---

## 🤝 Contributing

Want to improve features, add charts, or fix UI? PRs are welcome 🚀

---

## 📬 Contact

👨‍💻 **Sahil Kumar Yadav**
📧 \[[your.email@example.com](mailto:your.email@example.com)]
🔗 [LinkedIn](https://linkedin.com/in/your-linkedin)
🔗 [Portfolio](https://yourportfolio.com)

---

### ⭐ If you like this project, don’t forget to **star the repo**!

---
