import { defineConfig } from 'vite';
import { vendureDashboardPlugin } from '@vendure/dashboard/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [
        vendureDashboardPlugin({
            vendureConfigPath: './src/vendure-config.dashboard.ts',
            vendureConfigExport: 'config',
            module: 'commonjs',
            tempCompilationDir: path.join(__dirname, '.vendure-dashboard-temp'),
            pluginPackageScanner: {
                packageGlobs: [],
            },
            // Disable the slow schema introspection steps.
            // This template has no custom dashboard extensions so
            // compile-time schema typing is not needed.
            disablePlugins: {
                configLoader: true,
                adminApiSchema: true,
                gqlTada: true,
                dashboardMetadata: true,
            },
        }),
    ],
    build: {
        outDir: path.join(__dirname, 'dist/dashboard'),
        emptyOutDir: true,
    },
});
