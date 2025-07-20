# Vanilla JavaScript SPA

A modern, responsive Single Page Application (SPA) built with vanilla JavaScript, featuring client-side routing, authentication flows, theme switching, and mobile-responsive design. This project demonstrates how to build a full-featured SPA without heavy frameworks like React or Vue.

## 🚀 Features

- **Client-Side Routing**: Powered by `@vaadin/router` for seamless navigation
- **State Management**: Lightweight state management with `Zustand` (vanilla API)
- **Authentication**: Complete auth flow with login, registration, and protected routes
- **Data Fetching**: Advanced data fetching with `Axios`
- **Form Validation**: Robust form validation with `Yup`
- **Dark/Light Mode**: Toggle between light and dark themes with system preference detection
- **Responsive Design**: Mobile-first approach with a collapsible navigation menu
- **Modern UI**: Clean, accessible interface with smooth transitions
- **No Heavy Frameworks**: Built with vanilla JavaScript for optimal performance
- **Component-Based**: Reusable web components with `lit-html` for templating

## 🛠️ Tech Stack

- **Core**: Vanilla JavaScript (ES6+)
- **Templating**: [lit-html](https://lit-html.polymer-project.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (vanilla API)
- **Data Fetching**: [Axios](https://axios-http.com/)
- **Form Validation**: [Yup](https://github.com/jquense/yup)
- **Routing**: [@vaadin/router](https://vaadin.github.io/router/)
- **Code Quality**: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Husky](https://typicode.github.io/husky/), [lint-staged](https://github.com/okonet/lint-staged)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher) or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/florentz14/vanilla-app.git
   cd vanilla-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

Create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── store/         # State management
├── styles/        # Global styles
├── utils/         # Utility functions
└── router.js      # Application routes
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## 🎨 Theme Customization

This project supports three theme modes:

1. **Light Mode**: Bright color scheme for daytime use
2. **Dark Mode**: Dark color scheme for nighttime use
3. **System**: Automatically follows the system's color scheme preference

Toggle between themes using the theme switcher in the navigation bar.

## 📱 Responsive Navigation

The navigation menu automatically adjusts for different screen sizes:

- **Desktop**: Horizontal menu
- **Mobile**: Hamburger menu that slides in from the right

## 🛣️ Routing

The application includes a custom router with the following routes:

- `/` - Home page
- `/about` - About page
- `*` - 404 page (catches all undefined routes)

## 🔒 Authentication

The application includes a complete authentication flow:

- User registration
- Login/Logout
- Protected routes
- Persistent sessions

## 🎨 Theming

- Light/dark mode with system preference detection
- Theme persists across page reloads
- Smooth transitions between themes

## 🚀 Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your preferred static hosting service (Netlify, Vercel, GitHub Pages, etc.)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the fast development server and build tooling
- [Heroicons](https://heroicons.com/) for the beautiful icons
