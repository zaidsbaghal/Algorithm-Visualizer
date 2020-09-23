import PriorityQueue from '~/mixins/PriorityQueue'
export default {
    mixins: [PriorityQueue],
    methods: {
        aStar: function (grid, x, y, endx, endy, animations) {
            var pq = [] // Priority Queue
            let start = grid[x][y]
            let end = grid[endx][endy]
            start.g = 0 // initialize g score 

            this.enqueueStar(pq, start);

            // While Priority queue is not empty
            while (!this.isEmpty(pq)) {
                let current = this.dequeue(pq) // get node with lowest f score
                if (current.isEnd) {
                    // reconstruct path
                    current = current.parent;
                    while (!current.isStart) {
                        animations.push(["path", current.col, current.row])
                        current = current.parent;
                    }
                    return animations;
                }
                if (!current.isStart) {
                    animations.push(["visit", current.col, current.row])
                }
                current.closed = true // set as closed

                let neighbors = this.getNeighbors(current)
                for (let i = 0; i < neighbors.length; i++) {

                    let ncoords = neighbors[i];
                    let n = grid[ncoords[0]][ncoords[1]];
                    if (n.closed || document.getElementById(n.id).className === "wall") {
                        continue;
                    }
                    if (!n.isEnd) {
                        animations.push(["fringe", n.col, n.row])
                    }


                    let tempG = current.g + this.getDistance(current, n);

                    var beenVisited = n.visited;
                    if (tempG < n.g || !beenVisited) {

                        n.visited = true
                        n.parent = current;
                        n.g = tempG;
                        n.f = n.g + this.getDistance(n, end);
                    }

                    if (!beenVisited) {
                        this.enqueueStar(pq, n)
                    } else {
                        this.reorder(pq, n)
                    }
                }

            }

            return animations;
        },
        getDistance: function (current, neigh) {
            let distance = Math.abs(neigh.col - current.col) + Math.abs(neigh.row - current.row);
            return distance;
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
        }
    }
}