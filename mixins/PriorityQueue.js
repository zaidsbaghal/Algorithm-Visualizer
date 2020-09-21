export default {
    data: function () {
        return {
            data: []
        }
    },
    methods: {
        enqueue: function (element) {
            if (this.isEmpty()) {
                this.data.push(element);
            } else {
                let added = false; // Was the queue shifted?
                for (let i = 1; i <= this.data.length; i++) {
                    if (element.ddist < this.data[i - 1].ddist) {
                        this.data.splice(i - 1, 0, element);
                        added = true;
                        break;
                    }
                }
                // Add element to the end
                if (!added) {
                    this.data.push(element);
                }
            }
        },
        dequeue: function () {
            let element = this.data.shift();
            return element;
        },
        isEmpty: function () {
            return (this.data.length === 0)
        }
    }
}