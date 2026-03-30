import {bootstrap, JobQueueService, runMigrations} from '@vendure/core';
import { config } from './vendure-config';
import { populateOnFirstRun } from './populate';

populateOnFirstRun(config)
    .then(() => runMigrations(config))
    .then(() => bootstrap(config))
    .then(app => {
        // Railway (and most cloud hosts) sit behind a reverse proxy that sets
        // X-Forwarded-For headers. Tell Express to trust the proxy so that
        // express-rate-limit (used by DashboardPlugin) works correctly.
        app.getHttpAdapter().getInstance().set('trust proxy', 1);

        // For "lite" deployments with limited resources, we can run the job queue
        if (process.env.RUN_JOB_QUEUE_FROM_SERVER?.toLowerCase() === 'true') {
            return app.get(JobQueueService).start();
        }
    })
    .catch(err => {
        console.log(err);
    });
