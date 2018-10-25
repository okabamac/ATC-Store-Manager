import http from 'http';
import app from './app';

const port = process.env.PORT || 3000;

const server = http.createServer(app);


server.listen(port, () => console.info("Application running on port 3000"));

if (process.env.NODE_ENV !== 'production') {
    process.once('uncaughtException', function (err) {
        console.error('FATAL: Uncaught exception.');
        console.error(err.stack || err);
        setTimeout(function () {
            process.exit(1);
        }, 100);
    });
}