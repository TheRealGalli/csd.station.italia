import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base è impostata dinamicamente in CI tramite VITE_BASE_PATH
export default defineConfig({
	plugins: [react()],
	base: process.env.VITE_BASE_PATH || '/',
});


