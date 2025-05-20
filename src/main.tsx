
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChoreProvider } from './contexts/ChoreContext.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ChoreProvider>
      <App />
    </ChoreProvider>
  </AuthProvider>
);

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}
