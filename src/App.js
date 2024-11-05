import React, { useState, useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
// 리듀서
import store from './redux/store';
import { explainPage, showWindow, hideWindow } from './redux/action';
// 컴포넌트
import WebcamView from './components/WebcamView';
import Window from './components/Window';


function App() {
  // 훅

  // 리덕스
  const showWindowState = useSelector((state) => state.showWindow.showWindow);
  const changePageState = useSelector((state) => state.changePage.changePage);
  const dispatch = useDispatch();


  // 이미지 로드 이전까지 렌더링 방지
  // 모든 이미지 경로를 배열로 정의
  const imagePaths = [
    `${process.env.PUBLIC_URL}/assets/image/background.png`,
    `${process.env.PUBLIC_URL}/assets/image/folder.png`,
    `${process.env.PUBLIC_URL}/assets/image/small_window.png`,
    `${process.env.PUBLIC_URL}/assets/image/backward_button.png`,
    // `${process.env.PUBLIC_URL}/assets/element/.png`,
    // 추가 이미지 경로...
  ];

  // 이미지 로드 함수
  const preloadImages = (paths) => {
    return Promise.all(
      paths.map((path) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = path;
          img.onload = resolve;
          img.onerror = reject;
        });
      })
    );
  };

  // 이미지 모두 로딩
  const [isLoaded, setIsLoaded] = useState(false);

  // 이미지 프리로드 설정
  useEffect(() => {
    preloadImages(imagePaths)
      .then(() => setIsLoaded(true))
      .catch((err) => console.error("Image loading failed", err));
  }, []);

  if (!isLoaded) {
    return <div>로딩 중...</div>; // 로딩 중일 때 표시할 컴포넌트
  }

  // 폴터 클릭 시 설명 화면으로 넘기기
  const toExplainPage = () => {
    dispatch(explainPage()); 
    dispatch(showWindow()); 
  }

  const style = {
    backgroundContainer: {
      // 백그라운드
      width: '100%',
      height: '100%',
      // 내부 배치
      display:'flex',
      flexDirection: 'row',
      // 포지션
      position: 'absolute',
    },
    
    // 내부 레이아웃
    emptyLayout1: { 
      // 크기
      flex: 89,
      width: '100%',
      height: '100%',
            // 간격
      position: 'relative',
    },

    folderLayout: {
      // 크기
      flex: 190.43,
      width: '100%',
      height: '100%',
      // 내부
      display: 'flex',
      flexDirection: 'column',
            // 간격
      position: 'relative',
    },

    smallWindowLayout: {
      // 크기
      flex: 1640.57,  
      width: '100%',
      height: '100%',
      // 내부
      display:'flex',
          // 간격
      position: 'relative',
    },

    emptyLayout2: {
      // 크기
      flex: 159,  
      width: '100%',
      height: '100%',
          // 간격
      position: 'relative',
    },

    emptyLayout3: {
      // 크기
      flex: 670,  
      width: '100%',
      height: '100%',
          // 간격
      position: 'relative',
    },

    emptyLayout4: {
      // 크기
      flex: 785.57,  
      width: '100%',
      height: '100%',
          // 간격
      position: 'relative',
    },

    smallWindowInnerLayout: {
      // 크기
      flex: 750,  
      width: '100%',
      height: '100%',
      // 내부
      display: 'flex',
      flexDirection: 'column',
          // 간격
      position: 'relative',
    },

    emptyLayout5: {
      // 크기
      flex: 105,  
      width: '100%',
      height: '100%',
          // 간격
      position: 'relative',
    },

    emptyLayout6: {
      // 크기
      flex: 124,  
      width: '100%',
      height: '100%',
          // 간격
      position: 'relative',
    },

    emptyLayout7: {
      // 크기
      flex: 74,  
      width: '100%',
      height: '100%',
          // 간격
      position: 'relative',
    },

    emptyLayout8: {
      // 크기
      flex: 143.7,  
      width: '100%',
      height: '100%',
          // 간격
      position: 'relative',
    },

    emptyLayout9: {
      // 크기
      flex: 160,  
      width: '100%',
      height: '100%',
          // 간격
      position: 'relative',
    },

    // 실제 요소
    folder: {
      flex: 251,
      width: '100%',
      height: '100%',
      // maxWidth: 190.43,
      // maxHeight: 251,
      position: 'relative',
    },

    smallWindow: {
      flex: 882,
      width: '100%',
      height: '100%',
      position: 'relative',
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/image/small_window.png)`,
      backgroundSize: 'contain', // 이미지가 div 크기에 맞게 조정
      backgroundPosition: 'center', // 이미지 중앙 정렬
      backgroundRepeat: 'no-repeat', // 이미지 반복 방지
      // 내부
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

    }


    

  }

  

  return (
    <div style={style.backgroundContainer}>
      <div style={style.emptyLayout1}></div>
      <div style={style.folderLayout}>
        <div style={style.emptyLayout2}></div>
        <img id="folder" onClick={toExplainPage} src={`${process.env.PUBLIC_URL}/assets/image/folder.png`} alt="폴더" style={style.folder}/> 
        <div style={style.emptyLayout3}></div>
      </div>
      <div style={style.smallWindowLayout}>
        <div style={style.emptyLayout4}></div>
        <div style={style.smallWindowInnerLayout}>
          <div style={style.emptyLayout6}></div>
          {(changePageState == 0 && showWindowState == 0) && <div id="small_window" style={style.smallWindow}>
            <div style={style.emptyLayout8}></div>
              <WebcamView id='startpage_webcamview' width='70.666%' height='60.09%' flex='530' scale="0.9" style={{maxWidth:'530', maxHeight: '530', }}/>
            <div style={style.emptyLayout9}></div>
          </div>}
          <div style={style.emptyLayout7}></div>
        </div>
        <div style={style.emptyLayout5}></div>
      </div>
      {/* 창 요소 */}
      {(changePageState!=0 && showWindowState == 1) && <Window id="window"/>}
    </div>
  );
}

export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider> 
  );
}