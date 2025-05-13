import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// substitua 'seu-usuario' e 'repositorio' abaixo
export default defineConfig({
  base: '/auto-proposta-hub-react/', // 👈 nome do repo
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
