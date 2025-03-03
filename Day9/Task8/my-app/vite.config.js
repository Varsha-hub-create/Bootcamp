import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path from "path";

// Convert ESM `import.meta.url` to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Enables '@' as an alias for 'src' directory
    },
  },
  server: {
    port: 5173, // Set a custom port if needed
    open: true, // Automatically open browser
    strictPort: true, // Avoid automatic port switching
  },
  build: {
    outDir: "dist", // Output directory
    sourcemap: true, // Enable source maps for debugging
  },
});
