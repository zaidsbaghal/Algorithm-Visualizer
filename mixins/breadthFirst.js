export default {
    methods: {
        bfs: function (x, y, grid, animations) {
            this.bfsHelper(x, y, grid, animations)
            animations.push(["nfound"]) // not found
            return animations
        },
        bfsHelper: function (x, y, grid, animations) {
            let current = grid[x][y];
            let currStyle = document.getElementById(current.id).className;
            let q = []
            current.visited = true;
            if (current.isEnd == false && current.isStart == false) {
                animations.push(["visit", x, y])
            }
            q.push(current)
            while (q.length > 0) {
                let v = q.shift() // pop
                if (v.isEnd == true) {
                    let curr = grid[v.col][v.row].parent
                    while (curr != null) {
                        if (curr.isStart) {
                            break;
                        }
                        animations.push(["path", curr.col, curr.row])
                        curr = curr.parent
                    }
                    animations.push(["end", x, y])
                    q = []
                    break;
                }
                let neighbors = this.getNeighbors(v);
                for (let i = 0; i < neighbors.length; i++) {
                    let ncoords = neighbors[i];
                    let n = grid[ncoords[0]][ncoords[1]];
                    if (document.getElementById(n.id).className === "wall") {
                        continue; // skip walls
                    }
                    if (n.visited === false) {
                        if (n.isEnd == true) {
                            n.parent = v
                            q.push(n)
                            break;
                        }
                        animations.push(["visit", n.col, n.row])
                        n.visited = true
                        n.parent = v
                        q.push(n)
                    }
                }
            }
            return;
        },
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
    }
}