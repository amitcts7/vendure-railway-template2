import { populate } from '@vendure/core/cli';
import { bootstrap, VendureConfig } from '@vendure/core';
import { DataSource } from 'typeorm';
import path from 'path';

/**
 * @description
 * This function is responsible for populating the DB with test data on the first run. It
 * first checks to see if the configured DB has any Vendure tables, and if not, runs the
 * `populate()` function using data from the @vendure/create package.
 */
export async function populateOnFirstRun(config: VendureConfig) {
    const dbTablesAlreadyExist = await vendureTablesExist(config);
    if (!dbTablesAlreadyExist) {
        console.log(`No Vendure tables found in DB. Populating database with demo data...`);
        return populate(
            () => bootstrap({
                ...config,
                importExportOptions: {
                    importAssetsDir: path.join(
                        require.resolve('@vendure/create/assets/products.csv'),
                        '../images'
                    ),
                },
                dbConnectionOptions: {...config.dbConnectionOptions, synchronize: true}
            }),
            require('@vendure/create/assets/initial-data.json'),
            require.resolve('@vendure/create/assets/products.csv')
        ).then(app => app.close())
    } else {
        console.log(`Vendure tables already exist in DB. Skipping demo data population.`);
        return;
    }
}

async function vendureTablesExist(config: VendureConfig): Promise<boolean> {
    const dataSource = new DataSource(config.dbConnectionOptions as any);
    try {
        await dataSource.initialize();
        const schema = process.env.DB_SCHEMA || 'public';
        // Check for the 'channel' table which is always created by Vendure on first run.
        // Using information_schema for broader PostgreSQL compatibility.
        const result = await dataSource.query(
            `SELECT COUNT(*) as count
             FROM information_schema.tables
             WHERE table_schema = $1
             AND table_name = 'channel';`,
            [schema]
        );
        const count = parseInt(result[0].count, 10);
        console.log(`Vendure 'channel' table found in schema '${schema}': ${count > 0}`);
        return count > 0;
    } catch (err) {
        console.error(`Error checking for Vendure tables, assuming first run:`, err);
        return false;
    } finally {
        await dataSource.destroy().catch(() => {});
    }
}
