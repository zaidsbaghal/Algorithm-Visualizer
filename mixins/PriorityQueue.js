export default {
    methods: {
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
        dequeue: function (data) {
            let element = data.shift();
            return element;
        },
        isEmpty: function (data) {
            return (data.length === 0)
        }
    }
}