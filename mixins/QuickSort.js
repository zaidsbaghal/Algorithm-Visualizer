// Quick sort
export default {
    methods: {
        quickSort: function (input, left, right, animations) {
            let res = this.quickSortHelper(input,left,right,animations);

            animations.push(["sorted", input.length - 1])

            return [res, animations];

        },
        quickSortHelper: function (input, left, right, animations) {
            var index;

            if (input.length > 1) {
                index = this.partition(input, left, right, animations);

                if (left < index - 1) {
                    this.quickSortHelper(input, left, index - 1, animations);
                }

                if (index < right) {
                    this.quickSortHelper(input, index, right, animations);
                }
            }
            return input;
        },
        // Partitions array into smaller arrays based on index left and right
        partition: function (input, left, right, animations) {
            var pivot = input[Math.floor((right + left) / 2)] // Get middle element as pivot
            animations.push(["curr", pivot])
            // Set pointers for left and right indices 
            var i = left;
            var j = right;

            animations.push(["comp", left, right])


            while (i <= j) {
                // Increment left pointer
                while (input[i] < pivot) {
                    animations.push(["clear", i])
                    i++
                    animations.push(["left", i])
                    animations.push(["clear", i])
                }

                // Decrement right pointer
                while (input[j] > pivot) {
                    animations.push(["clear", j])
                    j--;
                    animations.push(["right", j])
                    animations.push(["clear", j])
                }
                animations.push(["clear", pivot])
                animations.push(["clear", i])
                animations.push(["clear", j])
                if (i <= j) {
                    animations.push(["swap", i, j, input[j]])
                    animations.push(["swap", j, i, input[i]])
                    animations.push(["clear", i])
                    animations.push(["clear", j])
                    this.qsswap(input, i, j);
                    i++;
                    j--;
                }

            }
            return i;
        },

        // Swaps values at the left and right indices
        qsswap: function (input, li, ri) {
            var temp = input[li];
            input[li] = input[ri];
            input[ri] = temp;
        }

    }
}


