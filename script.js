
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("#board");
    const ctx = canvas.getContext("2d");
  
    const GRID_WIDTH = 500;
    const GRID_HEIGHT = 500;
    const RES = 50;
    const COL = GRID_WIDTH / RES;
    const ROW = GRID_HEIGHT / RES;
  
    canvas.width = GRID_WIDTH;
    canvas.height = GRID_HEIGHT;
  
    //Making a grid and filling with 0 or 1
    function createGrid(cols, rows) {
      return new Array(cols)
        .fill(null)
        .map(() =>
          new Array(rows).fill(null).map(() => Math.round(Math.random()))
        );
    }
  
    let grid = createGrid(COL, ROW);

    let isRunning = false; // Variável para controlar se a animação está em execução

    // Adicionar event listener de clique ao canvas
    canvas.addEventListener("click", (event) => {
        if (!isRunning) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // Calcular a coluna e a linha correspondentes ao clique do usuário
            const col = Math.floor(mouseX / RES);
            const row = Math.floor(mouseY / RES);

            // Inverter o estado da célula (0 para 1 e 1 para 0)
            grid[col][row] = grid[col][row] === 0 ? 1 : 0;

            // Redesenhar a célula no canvas
            drawCell(col, row, grid[col][row]);
        }
    });

    // Função para desenhar uma única célula no canvas
    function drawCell(col, row, state) {
    ctx.fillStyle = state ? "#5c3ec9" : "#f8f8f2";
    ctx.fillRect(col * RES, row * RES, RES, RES);
    }
  
    const interval = 500; // Intervalo de tempo em milissegundos (0.5 segundos)

    setInterval(() => {
      grid = nextGen(grid);
      drawGrid(grid, COL, ROW, RES);
    }, interval);
    
    //Generate nex generation
    function nextGen(grid) {
      const nextGen = grid.map((arr) => [...arr]); //make a copy of grid with spread operator
  
      for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
          const currentCell = grid[col][row];
          let sumNeighbors = 0; //to verify the total of neighbors
  
          //Verifying the 8 neigbours of current cell
          for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
              if (i === 0 && j === 0) {
                continue; // because this is the current cell's position
              }
  
              const x = col + i;
              const y = row + j;
  
              if (x >= 0 && y >= 0 && x < COL && y < ROW) {
                const currentNeighbor = grid[col + i][row + j];
                sumNeighbors += currentNeighbor;
              }
            }
          }
  
          //Aplying rules
          if (currentCell === 0 && sumNeighbors === 3) {
            nextGen[col][row] = 1;
          } else if (
            currentCell === 1 &&
            (sumNeighbors < 2 || sumNeighbors > 3)
          ) {
            nextGen[col][row] = 0;
          }
        }
      }
      return nextGen;
    }
  
    //Draw cells on canvas
    function drawGrid(grid, cols, rows, reslution) {
      ctx.clearRect(0, 0, cols, rows);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const cell = grid[i][j];
          ctx.fillStyle = cell ? "#5c3ec9" : "#f8f8f2";
          ctx.fillRect(i * reslution, j * reslution, reslution, reslution);
        }
      }
    }
});


const recharge = document.getElementById("recharge");

recharge.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.reload(true);
})

