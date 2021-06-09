

import {ui} from './ui';

/**

 * @async
 */
async function init() {
  if ((<any>window).stream) {
    let trackArr = (<any>window).stream.getTracks();
    for (const track of trackArr) {
      track.stop();
    }
  }

  ui.init();
}

init();
