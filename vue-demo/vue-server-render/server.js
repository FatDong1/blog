const fs = require('fs');
const path = require('path');
const express = require('express');
const server = express();
server.use(express.static('dist'));

const bundle = require(path.resolve(__dirname, 'dist/vue-ssr-server-bundle.json'));

const renderer = require('vue-server-renderer').createBundleRenderer(bundle, {
    template: fs.readFileSync(path.resolve(__dirname, 'index.ssr.html'), 'utf-8'),
    clientManifest: require(path.resolve(__dirname, 'dist/vue-ssr-client-manifest.json')),
    basedir: path.resolve(__dirname, './dist'),
});

server.get('/index', (req, res) => {
    renderer.renderToString(req, (err, html) => {
        if (err) {
            console.error(err);
            res.status(500).end('服务器内部错误');
            return;
        }
        res.end(html);
    })
});

server.get('/foo', (req, res) => {
    renderer.renderToString(req, (err, html) => {
        if (err) {
            console.error(err);
            res.status(500).end('服务器内部错误');
            return;
        }
        res.end(html);
    })
});

server.get('/bar', (req, res) => {
    renderer.renderToString(req, (err, html) => {
        if (err) {
            console.error(err);
            res.status(500).end('服务器内部错误');
            return;
        }
        res.end(html);
    })
});

server.listen(8002, () => {
    console.log('后端渲染服务器启动，端口号为：8002');
});

