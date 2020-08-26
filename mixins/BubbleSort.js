export default {
    methods: {
        bubbleSort: function (array, animations) {
            let isSorted = false;
            let counter = 0;

            while (!isSorted) {
                isSorted = true // Assume array is sorted
                for (let i = 0; i < array.length - 1 - counter; i++) {
                    animations.push(["curr", i]) 
                    animations.push(["comp", i, i + 1]) // update comparison colors
                    if (array[i] > array[i + 1]) {
                        animations.push(["swap", i, array[i + 1]]) // update swap colors
                        animations.push(["swap", i + 1, array[i]]) // update swap colors
                        this.swap(i, i + 1, array);
                        isSorted = false; // If swap is done then we set this to false
                    }
                    animations.push(["done", array.length - counter])
                    animations.push(["clear", i]) // uncolor current index 
                }
                counter += 1;
            }
            animations.push(["sorted", array.length - counter]) // color all  remaining uncolored sorted elements
            return [array, animations];
        },
        // Function that swaps two indices in an array
        swap: function (i, j, array) {
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
}

