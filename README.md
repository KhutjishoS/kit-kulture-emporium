## Project Info

This project is a modern web application built with:

* **Vite**
* **TypeScript**
* **React**
* **shadcn-ui**
* **Tailwind CSS**

# Getting Started

You can work on this project in several ways depending on your setup and preferences.

# 1. Local Development (Preferred)

Make sure you have **Node.js** and **npm** installed. If not, install Node.js with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

This will launch a local development server with hot-reloading for instant preview.

# 2. Editing Files on GitHub

* Navigate to the file you want to update.
* Click the **Edit (pencil)** icon in the top right.
* Make your changes and commit them directly to the branch.

# 3. GitHub Codespaces

If you prefer not to work locally, you can use **GitHub Codespaces**:

* Go to your repository’s main page.
* Click **Code** → **Codespaces** → **New codespace**.
* Edit and run the project inside the Codespace environment.

# Deployment

You have a few deployment options for this project:

# Deploy to Netlify

1. Push your code to GitHub.
2. Sign in to [Netlify](https://www.netlify.com/).
3. Select **New site from Git** and connect your repo.
4. Set the build command to:

   ```sh
   npm run build
   ```

   and the publish directory to:

   ```sh
   dist
   ```

# Deploy to Vercel

1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com/).
3. Import your project repo.
4. Vercel will detect the framework automatically and handle deployment.

---

# Custom Domains

If you’re using **Netlify** or **Vercel**, you can easily connect your custom domain through their dashboard.
