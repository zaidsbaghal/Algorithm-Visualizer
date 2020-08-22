
export function mergeSort(input) {
    if (input.length <= 1) return input;

    // Initialize pointers
    const middle = input.length / 2;
    const left = input.slice(0, middle);
    const right = input.slice(middle, input.length);

    return merge(mergeSort(left), mergeSort(right));
}

// Merge helper function
function merge(left, right) {
    var result = []; // Resulting array

    // While there are still elements in the left or right array
    while (left.length || right.length) {
        // if there are elements in both the right and left array compare left and right
        if (left.length && right.length) {
            if (left[0] < right[0]) {
                result.push(left.shift())
            } else {
                result.push(right.shift())
            }
            // Else push left or right
        } else if (left.length) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }
    return result;
}