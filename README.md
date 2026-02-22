# 🔍 TelYab - Telegram Username Lookup Tool
==============================================

[![CI](https://github.com/mehrshud/telyab/actions/workflows/ci.yml/badge.svg)](https://github.com/mehrshud/telyab/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/language-JavaScript-blue)]()
[![Stars](https://img.shields.io/github/stars/mehrshud/telyab?style=social)](https://github.com/mehrshud/telyab)



## 📝 Project Description
TelYab is an advanced Telegram username lookup tool built with React, offering a sleek, modern interface with dark mode support and comprehensive search functionality. The application provides a user-friendly way to analyze Telegram usernames with step-by-step search process visualization. Our goal is to provide a robust and efficient tool for users to manage their Telegram username search process.

### 🌟 Features

* 🔎 Advanced username search: Our tool allows users to search for Telegram usernames using various filters and parameters.
* 🌓 Dark/Light mode toggle: Users can switch between dark and light modes to suit their preferences.
* 📜 Search history management: The application stores search history, enabling users to track and manage their previous searches.
* 📋 Easy copy-paste functionality: Users can easily copy and paste usernames, making it convenient to share or reuse them.
* 🇮🇷 Full Persian language support: TelYab is fully translated into Persian, making it accessible to a broader audience.
* 🎨 Responsive and modern UI design: Our application features a clean and intuitive design, ensuring a seamless user experience.
* 🔒 Secure login system: We prioritize user security with a robust login system, protecting user data and preventing unauthorized access.

## 🚀 Getting Started
---------------

### Prerequisites

* Node.js (v16.0.0 or later)
* npm (v8.0.0 or later)

### Installation

1. Clone the repository
```bash
git clone https://github.com/mehrshud/telyab.git
cd telyab
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

### Example Use Cases

Here are a few examples of how to use TelYab:

* Searching for a specific username:
```javascript
import { searchUsername } from './api';

const username = 'example';
searchUsername(username).then((result) => {
  console.log(result);
});
```

* Retrieving search history:
```javascript
import { getSearchHistory } from './api';

getSearchHistory().then((history) => {
  console.log(history);
});
```

## 🛠 Deployment
--------------

### GitHub Deployment

1. Create a new repository on GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/mehrshud/telyab.git
git push -u origin main
```

### Vercel Deployment

1. Install Vercel CLI
```bash
npm install -g vercel
```

2. Login to Vercel
```bash
vercel login
```

3. Deploy your project
```bash
vercel
```

### Deployment Comparison

The following table compares the deployment options:

| Deployment Option | Description | Pros | Cons |
| --- | --- | --- | --- |
| GitHub Deployment | Deploying to GitHub Pages | Easy to set up, free | Limited customization options |
| Vercel Deployment | Deploying to Vercel | Fast and scalable, easy to set up | Requires Vercel account |
| Manual Deployment | Deploying to a custom server | High level of customization, control over infrastructure | Requires technical expertise, can be time-consuming |

## 📦 Built With
--------------

* React: A JavaScript library for building user interfaces.
* Tailwind CSS: A utility-first CSS framework for building custom user interfaces.
* Framer Motion: A production-ready motion library for React.
* Lucide React: A library of icons for React applications.
* React Helmet: A library for managing the document head in React applications.

### Technical Architecture

The following Mermaid diagram illustrates the technical architecture of TelYab:
```mermaid
graph LR
    A[Client] -->|Request|> B[Server]
    B -->|Response|> A
    B -->|Database|> C[Database]
    C -->|Data|> B
    B -->|API|> D[API]
    D -->|Data|> B
```

## 🔐 Authentication
------------------

Default Login Credentials:
* Username: admin
* Password: admin

### Authentication Flow

The following code example demonstrates the authentication flow:
```javascript
import { login } from './api';

const username = 'admin';
const password = 'admin';

login(username, password).then((response) => {
  if (response.success) {
    console.log('Logged in successfully');
  } else {
    console.log('Invalid credentials');
  }
});
```

## 📄 License
-------------

This project is licensed under the MIT License.

## 👨‍💻 Author
-------------

Mehrshad

## 🤝 Contributing
------------------

Contributions are welcome! Please feel free to submit a Pull Request. We appreciate any help in improving and expanding TelYab.

### Code of Conduct

We follow the standard code of conduct for open-source projects. Please be respectful and considerate in your interactions with the community.

### Issue Tracker

We use GitHub Issues to track bugs and feature requests. Please report any issues you encounter or suggest new features by opening a new issue.

### Pull Request Guidelines

When submitting a Pull Request, please ensure that:

* Your code is formatted according to the project's coding standards.
* Your code includes relevant tests and documentation.
* Your Pull Request is descriptive and includes a clear explanation of the changes made.

By following these guidelines, we can ensure that TelYab remains a high-quality and maintainable project.