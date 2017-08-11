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

/* tslint:disable:variable-name */
const qrcodeTerminal = require('qrcode-terminal')

import {
    config,
    Contact,
    Room,
    Wechaty,
    log,
} from '../'

console.log(`welcome`)
const bot = Wechaty.instance({ profile: config.DEFAULT_PROFILE })

bot
    .on('scan', (url, code) => {
    if (!/201|200/.test(String(code))) {
    const loginUrl = url.replace(/\/qrcode\//, '/l/')
    qrcodeTerminal.generate(loginUrl)
}
console.log(`${url}\n[${code}] Scan QR Code in above url to login: `)
})
.on('logout'	, user => log.info('Bot', `${user.name()} logouted`))
.on('error'   , e => log.info('Bot', 'error: %s', e))

/**
 * Global Event: login
 *
 * do initialization inside this event.
 * (better to set a timeout, for browser need time to download other data)
 */
.on('login', async function(this, user) {
    let msg = `${user.name()} logined`

    log.info('Bot', msg)
    await this.say(msg)

    msg = `setting to manageDingRoom() after 3 seconds ... `
    log.info('Bot', msg)
    await this.say(msg)

    setInterval(manageDingRoom.bind(this), 5000)
})

/**
 * Global Event: message
 */
.on('message', async function(this, message) {
    const room    = message.room()
    const sender  = message.from()
    const content = message.content()

    console.log((room ? '[' + room.topic() + ']' : '')
        + '<' + sender.name() + '>'
        + ':' + message.toStringDigest(),
    )
})
.init()
    .catch(e => console.error(e))

async function manageDingRoom() {
    log.info('Bot', 'manageDingRoom()')
    const dingRoom = await Room.find({ topic: /^人工智障/i })
    if (dingRoom) {
        log.info('Bot', 'onMessage: got dingRoom: %s', dingRoom.topic())
    }
}