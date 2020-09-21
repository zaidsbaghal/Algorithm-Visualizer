import pq from './PriorityQueue'
export default {
    components: { pq },
    data: function () {
        return {
            q: pq // Priority queue keeps track of distances in smallest-first order
        }
    },
    methods: {
        dijkstra: function (grid, x, y, animations) {
            console.log(this.q)
            let current = grid[x][y]
            var unvisited = [current]

            while (unvisited.length > 0) {
                let current = unvisited.shift() // get first element out
                // Go through each neighbor and calculate the distance 
                for (let i = 0; i < neighbors.length; i++) {
                    let ncoords = neighbors[i]; // neighbor coordinates
                    let n = grid[ncoords[0]][ncoords[1]]; // neighbor node
                    let preDist = n.ddist; // get previous distance

                }
            }


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