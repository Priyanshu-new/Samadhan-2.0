// just some arrays to store boards/lists/cards
let boards = [];

const boardsArea = document.getElementById("boardsArea");
const newBoardBtn = document.getElementById("newBoardBtn");

const boardTemplate = document.getElementById("boardTemplate");
const listTemplate = document.getElementById("listTemplate");
const cardTemplate = document.getElementById("cardTemplate");

// when clicking "Add Board"
newBoardBtn.addEventListener("click", () => {
  let name = prompt("Enter board name:");
  if (name) {
    let newBoard = { title: name, lists: [] };
    boards.push(newBoard);
    renderBoards();
  }
});

// render all boards
function renderBoards() {
  boardsArea.innerHTML = "";
  boards.forEach((board, bIndex) => {
    const boardEl = boardTemplate.content.cloneNode(true);
    boardEl.querySelector(".boardTitle").textContent = board.title;

    // add list button
    boardEl.querySelector(".addListBtn").addEventListener("click", () => {
      let listName = prompt("Enter list name:");
      if (listName) {
        boards[bIndex].lists.push({ title: listName, cards: [] });
        renderBoards();
      }
    });

    // render lists
    const listsArea = boardEl.querySelector(".listsArea");
    board.lists.forEach((list, lIndex) => {
      const listEl = listTemplate.content.cloneNode(true);
      listEl.querySelector(".listTitle").textContent = list.title;

      // add card button
      listEl.querySelector(".addCardBtn").addEventListener("click", () => {
        let cardText = prompt("Enter card text:");
        if (cardText) {
          boards[bIndex].lists[lIndex].cards.push(cardText);
          renderBoards();
        }
      });

      // render cards
      const cardsArea = listEl.querySelector(".cardsArea");
      list.cards.forEach(card => {
        const cardEl = cardTemplate.content.cloneNode(true);
        cardEl.querySelector(".card").textContent = card;
        cardsArea.appendChild(cardEl);
      });

      listsArea.appendChild(listEl);
    });

    boardsArea.appendChild(boardEl);
  });
}
