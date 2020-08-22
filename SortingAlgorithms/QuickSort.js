// Quick sort

export function quickSort(input, left, right) {

    var index;

    if (input.length > 1) {
        index = partition(input, left, right);

        if (left < index - 1) {
            quickSort(input, left, index - 1);
        }

        if (index < right) {
            quickSort(input, index, right);
        }
    }

    return input;

}

// Partitions array into smaller arrays based on index left and right
function partition(input, left, right) {
    var pivot = input[Math.floor((right + left) / 2)] // Get middle element as pivot
    // Set pointers for left and right indices 
    var i = left;
    var j = right;

    while (i <= j) {
        // Increment left pointer
        while (input[i] < pivot) {
            i++
        }
        // Decrement right pointer
        while (input[j] > pivot) {
            j--;
        }

        if (i <= j) {
            swap(input, i, j);
            i++;
            j--;
        }
    }
    return i;
}

// Swaps values at the left and right indices
function swap(input, li, ri) {
    var temp = input[li];
    input[li] = input[ri];
    input[ri] = temp;
}