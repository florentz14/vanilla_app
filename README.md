# Vanilla JavaScript SPA Starter

A modern, responsive Single Page Application (SPA) built with vanilla JavaScript, featuring a custom router, theme switching, and mobile-responsive design.

## 🚀 Features

- **Client-Side Routing**: Custom router implementation for seamless navigation
- **Dark/Light Mode**: Toggle between light, dark, and system theme preferences
- **Responsive Design**: Mobile-first approach with a collapsible navigation menu
- **Modern UI**: Clean, accessible interface with smooth transitions
- **No Frameworks**: Built with vanilla JavaScript for optimal performance

## 🛠️ Tech Stack

- **Core**: Vanilla JavaScript (ES6+)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Linting**: [ESLint](https://eslint.org/)
- **Formatting**: [Prettier](https://prettier.io/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher) or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vanilla-app.git
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

## 📂 Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Navbar.js   # Navigation bar component
│   └── NavLink.js  # Navigation link component
├── pages/          # Page components
│   ├── Home.js
│   └── About.js
├── utils/          # Utility functions
│   ├── router.js   # Custom router implementation
│   └── theme.js    # Theme management
└── index.js        # Application entry point
```

## 🧪 Testing

Run tests with:

```bash
npm test
# or
yarn test
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the fast development server and build tooling
- [Heroicons](https://heroicons.com/) for the beautiful icons
