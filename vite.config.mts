import { defineConfig } from 'vite';
import { vendureDashboardPlugin } from '@vendure/dashboard/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [
        vendureDashboardPlugin({
            vendureConfigPath: './src/vendure-config.ts',
            vendureConfigExport: 'config',
            module: 'commonjs',
            tempCompilationDir: path.join(__dirname, '.vendure-dashboard-temp'),
            // Skip scanning npm packages for dashboard extensions.
            // This template has no custom npm plugins — scanning all of
            // node_modules takes hours and produces nothing useful.
            pluginPackageScanner: {
                packageGlobs: [],
            },
        }),
    ],
    build: {
        outDir: path.join(__dirname, 'dist/dashboard'),
        emptyOutDir: true,
    },
});
