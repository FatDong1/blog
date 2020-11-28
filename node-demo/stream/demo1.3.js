const fs = require('fs');
const zlib = require('zlib');
const file = 'test.txt'

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream(file + '.gz'));