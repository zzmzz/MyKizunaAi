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

/**
 *
 * Known ISSUES:
 *  - BUG1: can't find member by this NickName:
 *    ' leaver: 艾静<img class="emoji emojiae" text="_web" src="/zh_CN/htmledition/v2/images/spacer.gif" />JOY
 *  - BUG2: leave event not right: sometimes can not found member (any more, because they left)
 * create a room need at least three people
 * when we create a room, the following one is the 3rd people.
 *
 * put name of one of your friend here, or room create function will not work.
 *
 * ::::::::: ___CHANGE ME___ :::::::::
 *                           vvvvvvvvv
 *                           vvvvvvvvv
 *                           vvvvvvvvv
 */
const HELPER_CONTACT_NAME = 'Bruce LEE'

/**
 *                           ^^^^^^^^^
 *                           ^^^^^^^^^
 *                           ^^^^^^^^^
 * ::::::::: ___CHANGE ME___ :::::::::
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
} from 'wechaty'

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

    setTimeout(manageDingRoom.bind(this), 3000)
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
}