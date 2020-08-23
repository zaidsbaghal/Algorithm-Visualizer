export function bubbleSort(array) {
    let isSorted = false;
    let counter = 0;

    while (!isSorted) {
        isSorted = true // Assume array is sorted
        for (let i = 0; i < array.length - 1 - counter; i++) {
            if (array[i] > array[i + 1]) {
                swap(i, i + 1, array);
                isSorted = false; // If swap is done then we set this to false
            }
        }
        counter += 1;
    }
    return array;
}

// Function that swaps two indices in an array
function swap(i, j, array) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}