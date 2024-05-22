import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import {terser} from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';
import css from 'rollup-plugin-css-only';
import json from '@rollup/plugin-json';

const production = !process.env.ROLLUP_WATCH;
const runhttpserver = !process.env.SKIP_HTTPSERVER;

function serve() {
    let server;

    function toExit() {
        if (server) server.kill(0);
    }

    return {
        writeBundle() {
            if (server) return;
            server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
                stdio: ['ignore', 'inherit', 'inherit'],
                shell: true
            });

            process.on('SIGTERM', toExit);
            process.on('exit', toExit);
        }
    };
}

export default {
    input: 'src/main.js',
    output: [
        {
            sourcemap: true,
            format: 'iife',
            name: 'gyreapp',
            file: 'dist/fds-gradient-editor.js'
        },
        {
            sourcemap: true,
            format: 'es',
            file: 'dist/fds-gradient-editor-es.js'
        },
    ],
    plugins: [
        json(),

        svelte({
            include: /\/[A-Z][^/]+\.svelte$/,
            compilerOptions: {
                customElement: true,
                // enable run-time checks when not in production
                dev: !production
            }
        }),

        svelte({
            include: /\/[a-z][^/]+\.svelte$/,
            compilerOptions: {
                customElement: false,
                // enable run-time checks when not in production
                dev: !production
            }
        }),
        css({ output: 'bundle.css' }),



            // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
            dedupe: ['svelte']
        }),
        commonjs(),

        {
            name: 'watch-external',
            buildStart() {
                this.addWatchFile('src/index.html')
            }
        },

        // In dev mode, call `npm run start` once
        // the bundle has been generated
        runhttpserver && !production && serve(),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload('dist'),

        copy({
            targets: [
                {src: "src/index.html", dest: "dist"},
            ],
            verbose: true
        }),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser(
            { 
                compress: {
                    drop_console: production,
                    drop_debugger: production,
                },
                output: { comments: false },
            }
        )
    ],
    watch: {
        clearScreen: false,
        chokidar: false
    }
};
