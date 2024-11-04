// 상태
const showWindowState = { showWindow: 0 }; 

// 리듀서
const showWindowReducer = (state = showWindowState, action) => {
  switch (action.type) {
    case 'SHOWWINDOW':
      return {
        ...state,
        showWindow: 1,
      };
    case 'HIDEWINDOW':
      return {
        ...state,
        showWindow: 0,
      };
    default:
      return state;
  }
};

export default showWindowReducer;
