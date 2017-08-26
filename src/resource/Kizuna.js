/**
 * @author KylesLight
 * @date 24/08/2017-7:19 PM
 * @file Kizuna
 */

import {Wechaty, Room} from 'wechaty';
import qrCodeTerminal from 'qrcode-terminal';

import CommonConf from '../constant/CommonConf';

const wechaty = Wechaty.instance({profile: CommonConf.PROFILE});

class KizunaBot {
    constructor() {

        const self = this;

        Object.assign(self, {
            wechaty,

            init() {
                // Set Events Handlers
                self.wechaty
                    .on('scan', (url, code) => {
                        if (!/201|200/.test(String(code))) {
                            const loginUrl = url.replace(/\/qrcode\//, '/l/');
                            qrCodeTerminal.generate(loginUrl)
                        }

                        console.log(`${url}\n[${code}] Scan QR Code in above url to login: `);
                    })
                    .on('login', (user) => {
                        console.log(`${user} login`);
                    })
                    .on('logout', (user) => {
                        console.log(`${user} logout`);
                    })
                    .on('error', (err) => {
                        console.log(`Error: ${err.message} received`);
                    });

                // Initialization
                self.wechaty
                    .init()
                    .catch(e => {
                        console.log(`爱酱启动大失败 (:3▓▒ ${e}`);
                    });
            },

            say(roomName, content) {
                if (!roomName) {
                    wechaty.say(content);
                    return;
                }

                Room.find({topic: roomName})
                    .then((room) => {
                        if (room) {
                            room.say(content);
                        }
                    })
                    .catch(x => x);
            }
        });

        self.init();
    }
}

export default KizunaBot;