module.exports = function fetchRemotePreset(template, name) {
  const path = require('path');
  const download = require('download-git-repo');
  return new Promise((resolve, reject) => {
    console.log(require('../preset.json')[template], 'template');
    console.log(name, 'name');
    download(require('../preset.json')[template], name, function (err) {
      if (err) return reject(err);
      resolve({});
    })
  })
}
