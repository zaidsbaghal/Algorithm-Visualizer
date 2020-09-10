export default {
    methods: {
        dfs: function (animations, x, y, grid) {
            return this.dfsHelper(this.startX, this.startY, grid, animations);
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
        dfsHelper: function (x, y, grid, animations) {
            let current = this.grid[x][y];
            let currStyle = document.getElementById(current.id).className;

            // Conditions
            if (currStyle === "end") {
                console.log("Found at" + current);
                return;
            } else {
                document.getElementById(current.id).className = "visited";
            }

            let neighbors = this.getNeighbors(current);
            for (let i = 0; i < neighbors.length; i++) {
                let ncoords = neighbors[i];
                let n = this.grid[ncoords[0]][ncoords[1]];
                if (document.getElementById(n.id).className !== "visited") {
                    this.dfsHelper(ncoords[0], ncoords[1]);
                }
            }

            return;
        },
    }
}