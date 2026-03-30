/**
 * This file is used ONLY by vite.config.mts to build the React dashboard.
 * It is a stripped-down version of vendure-config.ts that:
 *  - Excludes DashboardPlugin (avoids circular dependency during build)
 *  - Excludes S3/MinIO config (not needed for schema introspection)
 *  - Uses hardcoded stubs for env vars (build-time only, not used at runtime)
 *
 * Keep customFields and plugins in sync with vendure-config.ts so the
 * dashboard schema reflects the real server configuration.
 */
import {
    dummyPaymentHandler,
    DefaultJobQueuePlugin,
    DefaultSearchPlugin,
    VendureConfig,
} from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import path from 'path';

export const config: VendureConfig = {
    apiOptions: {
        port: 3000,
        adminApiPath: 'admin-api',
        shopApiPath: 'shop-api',
    },
    authOptions: {
        tokenMethod: ['bearer', 'cookie'],
        superadminCredentials: {
            identifier: 'superadmin',
            password: 'superadmin',
        },
        cookieOptions: {
            secret: 'build-time-secret',
        },
    },
    dbConnectionOptions: {
        type: 'postgres',
        synchronize: false,
        migrations: [],
        logging: false,
        database: 'vendure',
        host: 'localhost',
        port: 5432,
        username: 'admin',
        password: 'password',
    },
    paymentOptions: {
        paymentMethodHandlers: [dummyPaymentHandler],
    },
    // Keep customFields in sync with vendure-config.ts
    customFields: {
        Product: [{
            name: 'test',
            type: 'string',
        }]
    },
    plugins: [
        AssetServerPlugin.init({
            route: 'assets',
            assetUploadDir: path.join(__dirname, '../static/assets'),
        }),
        DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
        DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
        EmailPlugin.init({
            devMode: true,
            outputPath: path.join(__dirname, '../static/email/test-emails'),
            route: 'mailbox',
            handlers: defaultEmailHandlers,
            templatePath: path.join(__dirname, '../static/email/templates'),
            globalTemplateVars: {
                fromAddress: '"example" <noreply@example.com>',
                verifyEmailAddressUrl: 'http://localhost:8080/verify',
                passwordResetUrl: 'http://localhost:8080/password-reset',
                changeEmailAddressUrl: 'http://localhost:8080/verify-email-address-change',
            },
        }),
    ],
};
