import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
import { photoPage, savePhotoData, startPage, showWindow, hideWindow } from '../redux/action';
// 이미지
import { ReactComponent as PrintPageButtonLight } from '../asset/printPageButtonLight.svg';
import { ReactComponent as PrintPageButtonDark } from '../asset/printPageButtonDark.svg';
import { ReactComponent as PrintPageText1 } from '../asset/printPageText1.svg';
import { ReactComponent as PrintPageText2 } from '../asset/printPageText2.svg';
import { ReactComponent as PrintPageText3 } from '../asset/printPageText3.svg';
import { ReactComponent as PrintPageText4 } from '../asset/printPageText4.svg';

const PrintPage = () => {
    // 로컬 상태
    const [buttonState, setButtonState] = useState(0);
    
    // Interval 저장용 Ref
    const intervValidRef = useRef(null);
    const intervValidPhotoRef = useRef(null);

    // 리덕스 상태 관리
    const img = useSelector((state) => state.image.base64Image); // 처리된 이미지
    const processedImg = useSelector((state)=>state.image.processedImage);
    const changePageState = useSelector((state) => state.changePage.changePage);
    const dispatch = useDispatch();

    // 페이지가 처음 렌더링되거나 다시 돌아올 때 실행되는 useEffect
    useEffect(() => {
        const resetPhotoPosition = () => {
            const photoElement = document.getElementById("processedPhoto");
            if (photoElement) {
                photoElement.style.top = '0px'; // 요소의 위치를 원래대로 되돌림
            }
        };

    }, []); 

    // 버튼 클릭 시 동작
    const buttonOnMouseDown = () => {
        const response = fetch("http://localhost:8000/print/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",  // JSON 형식으로 전송
            },
            // body: JSON.stringify(content),
        });

        setButtonState(1);

    };
    const buttonOnMouseUp = () => {
        setButtonState(0);
        let textCount = 0;
        let photoPositionValue = -500;
        const photoElement = document.getElementById("processedPhoto");
        photoElement.style.position = "relative";
        photoElement.style.top = `${photoPositionValue}px`;
        intervValidRef.current = setInterval(()=>{
            setButtonState((textCount%4)+2);
            textCount += 1;
        }, 500);
        intervValidPhotoRef.current = setInterval(()=>{
            if (photoPositionValue < 0) {
                photoPositionValue += 5; // 이동 거리 조정
                photoElement.style.top = `${photoPositionValue}px`;
            } else {
                setTimeout(()=>{
                    clearInterval(intervValidPhotoRef.current); // 도착하면 애니메이션 중지
                    clearInterval(intervValidRef.current);
                    intervValidPhotoRef.current = null;
                    intervValidRef.current = null;
                    dispatch(startPage());
                    dispatch(hideWindow());
                    dispatch(savePhotoData(null));
                }, 1000);

            }
        }, 100);

    };


    const style = {
        printPage: {
            width: '100%',
            height: '100%',
            flex: 1540,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
        },
        empty1: {
            flex: 77,
            width: '100%',
            height: '100%',
        },
        photoContainer: {
            width: '100%',
            height: '100%',
            flex: 576.93,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        photo: {
            width: '26.845%',
            height: '90.936%',
            maxWidth: '363.16px',
            maxHeight: '576.93px',
            position: 'relative',
        },
        bottomContainer: {
            flex: 195.07,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        button: {
            position: 'absolute',
            marginTop: '3.511%',
        },
        loadingText: {
            marginTop: '6.822%',
        },
    };

    return (
        <div style={style.printPage}>
            <div style={style.empty1}></div>
            <div style={style.photoContainer}>
                <img id="processedPhoto" style={style.photo} src={`data:image/jpeg;base64,${processedImg}`} alt="디코드된 jpeg 이미지" />
            </div>
            <div style={style.bottomContainer}>
                {(buttonState == 0) && <PrintPageButtonLight style={style.button}
                    onMouseDown={buttonOnMouseDown}
                />}
                {(buttonState == 1) && <PrintPageButtonDark  style={style.button}
                    onMouseUp={buttonOnMouseUp}
                />}
                {(buttonState == 2) && <PrintPageText1 style={style.loadingText} />}
                {(buttonState == 3) && <PrintPageText2 style={style.loadingText}/>}
                {(buttonState == 4) && <PrintPageText3 style={style.loadingText}/>}
                {(buttonState == 5) && <PrintPageText4 style={style.loadingText}/>}
            </div>
        </div>
    );
};

export default PrintPage;
