import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // define:{
  //   //env varibales
  //   'process.env.API_URL':JSON.stringify(process.env.API_URL)
  // }
})
