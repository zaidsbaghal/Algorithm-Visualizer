export default {
    methods: {
        selectionSort: function (input) {
            let currentIdx = 0;
            while (currentIdx < input.length - 1) {
                let smallest = currentIdx;
                for (let i = currentIdx; i < input.length; i++) {
                    if (input[smallest] > input[i]) {
                        smallest = i
                    }
                }
                this.swap(currentIdx, smallest, input);
                currentIdx += 1
            }
            return input;
        },
        swap: function (i, j, array) {
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

}

