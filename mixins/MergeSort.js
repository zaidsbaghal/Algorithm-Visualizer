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

            this.mergeSortHelper(auxillaryArray, start, middle, mainArray, animations);
            this.mergeSortHelper(auxillaryArray, middle + 1, end, mainArray, animations);
            this.doMerge(mainArray, start, middle, end, auxillaryArray, animations);
        },

        doMerge: function (mainArray, start, middle, end, auxillaryArray, animations) {
            let k = start;
            let i = start;
            let j = middle + 1
            while (i <= middle && j <= end) {
                if (auxillaryArray[i] <= auxillaryArray[j]) {
                    mainArray[k++] = auxillaryArray[i++];
                } else {
                    mainArray[k++] = auxillaryArray[j++];
                }
            }
            while (i <= middle) {
                mainArray[k++] = auxillaryArray[i++];
            }
            while (j <= end) {
                mainArray[k++] = auxillaryArray[j++];
            }
        }
    }
}

