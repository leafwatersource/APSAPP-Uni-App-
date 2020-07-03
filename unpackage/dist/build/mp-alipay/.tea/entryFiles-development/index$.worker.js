if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


  var AFAppX = self.AFAppX.getAppContext
    ? self.AFAppX.getAppContext().AFAppX
    : self.AFAppX;
  self.getCurrentPages = AFAppX.getCurrentPages;
  self.getApp = AFAppX.getApp;
  self.Page = AFAppX.Page;
  self.App = AFAppX.App;
  self.my = AFAppX.bridge || AFAppX.abridge;
  self.abridge = self.my;
  self.Component = AFAppX.WorkerComponent || function(){};
  self.$global = AFAppX.$global;
  self.requirePlugin = AFAppX.requirePlugin;
          

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../components/m-icon/m-icon?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/m-input?hash=e2b6e48fa2f377559fa96670965233895f86d3ca');
require('../../components/uni-segmented-control/uni-segmented-control?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/uni-drawer/uni-drawer?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/uni-list/uni-list?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/uni-icons/uni-icons?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/uni-badge/uni-badge?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/uni-list-item/uni-list-item?hash=4d329260cffa6d8c60f86626d2831f4b67a20adf');
require('../../components/mx-datepicker/mx-datepicker?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/uni-card/uni-card?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/uni-fab/uni-fab?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/uni-status-bar/uni-status-bar?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/uni-nav-bar/uni-nav-bar?hash=e131c6705ecd6504274661106fc380014f3123b8');
require('../../pages/login/login?hash=6897e903d083952ecd6187542adcad382dab05ba');
require('../../pages/main/main?hash=b923a7390de4949032a22e1263a3c9cbf041b037');
require('../../pages/user/user?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/workDetail/work?hash=e282c63b529d5df817ebee9edc8ca3476164f771');
require('../../pages/selectRes/resList?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/statisticsCenter/statisticsCenter?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/downLoadWork/downLoadWork?hash=bf1705ce3b876be66f318e96562e736941ccf998');
require('../../pages/userSetting/userSetting?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/userSetting/changePass?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/userSetting/settingMessage?hash=57f163bfc0512e187bc203ae92656c7a1ba9e313');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}