import { defineStore } from "pinia";

// Define a store called 'arrayStore'
export const useArrayStore = defineStore({
  id: "arrayStore",

  // Define state
  state: () => ({
    array: [] as any[],
    defaultArr: [] as any[],
    sorted: false,
  }),

  // Define actions (mutations)
  actions: {
    setCurrArray(array: any[]) {
      this.array = array;
    },

    setDefArray(array: any[]) {
      this.defaultArr = array;
    },

    setSorted(bool: boolean) {
      this.sorted = bool;
    },
  },
});
