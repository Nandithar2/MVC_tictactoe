document.onload= () => {
    if (document.readyState === "complete") {
      const model ={
        currentPlayer: 'X',
        board: [
          [" "," "," "],
          [" "," "," "],
          [" "," "," "],
        ],
        getNextPlayer() {
            return this.currentPlayer === 'X' ? 'O' : 'X';
          },
          makeMove(index) {
            if (this.board[index] || this.calculateWinner()) {
              return;
            }
            this.board[index] = this.currentPlayer;
            this.currentPlayer = this.getNextPlayer();
          },
          calculateWinner() {
            const lines = [
              [0, 1, 2],
              [3, 4, 5],
              [6, 7, 8],
              [0, 3, 6],
              [1, 4, 7],
              [2, 5, 8],
              [0, 4, 8],
              [2, 4, 6],
            ];
    
            for (let i = 0; i < lines.length; i++) {
              const [a, b, c] = lines[i];
              if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                return this.board[a];
              }
            }
            return null;
          }
      };
      const view = {
        squares: document.getElementsByClassName('square'),
        statusDisplay: document.getElementById('status'),
        render() {
          squares.forEach((square, index) => {
            const [row, col] = [index % 3, index / 3];
            square.textContent = model[row][col];
          });
        },
        updateStatus() {
            const winner = model.calculateWinner();
            if (winner) {
              this.statusDisplay.textContent = `Winner: ${winner}`;
            } else {
              this.statusDisplay.textContent = `Next player: ${model.currentPlayer}`;
            }
          },
        init() {
          this.squares.forEach((square, index) => {
            square.onclick = () => {
              controller.handleSquareClick(index);
            }
          });
        },
      };
      const controller = {
        handleSquareClick: (index) => {
            model.makeMove(index);
        view.render();
        view.updateStatus();
        },
        init() {
          view.init();
          view.render();
        view.updateStatus();
        },
      };
      controller.init();
    }
  }