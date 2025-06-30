// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,        // allows using `describe`, `it`, `expect` globally
    environment: 'node',  // or 'jsdom' for browser-like environment
    include: ['**/*.test.ts'],
    setupFiles: ["./vitest.setup.ts"],
  },
});
