export default {
  setup() {
    // for use with dikstras algorithm
    const enqueue = (data, element) => {
      if (isEmpty(data)) {
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
    };
    // For use with astar algorithm
    const enqueueStar = (data, element) => {
      if (isEmpty(data)) {
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
    };
    const dequeue = (data) => {
      let element = data.shift();
      return element;
    };
    const isEmpty = (data) => {
      return data.length === 0;
    };
    const exists = (data, ele) => {
      for (let i = 0; i < data.length; i++) {
        let node = data[i];
        if (node.col == ele.col && node.row == ele.row) {
          return true;
        }
      }
      return false;
    };
    const reorder = (data, ele) => {
      var n;
      for (let i = 0; i < data.length; i++) {
        let node = data[i];
        if (node.col == ele.col && node.row == ele.row) {
          n = i;
          break;
        }
      }
      data.splice(n, 1);
      enqueueStar(data, ele);
    };
    return { enqueue, dequeue, isEmpty, exists, reorder, enqueueStar };
  },
};
