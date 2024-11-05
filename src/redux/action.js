// window 보여주는 액션
export const showWindow = () => ({
    type: 'SHOWWINDOW',
  });
export const hideWindow = () => ({
    type: 'HIDEWINDOW',
});
  
// 화면 바꾸는 액션
export const startPage = () => ({
  type: 'STARTPAGE',
});
export const explainPage = () => ({
  type: 'EXPLAINPAGE',
});
export const photoPage = () => ({
  type: 'PHOTOPAGE',
});
export const codePage = () => ({
  type: 'CODEPAGE',
});
export const interPage = () => ({
  type: 'INTERPAGE',
});
export const printPage = () => ({
  type: 'PRINTPAGE',
});

// 암호
export const savePhotoData = (photoData) => ({
  type: 'SAVE_PHOTO_DATA',
  payload: photoData
});

// 이미지
// imageActions.js

export const SET_BASE64_IMAGE = 'SET_BASE64_IMAGE';
export const SET_PROCESSED_IMAGE = 'SET_PROCESSED_IMAGE';

export const setBase64Image = (imageData) => ({
  type: SET_BASE64_IMAGE,
  payload: imageData,
});

export const setProcessedImage = (imageData) => ({
  type: SET_PROCESSED_IMAGE,
  payload: imageData,
});
