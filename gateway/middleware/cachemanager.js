class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(limit = 10) {
    this.limit = limit;
    this.map = new Map();
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  get(key) {
    if (!this.map.has(key)) return null;
    const node = this.map.get(key);
    this._moveToHead(node);
    return node.value;
  }

  set(key, value) {
    if (this.map.has(key)) {
      const node = this.map.get(key);
      node.value = value;
      this._moveToHead(node);
    } else {
      const newNode = new Node(key, value);
      this.map.set(key, newNode);
      this._addNode(newNode);
      this.size++;
      if (this.size > this.limit) {
        this._removeLRU();
      }
    }
  }

  _addNode(node) {
    node.next = this.head;
    node.prev = null;
    if (this.head) this.head.prev = node;
    this.head = node;
    if (!this.tail) this.tail = node;
  }

  _removeNode(node) {
    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;

    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev;
  }

  _moveToHead(node) {
    this._removeNode(node);
    this._addNode(node);
  }

  _removeLRU() {
    if (!this.tail) return;
    this.map.delete(this.tail.key);
    this._removeNode(this.tail);
    this.size--;
  }
}

module.exports = { LRUCache };
