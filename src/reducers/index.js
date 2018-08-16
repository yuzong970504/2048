import ActionTypes from '../const/ActionTypes';

const initState = {
  btns: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
  score: 0,
  bestScore: 2000,
  title: '2048',
  description: "Keypressing 'W S A D' on PC. Touch moving on Phone."
};

function randomAddBtn(btnList) {
  const randomrow = Math.floor(Math.random() * 4);
  const randomcol = Math.floor(Math.random() * 4);
  if (btnList[randomrow][randomcol] == 0) {
    btnList[randomrow][randomcol] = 2;
  } else {
    randomAddBtn(btnList);
  }
}

function checkStatus(btnList) {
  let gameoverflag = true
  btnList.map((item) => {
    item.map((item) => {
      if (item == 0) gameoverflag = false;
    })
  })
  if (gameoverflag) {
    alert('游戏结束');
    return false
  }
  else {
    return true
  }
}

export default function (state = initState, action) {
  switch (action.type) {
    case `${ActionTypes.INIT_HANDLE}`: {
      let newState = { ...state };
      let { btns } = newState;
      btns = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
      const row1 = Math.floor(Math.random() * 4);
      const col1 = Math.floor(Math.random() * 4);
      let row2 = Math.floor(Math.random() * 4);
      let col2 = Math.floor(Math.random() * 4);
      if (row1 == row2 && col1 == col2) {
        row2 = Math.floor(Math.random() * 4);
        col2 = Math.floor(Math.random() * 4);
      }
      btns[row1][col1] = 2;
      btns[row2][col2] = 2;
      newState = { ...newState, btns, score: 0 };
      return newState;
    }
    // 下操作
    case `${ActionTypes.BOTTOM_HANDLE}`: {
      let { btns, score, bestScore } = { ...state };
      let newbtns = [...btns];
      for (let row = 2; row >= 0; row--) {
        for (let col = 0; col < 4; col++) {
          const currentbtn = newbtns[row][col];
          let s;
          for (let k = row + 1; k < 4; k++) {
            if (newbtns[k][col] != 0) { s = k; break; }
            if (k == 3) { s = 3; break; }
          }
          const nextbtn = newbtns[s][col];
          if (currentbtn == nextbtn) {
            newbtns[s][col] *= 2;
            score += newbtns[s][col];
            newbtns[row][col] = 0;
          }
          if (currentbtn != nextbtn) {
            console.log(s);
            if (nextbtn != 0) {
              const k = newbtns[row][col];
              newbtns[row][col] = 0;
              newbtns[s - 1][col] = k;
            } else {
              newbtns[s][col] = newbtns[row][col];
              newbtns[row][col] = 0;
            }
          }
        }
      }
      if (checkStatus(newbtns)) { randomAddBtn(newbtns) }
      else { bestScore > score ? '' : bestScore = score };
      let newState = { ...state, btns: newbtns, score, bestScore };
      return newState;
    }
    case `${ActionTypes.TOP_HANDLE}`: {
      let { btns, score, bestScore } = { ...state };
      let newbtns = [...btns];
      for (let row = 1; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          const currentbtn = newbtns[row][col];
          let s;
          for (let k = row - 1; k >= 0; k--) {
            if (newbtns[k][col] != 0) { s = k; break; }
            if (k == 0) { s = 0; break; }
          }
          const nextbtn = newbtns[s][col];
          if (currentbtn == nextbtn) {
            newbtns[s][col] *= 2;
            score += newbtns[s][col];
            newbtns[row][col] = 0;
          }
          if (currentbtn != nextbtn) {
            console.log(s);
            if (nextbtn != 0) {
              const k = newbtns[row][col];
              newbtns[row][col] = 0;
              newbtns[s + 1][col] = k;
            } else {
              newbtns[s][col] = newbtns[row][col];
              newbtns[row][col] = 0;
            }
          }
        }
      }
      if (checkStatus(newbtns)) { randomAddBtn(newbtns) }
      else { bestScore > score ? '' : bestScore = score };
      let newState = { ...state, btns: newbtns, score, bestScore };
      return newState;
    }
    case `${ActionTypes.LEFT_HANDLE}`: {
      let { btns, score, bestScore } = { ...state };
      let newbtns = [...btns];
      for (let col = 1; col < 4; col++) {
        for (let row = 0; row < 4; row++) {
          const currentbtn = newbtns[row][col];
          let s;
          for (let k = col - 1; k >= 0; k--) {
            if (newbtns[row][k] != 0) { s = k; break; }
            if (k == 0) { s = 0; break; }
          }
          const nextbtn = newbtns[row][s];
          if (currentbtn == nextbtn) {
            newbtns[row][s] *= 2;
            score += newbtns[row][s];
            newbtns[row][col] = 0;
          }
          if (currentbtn != nextbtn) {
            console.log(s);
            if (nextbtn != 0) {
              const k = newbtns[row][col];
              newbtns[row][col] = 0;
              newbtns[row][s + 1] = k;
            } else {
              newbtns[row][s] = newbtns[row][col];
              newbtns[row][col] = 0;
            }
          }
        }
      }
      if (checkStatus(newbtns)) { randomAddBtn(newbtns) }
      else { bestScore > score ? '' : bestScore = score };
      let newState = { ...state, btns: newbtns, score, bestScore };
      return newState;
    }
    case `${ActionTypes.RIGHT_HANDLE}`: {
      let { btns, score, bestScore } = { ...state };
      let newbtns = [...btns];
      for (let col = 2; col >= 0; col--) {
        for (let row = 0; row < 4; row++) {
          const currentbtn = newbtns[row][col];
          let s;
          for (let k = col + 1; k < 4; k++) {
            if (newbtns[row][k] != 0) { s = k; break; }
            if (k == 3) { s = 3; break; }
          }
          const nextbtn = newbtns[row][s];
          if (currentbtn == nextbtn) {
            newbtns[row][s] *= 2;
            score += newbtns[row][s];
            newbtns[row][col] = 0;
          }
          if (currentbtn != nextbtn) {
            console.log(s);
            if (nextbtn != 0) {
              const k = newbtns[row][col];
              newbtns[row][col] = 0;
              newbtns[row][s - 1] = k;
            } else {
              newbtns[row][s] = newbtns[row][col];
              newbtns[row][col] = 0;
            }
          }
        }
      }
      if (checkStatus(newbtns)) { randomAddBtn(newbtns) }
      else { bestScore > score ? '' : bestScore = score };
      let newState = { ...state, btns: newbtns, score, bestScore };
      return newState;
    }
    default:
      return state;
  }
}
