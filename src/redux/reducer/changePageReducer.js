// 상태 // 0 시작화면, 1 설명 화면, 2 사진찍는 화면, 3 암호입력 화면, 4 암호해독 화면, 5 사진전송 화면 
const changePageState = { changePage: 0 }; 

// 리듀서
const changePageReducer = (state = changePageState, action) => {
  switch (action.type) {
    case 'STARTPAGE':
      return {
        ...state,
        changePage: 0,
      };
    case 'EXPLAINPAGE':
      return {
        ...state,
        changePage: 1,
      };
    case 'PHOTOPAGE':
      return {
        ...state,
        changePage: 2,
      };
    case 'CODEPAGE':
        return {
        ...state,
        changePage: 3,
      };
    case 'INTERPAGE':
        return {
        ...state,
        changePage: 4,
      };
    case 'PRINTPAGE':
        return {
        ...state,
        changePage: 5,
      };
    default:
      return state;
  }
};

export default changePageReducer;
