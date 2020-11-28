const fs = require('fs')

const file = fs.createReadStream('./test.txt')

file.setEncoding('utf8');

file.on('data', (chunk) => {
    console.log(chunk)
})

file.on('end', () => {
    console.log('没有数据了')
})
