# Lendsqr Frontend Assessment

This is the frontend engineering assessment for **Lendsqr**, built using **React, TypeScript, and SCSS**.  
The goal of this project is to create a **pixel-perfect, responsive admin dashboard interface**, with Login, Users, and User Details pages.

---

## Project Overview

- **Tech Stack:** React + TypeScript + SCSS
- **Routing:** React Router v6 with `RouterProvider`
- **Styling:** Modern SCSS architecture, including:
  - `abstracts/` for variables, mixins, and functions
  - `base/` for global resets and typography
  - Page/component styles **co-located** for maintainability and modularity
- **Folder Structure:** Feature-based organization for scalability and readability
- **Mock API:** Implemented for 500 users
- **Local Storage / IndexedDB:** For persisting user details

> This setup lays the foundation for building enterprise-grade frontend code with clean architecture, modularity, and maintainability.

---

## Current Folder Structure

```
src/
├── assets/
├── components/
├── mock/
├── pages/
├── services/
├── hooks/
├── types/
├── styles/
└── utils/
```

- Each page/component has its own folder with `.tsx`, `.scss`, and `.test.tsx`
- Shared SCSS concerns (variables) live in `styles/abstracts`
- Global resets/typography in `styles/base`

---

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run the project

```bash
npm run dev
```
