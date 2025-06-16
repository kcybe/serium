<h1 align="center">
  <a href="https://serium.noamyu.dev/"">
    <img src="https://raw.githubusercontent.com/kcybe/serium/826d75d495a65af8d8c27249734a7d6fa4eac8db/public/logo-icon.svg" alt="Serium Logo" width="250">
  </a>
  <br>
  Serium
  <br>
</h1>

<h4 align="center">
  Modern, Intuitive Inventory Management. <br /> Built for speed, collaboration, and clarity.
</h4>

<p align="center">
  <a href="https://serium.noamyu.dev/">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20Now-brightgreen?style=flat-square" alt="Live Demo">
  </a>
  <a href="https://github.com/kcybe/serium/releases">
    <img src="https://img.shields.io/github/v/release/kcybe/serium?style=flat-square" alt="Latest Release">
  </a>
  <a href="https://github.com/kcybe/serium/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/kcybe/serium?style=flat-square" alt="License">
  </a>
  <a href="https://www.buymeacoffee.com/kcybe">
    <img src="https://img.shields.io/badge/Sponsor-%E2%9D%A4%EF%B8%8F%20Buy%20Me%20A%20Coffee-ff69b4?style=flat-square" alt="Buy Me A Coffee">
  </a>
</p>

<p align="center">
  <a href="#-about-the-project">About</a> •
  <a href="#-key-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-license">License</a> •
  <a href="#-contact">Contact</a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/kcybe/serium/refs/heads/main/public/showcase-dark.png" alt="Serium Screenshot Dark" width="80%">
</p>

## 🌟 About The Project

Serium is designed to solve the common frustrations of inventory management. Whether you're a small business owner, a hobbyist with a growing collection, or part of a team needing to track assets, Serium provides a clean, powerful, and collaborative platform. Say goodbye to clunky spreadsheets and outdated software – Serium brings a modern web experience to managing your items effectively.

Our goal is to provide an intuitive interface packed with smart features that save you time and give you clear insights into your inventory.

## ✨ Key Features

- **🗂️ Customizable Tagging:** Effortlessly organize items with flexible, auto-suggested tags for granular categorization.
- **🔍 Intelligent Search & Filtering:** Quickly locate items using powerful search capabilities and dynamic filters.
- **📱 Modern & Responsive UI:** Enjoy a consistent and intuitive experience across desktop, tablet, and mobile devices.
- **📜 Audit Trail / Activity Log:** Keep track of all changes made to your inventory for accountability and history.
- **🔄 Import/Export Data:** Easily migrate your existing inventory data into Serium or export your data in common formats (e.g., CSV, JSON).
- **🎨 Themeable Interface:** Light and Dark mode support for comfortable viewing.

## 🛠️ Tech Stack

Serium is built with a modern, robust, and scalable technology stack:

- **Frontend:** [React](https://reactjs.org/) with [Next.js](https://nextjs.org/) (App Router)
- **Backend:** Next.js API Routes
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) components
- **Authentication:** [Specify your auth library, e.g., NextAuth.js, Clerk, Supabase Auth, Better Auth]
- **State Management:** [Specify if using Zustand, Jotai, Redux, or React Context heavily]
- **Forms:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation
- **UI Components:** Custom components built with shadcn/ui primitives.
- **Tag Input:** [Emblor TagInput](https://github.com/emblor/taginput) (as mentioned in your credits)

## 🚀 Getting Started

Follow these instructions to get a copy of Serium up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/en/docs/install/)
- [Git](https://git-scm.com)
- A database supported by Prisma (e.g., PostgreSQL, MySQL, SQLite). PostgreSQL is often recommended for development and production.

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/kcybe/serium.git
    cd serium
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**

    - Copy the example environment file:
      ```bash
      cp .env.example .env
      ```
    - Open the `.env` file and fill in your specific credentials and configurations:

      ```env # .env - # Database
      DATABASE_URL="your_postgresql_or_mysql_or_sqlite_connection_string" # Example: postgresql://user:password@host:port/database or file:./prod.db

      # Authentication
      BETTER_AUTH_URL="http://localhost:3000" # Or your production URL
      BETTER_AUTH_SECRET="generate_a_strong_random_secret_string" # Run `openssl rand -hex 32` in your terminal
      ```

      > **Important:** `BETTER_AUTH_SECRET` is crucial for security. Generate a strong, unique secret.

4.  **Set up the database with Prisma:**

    - Apply database migrations:
      ```bash
      npx prisma migrate dev
      ```
      This will create your database schema based on `prisma/schema.prisma`. If it's the first time, it might also prompt you to create the database if it doesn't exist.

5.  **Generate Prisma Client:**
    Although often included in `postinstall` or `build` scripts, you can run it manually:

    ```bash
    npx prisma generate
    ```

6.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application should now be running at `http://localhost:3000`.

## Usage

Once the application is running:

1.  Navigate to `http://localhost:3000` in your browser.
2.  Sign up for a new account or sign in if you have existing credentials.
3.  Start creating inventories, adding items, and organizing with tags.
4.  Explore the dashboard, search functionality, and activity logs.

## ☁️ Deployment

Serium is designed to be easily deployable on various platforms.

### Vercel Setup

Recommended for Next.js applications. Connect your GitHub repository for seamless CI/CD. Ensure all environment variables are set in your Vercel project settings.

### 🐳 Docker Setup

Serium is easily deployable with Docker. Here's a full guide to run it in a containerized environment.

1. **Build the Docker image:**

   ```bash
   docker build \
     --build-arg DATABASE_URL="your_database_url_here" \
     -t serium-webapp .
   ```

   Replace `your_database_url_here` with your actual PostgreSQL connection string, for example:

   ```bash
   postgresql://user:password@host:port/database?sslmode=require
   ```

2. **Run the Docker container:**

   ```bash
   docker run -p 3000:3000 \
     -e DATABASE_URL="your_database_url_here" \
     -e BETTER_AUTH_URL="http://your-server-ip:3000" \
     -e BETTER_AUTH_SECRET="your_super_secret" \
     serium-webapp
   ```

   - `BETTER_AUTH_URL` should point to the public IP or domain of the machine running the container.
   - `BETTER_AUTH_SECRET` must match the secret used in your auth configuration.

3. **Access the app:**

   Open your browser and go to:

   ```
   http://localhost:3000
   ```

   Or replace `localhost` with your server IP if running remotely:

   ```
   http://your-server-ip:3000
   ```

### ⚙️ Recommended `.dockerignore`

Ensure your `.dockerignore` file includes the following to keep your Docker image lean and secure:

```
node_modules
.next
.env
.DS_Store
.git
*.log
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

Please read `CONTRIBUTING.md` (create this file) for details on our code of conduct, and the process for submitting pull requests to us.

## 📜 License

Distributed under the MIT License. See `LICENSE` file for more information.

## 🙏 Credits & Acknowledgements

Serium wouldn't be possible without these incredible open-source projects and tools:

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide React](https://lucide.dev/) (for icons)
- [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- [Emblor TagInput](https://github.com/emblor/taginput)
- [Next-Themes](https://github.com/pacocoursey/next-themes) (if used)
- ...and many other fantastic libraries!

## 📞 Contact

Noam Yu / Project Maintainer - [@kcybe](https://github.com/kcybe) - [noamyu@proton.me](mailto:noamyu@proton.me)

Project Link: [https://github.com/kcybe/serium](https://github.com/kcybe/serium)

---

<p align="center">
  Built with ❤️ by <a href="https://noamyu.dev">noamyu.dev</a>
</p>
