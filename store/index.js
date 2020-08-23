export const state = () => ({
    array: [], // Holds displayed bars on screen
    defaultArr: [], // holds the original unsorted array,
    sorted: false // Has this array been sorted already
})

export const mutations = {
    setCurrArray(state, array) {
        state.array = array
    },
    setDefArray(state, array) {
        state.defaultArr = array
    },
    setSorted(state, bool) {
        state.sorted = bool
    },
}