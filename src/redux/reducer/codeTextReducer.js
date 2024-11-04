const initialState = {
    photoData: null,
};

const codeTextReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SAVE_PHOTO_DATA':
            return {
                ...state,
                photoData: action.payload
            };
        // 다른 리듀서들
        default:
            return state;
    }
};
export default codeTextReducer;