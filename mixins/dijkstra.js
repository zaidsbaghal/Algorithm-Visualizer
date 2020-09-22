import PriorityQueue from '~/mixins/PriorityQueue'
export default {
    mixins: [PriorityQueue],
    methods: {
        dijkstra: function (grid, x, y, animations, pq) {
            let current = grid[x][y]
            this.enqueue(pq, current);

            while (pq.length > 0) {
                let current = this.dequeue(pq) // get shortest distance node
                if (current.isEnd == true) {
                    let curr = grid[current.col][current.row].parent
                    while (curr != null) {
                        if (curr.isStart) {
                            break;
                        }
                        animations.push(["path", curr.col, curr.row])
                        curr = curr.parent
                    }
                    animations.push(["end", x, y])
                    pq = []
                    return animations;
                }
                if (!current.isStart) {
                    animations.push(["visit", current.col, current.row])
                }

                let neighbors = this.getNeighbors(current)
                for (let i = 0; i < neighbors.length; i++) {
                    let ncoords = neighbors[i];
                    let n = grid[ncoords[0]][ncoords[1]];
                    if (document.getElementById(n.id).className === "wall") {
                        continue;
                    }
                    let newDist = current.ddist + 1 // set new distance
                    // if new distance is less than the current distance
                    if (newDist < n.ddist) {
                        n.ddist = newDist // set new distance of neighbor
                        n.parent = current // set the parent
                        this.enqueue(pq, n) // add to the priority queue
                    }
                }

            }

            pq = []
            animations.push(["nfound", -1, -1]) // not found
            return animations;
        },
        // returns an array of all neighbor nodes to a node
        getNeighbors: function (node) {
            let result = [];
            let row = node.row;
            let col = node.col;

            //left
            if (
                row >= 0 &&
                row < this.rowNum &&
                col - 1 >= 0 &&
                col - 1 < this.colNum
            ) {
                let id = "Node-" + col + "-" + row - 1;
                result.push([col - 1, row]);
            }
            // top
            if (
                row - 1 >= 0 &&
                row - 1 < this.rowNum &&
                col >= 0 &&
                col < this.colNum
            ) {
                let id = "Node-" + col - 1 + "-" + row;
                result.push([col, row - 1]);
            }
            // right
            if (
                row >= 0 &&
                row < this.rowNum &&
                col + 1 >= 0 &&
                col + 1 < this.colNum
            ) {
                let id = "Node-" + col + "-" + row + 1;
                result.push([col + 1, row]);
            }
            // bottom
            if (
                row + 1 >= 0 &&
                row + 1 < this.rowNum &&
                col >= 0 &&
                col < this.colNum
            ) {
                result.push([col, row + 1]);
            }
            return result;
        },
    },
}