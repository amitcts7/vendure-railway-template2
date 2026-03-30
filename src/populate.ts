import { populate } from '@vendure/core/cli';
import { bootstrap, VendureConfig } from '@vendure/core';
import { DataSource } from 'typeorm';
import path from 'path';

/**
 * @description
 * This function is responsible for populating the DB with test data on the first run. It
 * first checks to see if the configured DB has any tables, and if not, runs the `populate()`
 * function using data from the @vendure/create package.
 */
export async function populateOnFirstRun(config: VendureConfig) {
    const dbTablesAlreadyExist = await tablesExist(config);
    if (!dbTablesAlreadyExist) {
        console.log(`No Vendure tables found in DB. Populating database...`);
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
        return;
    }
}

async function tablesExist(config: VendureConfig) {
    const dataSource = new DataSource(config.dbConnectionOptions as any);
    await dataSource.initialize();
    const schema = process.env.DB_SCHEMA || 'public';
    const result = await dataSource.query(
        `SELECT EXISTS (
            SELECT FROM pg_tables
            WHERE schemaname = $1
            AND tablename = 'channel'
        ) AS "exists";`,
        [schema]
    );
    await dataSource.destroy();
    return result[0].exists === true || result[0].exists === 'true';
}
