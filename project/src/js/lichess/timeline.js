import storage from '../storage';

const STORAGEKEY = 'timeline.timestamp';

const supportedTypes = ['game-end'];

var timeline = [];
var lastRead = null;

function setLastRead(v) {
  lastRead = v;
}

export default {
  get() {
    return timeline;
  },

  set(t) {
    timeline = t.entries.filter(o => supportedTypes.indexOf(o.type) !== -1);
  },

  setLastRead,

  getSavedLastRead() {
    return storage.get(STORAGEKEY);
  },

  setLastReadTimestamp() {
    if (timeline[0]) {
      const newts = timeline[0].date;
      setLastRead(newts);
      storage.set(STORAGEKEY, newts);
    }
  },

  unreadCount() {
    var count = 0;
    if (!lastRead) return 0;

    for (var i = 0, len = timeline.length; i < len; i++) {
      if (timeline[i].date > lastRead) {
        count++;
      } else {
        break;
      }
    }

    return count < 100 ? count : 99;
  }
};
