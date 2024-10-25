import { initializeApp } from 'firebase/app';

const firebaseConfig = JSON.parse(import.meta.env.VITE_API_CONFIG_FIREBASE);

const app = initializeApp(firebaseConfig);
