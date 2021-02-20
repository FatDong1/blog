// 带有过期时间的LRU
// 方案：双向链表 + 哈希表
class Node {
    constructor (value, pre = null, next = null) {
        this.value = value
        if (pre) {
            pre.next = this
            this.pre = pre
        }
        if (next) {
            next.pre = this
            this.next = next
        }
    }
}

class List {
    constructor () {
        this.head = null
        this.tail = null
        this.length = 0
    }

    unshiftNode (node) {
        let head = this.head
        node.next = head
        if (this.head) {
            this.head.pre = node
        }
        this.head = node
        if (!this.tail) {
            this.tail = node
        }
        this.length++
    }

    pop () {
        if (!this.tail) {
            return null
        }
        let value = this.tail.value
        this.tail = this.tail.pre
        if (this.tail) {
            this.tail.next = null
        } else {
            this.head = null
        }
        this.length--
        return value
    }

    removeNode (node) {
        let next = node.next
        let pre = node.pre
        if (next) {
            next.pre = pre
        }

        if (pre) {
            pre.next = next
        }

        if (node === this.head) {
            this.head = next
        }
        if (node === this.tail) {
            this.tail = pre
        }
        this.length--
        node.next = null
        node.pre = null
    }
}

class LRU {
    constructor (size, expire = 1000) {
        this.size = size
        this.expire = expire
        this.map = new Map()
        this.list = new List()
    }

    put (key, value) {
        if (this.map.has(key)) {
            let node = this.map.get(key)
            this.list.removeNode(node)
        }
        let element = {
            key,
            value,
            saveTime: Date.now()
        }
        let node = new Node(element)
        this.map.set(key, node)
        this.list.unshiftNode(node)
        if (this.list.length > this.size) {
            let element = this.list.pop()
            this.map.delete(element.key)
        }
    }

    get (key) {
        let node = this.map.get(key)
        if (!node) {
            return -1
        }
        let element = node.value
        if (Date.now() - element.saveTime <= this.expire) {
            let newNode = {
                key, 
                value: element.value,
                saveTime: Date.now()
            }
            this.list.removeNode(node)
            this.list.unshiftNode(newNode)
            return element.value
        } else {
            this.list.removeNode(node)
            return -1
        }
    }
}

// 测试
let lru = new LRU(2) 
lru.put(1, 1)
lru.put(2, 2)
lru.put(3, 3)
let item = lru.get(1)
console.log(item)
