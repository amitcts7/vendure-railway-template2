import { vendureDashboardPlugin } from '@vendure/dashboard/vite';
import { join } from 'path';
import { pathToFileURL } from 'url';
import { defineConfig } from 'vite';

// VENDURE_API_HOST must be set in GitHub Actions secrets/variables
// e.g. https://your-app.up.railway.app
const apiHost = process.env.VENDURE_API_HOST || 'http://localhost';
const apiPort = parseInt(process.env.VENDURE_API_PORT || '3000');

export default defineConfig({
    base: '/dashboard',
    build: {
        outDir: join(process.cwd(), 'dist/dashboard'),
    },
    plugins: [
        vendureDashboardPlugin({
            vendureConfigPath: pathToFileURL('./src/vendure-config.ts'),
            api: { host: apiHost, port: apiPort },
        }),
    ],
});
