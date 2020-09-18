export default {
    methods: {
        dijkstra: function (grid, x, y, animations) {
            var unvisited = []
            let current = grid[x][y]
            let neighbors = this.getNeighbors(current);
            while (neighbors.length > 0){
                
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