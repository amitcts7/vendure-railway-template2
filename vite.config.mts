import { defineConfig } from 'vite';
import { vendureDashboardPlugin } from '@vendure/dashboard/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [
        vendureDashboardPlugin({
            // Use the dashboard-specific config that excludes DashboardPlugin
            // itself — avoids circular dependency and speeds up the build.
            vendureConfigPath: './src/vendure-config.dashboard.ts',
            vendureConfigExport: 'config',
            module: 'commonjs',
            tempCompilationDir: path.join(__dirname, '.vendure-dashboard-temp'),
            pluginPackageScanner: {
                // No custom npm plugins in this template — skip the scan
                packageGlobs: [],
            },
        }),
    ],
    build: {
        outDir: path.join(__dirname, 'dist/dashboard'),
        emptyOutDir: true,
    },
});
