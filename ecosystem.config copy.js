module.exports = {
    apps: [{
        name: 'conacoin',
        script: 'server.js',
        instances: 3,
        exec_mode: 'cluster',
        wait_ready: true,
        listen_timeout: 5000,
        kill_timeout: 5000,
        env: {
            NODE_ENV: 'development',
        },
        env_production: {
            NODE_ENV: 'production',
        },
        error_file: 'log/err.text',
        out_file: 'log/out.text',
        log_file: 'log/combined.text',
        time: true,
        watch: ['server'],
        watch_delay: 1000,
        ignore_watch: ['node_modules', 'public', 'static'],
        watch_options: {
            "followSymlinks": false
        }
    }]
}