export default {
    methods: {
        mergeSort: function (mainArray, animations) {
            if (mainArray.length <= 1) return mainArray;

            const auxillaryArray = mainArray.slice()
            this.mergeSortHelper(mainArray, 0, mainArray.length - 1, auxillaryArray, animations)

            return [mainArray, animations]
        },
        // Merge helper function
        mergeSortHelper: function (mainArray, start, end, auxillaryArray, animations) {
            if (start === end) return;
            const middle = Math.floor((start + end) / 2)
            animations.push(["curr", middle])
            this.mergeSortHelper(auxillaryArray, start, middle, mainArray, animations); // split array in half
            this.mergeSortHelper(auxillaryArray, middle + 1, end, mainArray, animations); // split array in half
            this.doMerge(mainArray, start, middle, end, auxillaryArray, animations);
        },
        doMerge: function (mainArray, start, middle, end, auxillaryArray, animations) {
            let k = start;
            let i = start;
            let j = middle + 1
            while (i <= middle && j <= end) {
                animations.push(["comp", i, j]);
                if (auxillaryArray[i] <= auxillaryArray[j]) {
                    animations.push(["swap", k, i, auxillaryArray[i]]) // update swap colors
                    mainArray[k] = auxillaryArray[i];
                    i += 1;
                } else {
                    animations.push(["swap", k, j, auxillaryArray[j]]) // update swap colors
                    mainArray[k] = auxillaryArray[j];
                    j += 1;
                }
                k += 1;
            }
            while (i <= middle) {
                animations.push(["swap", k, i, auxillaryArray[i]]) // update swap colors
                mainArray[k] = auxillaryArray[i];
                i += 1;
                k += 1
            }
            while (j <= end) {
                animations.push(["swap", k, j, auxillaryArray[j]]) // update swap colors
                mainArray[k] = auxillaryArray[j];
                j += 1
                k += 1
            }
        }
    }
}

