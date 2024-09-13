
class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */
  insert(val) {
    let newNode = new Node(val);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */
  insertRecursively(val, current = this.root) {
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }
    if (val < current.val) {
      if (current.left === null) {
        current.left = new Node(val);
        return this;
      } else {
        return this.insertRecursively(val, current.left);
      }
    } else {
      if (current.right === null) {
        current.right = new Node(val);
        return this;
      } else {
        return this.insertRecursively(val, current.right);
      }
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */
  find(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) return current;
      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */
  findRecursively(val, current = this.root) {
    if (current === null) return undefined;
    if (val === current.val) return current;
    if (val < current.val) {
      return this.findRecursively(val, current.left);
    } else {
      return this.findRecursively(val, current.right);
    }
  }

  /** dfsPreOrder(): Traverse the tree using pre-order DFS.
   * Return an array of visited nodes. */
  dfsPreOrder() {
    let result = [];
    function traverse(node) {
      result.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  /** dfsInOrder(): Traverse the tree using in-order DFS.
   * Return an array of visited nodes. */
  dfsInOrder() {
    let result = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      result.push(node.val);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  /** dfsPostOrder(): Traverse the tree using post-order DFS.
   * Return an array of visited nodes. */
  dfsPostOrder() {
    let result = [];
    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      result.push(node.val);
    }
    traverse(this.root);
    return result;
  }

  /** bfs(): Traverse the tree using BFS.
   * Return an array of visited nodes. */
  bfs() {
    let node = this.root,
        queue = [],
        result = [];
    queue.push(node);
    while (queue.length) {
      node = queue.shift();
      result.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return result;
  }

  /** remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */
  remove(val) {
    function removeNode(node, val) {
      if (node === null) return null;
      if (val === node.val) {
        // Node with no children
        if (node.left === null && node.right === null) return null;
        // Node with one child
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;
        // Node with two children
        let temp = getMin(node.right);
        node.val = temp.val;
        node.right = removeNode(node.right, temp.val);
        return node;
      } else if (val < node.val) {
        node.left = removeNode(node.left, val);
        return node;
      } else {
        node.right = removeNode(node.right, val);
        return node;
      }
    }

    function getMin(node) {
      while (node.left !== null) {
        node = node.left;
      }
      return node;
    }

    this.root = removeNode(this.root, val);
  }

  /** isBalanced(): Returns true if the BST is balanced, false otherwise. */
  isBalanced() {
    function height(node) {
      if (node === null) return -1;
      return Math.max(height(node.left), height(node.right)) + 1;
    }

    function checkBalanced(node) {
      if (node === null) return true;
      let leftHeight = height(node.left);
      let rightHeight = height(node.right);
      if (Math.abs(leftHeight - rightHeight) > 1) return false;
      return checkBalanced(node.left) && checkBalanced(node.right);
    }

    return checkBalanced(this.root);
  }

  /** findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */
  findSecondHighest() {
    let current = this.root;
    if (!current || (!current.left && !current.right)) return undefined;

    while (current) {
      if (current.right && !current.right.left && !current.right.right) {
        return current.val;
      }
      if (!current.right && current.left) {
        return this.findMax(current.left);
      }
      current = current.right;
    }
  }

  findMax(node) {
    while (node.right !== null) {
      node = node.right;
    }
    return node.val;
  }
}

module.exports = BinarySearchTree;
