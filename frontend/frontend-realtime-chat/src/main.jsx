import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Inicializar Firebase
import './api/firebase.js';

createRoot(document.getElementById('root')).render(<App />);
