/**
 * Minimal config for vite dashboard build — NO imports.
 *
 * The vite plugin's internal TypeScript compiler follows all static imports
 * into node_modules (allowJs: true), causing multi-hour compile times.
 * By having zero imports here, TypeScript compiles this file in milliseconds.
 *
 * The vite plugin loads @vendure/core itself for schema generation —
 * it does NOT need us to import it here.
 *
 * Keep customFields in sync with vendure-config.ts.
 */
export const config: import('@vendure/core').VendureConfig = {
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
            secret: 'build-time-only',
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
        paymentMethodHandlers: [],
    },
    // Keep in sync with vendure-config.ts
    customFields: {
        Product: [{
            name: 'test',
            type: 'string',
        }],
    },
    plugins: [],
};
