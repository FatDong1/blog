const fs = require('fs')
const file = fs.createWriteStream('./test.txt')

let i = 1e6

write();

function write() {
    let ok = true;
    do {
        i--;
        if (i === 0) {
            // 最后一次写入。
            file.write('hello world. ' + i + '\n')
        } else {
            // 检查是否可以继续写入。 
            // 不要传入回调，因为写入还没有结束。
            ok = file.write('hello world. ' + i + '\n')
        }
    } while (i > 0 && ok);
    if (i > 0) {
        // 被提前中止。
        // 当触发 'drain' 事件时继续写入。
        file.once('drain', () => {
            console.log('继续写入')
            write()
        });
    }
}

file.on('finish', () => {
    console.log('写入完成')
})

file.end()