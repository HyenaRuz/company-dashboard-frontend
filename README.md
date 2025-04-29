# Company Dashboard Frontend

This is the frontend part of the Company Dashboard project, built with **React**, **Vite**, **TypeScript**, and **MUI**.

## Features

- Dark mode UI
- Responsive layout
- Axios for API requests
- React Query for data fetching and caching
- React Hook Form with Yup for form validation
- React Router for navigation
- Type-safe and modular codebase

## Run with Docker

To build and start the application in Docker:

```bash
docker-compose up --build
```

The frontend will be available at: [http://localhost:8083](http://localhost:8083)

## Environment Variables

Create a `.env` file in the root directory with the following content:

```
VITE_API_BASE_URL=http://localhost:8083/api/
```

## Development Scripts

```bash
npm run dev       # Start Vite development server
npm run build     # Build for production
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```
