import { vendureDashboardPlugin } from '@vendure/dashboard/vite';
import { join } from 'path';
import { pathToFileURL } from 'url';
import { defineConfig } from 'vite';

export default defineConfig({
    base: '/dashboard',
    build: {
        outDir: join(process.cwd(), 'dist/dashboard'),
    },
    plugins: [
        vendureDashboardPlugin({
            vendureConfigPath: pathToFileURL('./src/vendure-config.ts'),
            api: {
                host: 'auto',
                port: 'auto',
                adminApiPath: 'admin-api',
                tokenMethod: 'cookie',
            },
        }),
    ],
});
