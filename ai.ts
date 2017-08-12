#!/usr/bin/env node
/**
 *   MyKizunaAi - https://github.com/zzmzz/mykizunaai
 *
 *   Based on Wechaty
 *
 *   just for fun
 */
/**
 *   Wechaty - https://github.com/chatie/wechaty
 *
 *   Copyright 2016-2017 Huan LI <zixia@zixia.net>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */

const qrcodeTerminal = require('qrcode-terminal')

import {
    config,
    Room,
    Wechaty,
    log,
} from '../'

const bot = Wechaty.instance({profile: config.DEFAULT_PROFILE})

bot
    .on('login', function (this, user) {
        log.info('Bot', `${user.name()} logined`)
        this.say('wechaty contact-bot just logined')

        var CronJob = require('cron').CronJob;
        new CronJob('* * * * * *', function() {
            console.log('You will see this message every second');
        }, null, true, 'Asia/Shanghai');
    })
    .on('logout', user => log.info('Bot', `${user.name()} logouted`))
    .on('error', e => log.info('Bot', 'error: %s', e))
    .on('scan', (url, code) => {
        if (!/201|200/.test(String(code))) {
            const loginUrl = url.replace(/\/qrcode\//, '/l/')
            qrcodeTerminal.generate(loginUrl)
        }
        console.log(`${url}\n[${code}] Scan QR Code in above url to login: `)
    })

bot.init()
    .catch(e => {
        log.error('Bot', 'init() fail: %s', e)
        bot.quit()
        process.exit(-1)
    })

async function main() {
    log.info("test success !!!")
    const dingRoom = await Room.find({topic: /^人工智障/i})
    if (dingRoom) {
        /**
         * room found
         */
        log.info('Bot', 'onMessage: got dingRoom: %s', dingRoom.topic())
        var date = new Date();//现在时刻
        var dateIntegralPoint = new Date();//用户登录时刻的下一个整点，也可以设置成某一个固定时刻
        dateIntegralPoint.setDate(date.getDate())
        dateIntegralPoint.setHours(date.getHours())
        dateIntegralPoint.setMinutes(date.getMinutes())
        dateIntegralPoint.setSeconds(date.getSeconds()+60)
        setTimeout(main.bind(this), dateIntegralPoint - date)
        dingRoom.say(`测试定时讲话`)
    }
}