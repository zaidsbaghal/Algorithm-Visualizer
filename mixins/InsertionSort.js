export default {
    methods: {

        insertionSort: function (array) {
            for (let i = 1; i < array.length; i++) {
                let j = i;
                while (j > 0 && array[j] < array[j - 1]) {
                    this.swap(j, j - 1, array);
                    j -= 1;
                }
            }
            return array;
        },

        swap: function (i, j, array) {
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
}



