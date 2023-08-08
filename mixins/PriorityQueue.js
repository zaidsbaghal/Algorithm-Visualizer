export default {
  methods: {
    // for use with dikstras algorithm
    enqueue: function (data, element) {
      if (this.isEmpty(data)) {
        data.push(element);
      } else {
        let added = false; // Was the queue shifted?
        for (let i = 1; i <= data.length; i++) {
          if (element.ddist < data[i - 1].ddist) {
            data.splice(i - 1, 0, element);
            added = true;
            break;
          }
        }
        // Add element to the end
        if (!added) {
          data.push(element);
        }
      }
    },
    // For use with astar algorithm
    enqueueStar: function (data, element) {
      if (this.isEmpty(data)) {
        data.push(element);
      } else {
        let added = false; // Was the queue shifted?
        for (let i = 1; i <= data.length; i++) {
          if (element.f < data[i - 1].f) {
            data.splice(i - 1, 0, element);
            added = true;
            break;
          }
        }
        // Add element to the end
        if (!added) {
          data.push(element);
        }
      }
    },
    dequeue: function (data) {
      let element = data.shift();
      return element;
    },
    isEmpty: function (data) {
      return data.length === 0;
    },
    exists: function (data, ele) {
      for (let i = 0; i < data.length; i++) {
        let node = data[i];
        if (node.col == ele.col && node.row == ele.row) {
          return true;
        }
      }
      return false;
    },
    reorder: function (data, ele) {
      var n;
      for (let i = 0; i < data.length; i++) {
        let node = data[i];
        if (node.col == ele.col && node.row == ele.row) {
          n = i;
          break;
        }
      }
      data.splice(n, 1);
      this.enqueueStar(data, ele);
    },
  },
};
