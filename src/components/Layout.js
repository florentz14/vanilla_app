import Navbar from "./Navbar"
import Footer from "./Footer";

// Helper function to get the title case from path
const getTitle = (path) => {
  return path === '/' ? 'Home' : path.charAt(1).toUpperCase() + path.slice(2);
};

export default function Layout(content = "", currentPath = '/') {
  const title = getTitle(currentPath);
  
  return `
    <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      ${Navbar(title, currentPath)}
      <main class="flex-grow container mx-auto px-4 py-8">
        ${content}
      </main>
      ${Footer()}
    </div>
  `;
}