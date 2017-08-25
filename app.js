/**
 * @author KylesLight
 * @date 24/08/2017-6:49 PM
 * @file app
 */

import express from 'express';
import bodyParser from 'body-parser';

import CommonConf from './src/constant/CommonConf';
import Kizuna from './src/resource/Kizuna';

const app = express();
const port = process.env.NODE_PORT || CommonConf.DEFAULT_PORT;

const myKizuna = new Kizuna();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/ai/sendMessage', (req, res, next) => {
    const {room = '', content = ''} = req.body;
    console.log(room, content);

    myKizuna.say(room, content);
    res.json({
        "status": {
            "code": 0,
            "detail": "",
            "serverResponseTime": 1448556792660
        },
        "body": "success"
    });

    next();
});

app.all('*', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('你仿佛来到了宇宙的边缘 (´･ω･`)');
});

app.listen(port, () => {
    console.log(`爱酱正在端口 ${port} 启动 (｡･ω･｡)ﾉ♡`);
});