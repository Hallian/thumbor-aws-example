const minimist = require('minimist');
const options = {
    string: ['imagePath', 'width', 'height', 'filtersCalls'],
    boolean: ['smart', 'fitInFlag', 'withFlipHorizontally', 'withFlipVertically', 'meta'],
    alias: {
      key: 'THUMBOR_SECURITY_KEY',
      url: 'THUMBOR_URL_SERVER',
      filters: 'filtersCalls'
    },
    default: {
      imagePath: '',
      width: 0,
      height: 0,
      smart: false,
      fitInFlag: false,
      withFlipHorizontally: false,
      withFlipVertically: false,
      halignValue: null,
      valignValue: null,
      cropValues: null,
      meta: false,
      filtersCalls: '',
      THUMBOR_SECURITY_KEY: null,
      THUMBOR_URL_SERVER: 'http://img.granoshop.fi'
    }
};
const args = minimist(process.argv.slice(2), options);

args.filtersCalls = args.filtersCalls.split(',');

if (args.THUMBOR_SECURITY_KEY == null) {
  console.warn('Security key not defined! Use --key flag');
  process.exit();
}

var Thumbor = require('thumbor');
var thumbor  = new Thumbor();

Object.keys(args).forEach(function (key) {
  if(key !== '_')
    thumbor[key] = args[key];
});

args._.forEach(function (imageId) {
  var thumborUrl = thumbor.setImagePath(imageId).buildUrl();
  console.log(thumborUrl);
});
