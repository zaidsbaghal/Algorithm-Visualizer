export default {
    methods: {

        insertionSort: function (array, animations) {
            animations.push(["init", 0])
            for (let i = 1; i < array.length; i++) {
                let j = i;
                animations.push(["curr", i])
                if (array[j] >= array[j - 1]) {
                    animations.push(["init", j])
                }
                while (j > 0 && array[j] < array[j - 1]) {
                    animations.push(["comp", j, j - 1])
                    animations.push(["swap", j, j - 1, array[j - 1]])
                    animations.push(["swap", j - 1, j, array[j]])
                    this.swap(j, j - 1, array);
                    j -= 1;
                }
            }
            return [array, animations];
        },

        swap: function (i, j, array) {
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
}



