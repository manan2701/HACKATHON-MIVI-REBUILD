# Mivi Audio Website

This is the codebase for the Mivi Audio e-commerce website, built with React and Vite.

## Features

- Modern UI with smooth scrolling animations using GSAP and Lenis
- Complete product catalog with filtering and sorting
- User authentication and account management
- Shopping cart functionality
- Order placement and tracking
- Responsive design for all device sizes

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/mivi-website.git
   cd mivi-website
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_API_URL=your_backend_api_url
   ```

4. Start the development server
   ```
   npm run dev
   ```

The site will be available at http://localhost:5173

## Building for Production

To create a production build, run:
```
npm run build
```

## Technology Stack

- React 18
- Redux Toolkit for state management
- GSAP for animations
- Lenis for smooth scrolling
- React Router for navigation
