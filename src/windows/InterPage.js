import React, { useState, useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { showWindow, hideWindow, photoPage, codePage, savePhotoData, printPage, setProcessedImage } from '../redux/action';
import messageInterpret from '../services/messageInterpret';
// 이미지
import { ReactComponent as InterPageButtonLight } from '../asset/InterPageButtonLight.svg';
import { ReactComponent as InterPageButtonDark } from '../asset/InterPageButtonDark.svg';

const InterPage = () => {

    // 리덕스 상태관리
    const photoDataState = useSelector((state) => state.photoData.photoData);
    const base64Img = useSelector((state) => state.image.base64Image);
    const dispatch = useDispatch();

    // 로컬 상태
    const [buttonState, setButtonState] = useState(0);
    const [unprocessedCode, setUnprocessedCode] = useState(photoDataState.split("//////")[0]);
    const [messageExist, setMessageExist] = useState(false);
    // const [codeDescription, setCodeDescription] = useState(photoDataState.sp)

    // 화면 크기에 따라 동적으로 폰트 크기 계산
    const calculateResponsiveFontSize = () => {
        const vh = window.innerHeight * 0.0463; // 4.63vh 계산
        return Math.min(vh, 50.01); // 최소값이 아니라, 최대 50.01px로 제한
    };

    useEffect(() => {
        // 특정 값에 따라 글자 크기 변경
        const value = (photoDataState.split("//////"))[0];
        if (value === "448866") { // 여기에 비교할 특정 값을 입력하세요
        
            document.getElementById("hihi").style.fontSize = '35px';
        } else {
            document.getElementById("hihi").style.fontSize = '40px';
        }
    }, []); // value가 변경될 때마다 useEffect가 실행됨

    const style = {
        codePage: {
            // 크기
            width: '100%',
            height: '100%',
            // 위치
            flex: 1540,
            // 내부 배치
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // 
            position: 'absolute',
        },

        empty1: {
            // 위치
            flex: 43,
            // 크기
            width: '100%',
            height: '100%',
            // 
        },

        backwardContainer:{
            //  위치
            flex: 30,
            // 크기
            height: '100%',
            width: '100%',
        },

        backwardButton: {
            // 크기
            width: '108%',
            height: '80%',
            maxWidth: '172px',
            maxHeight: '32px',
            // 배치
            position: 'absolute',
            marginLeft: '2.552%',
            /* 이미지 */
            backgroundImage: 'url("/assets/image/backward_button.png")',
            backgroundSize: 'contain', 
            backgroundPosition: 'center', /* 이미지를 가운데 배치 */
            backgroundRepeat: 'no-repeat', /* 이미지가 반복되지 않도록 설정 */
        },

        empty2:{
            flex: 166,
            width:'100%',
            height: '100%',
        },

        codeText: {
            // 글씨 
            fontFamily: 'Departure Mono, monospace',
            fontSize: `50.01px`,
            fontWeight: 'normal',
            // 간격
            flex: 42,
            // 크기
            width: '100%',
            height: '100%',
        },

        descriptionText: {
            // 간격
            flex: 308,
            // 크기
            width: '100%',
            height: '100%',
            // 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            //
            flexDirection: 'column',
        },

        innerT1:{
            flex: 111,
            // 글씨 
            fontFamily: 'Galmuri14, sans-serif',
            fontSize: '40px',
            fontWeight: 'normal',
            
            // 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',

            //

    
        },

        innerT2: {
            flex: 207,
            // 글씨 
            fontFamily: 'Galmuri14, sans-serif',
            fontSize: '40px',
            fontWeight: 'normal',
            
            // 
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            whiteSpace: 'pre-line'
        },

        buttonContainer: {
            width: '100%',
            height: '100%',
            flex: 274,  
            display:'flex',
            justifyContent: 'center',
        },

        interpreterButton: {
            // 크기
            width: '329.41px',
            height: '63.8px',
            // 간격
            bottom: '201.19px',
            /* 이미지 */
            backgroundImage: 'url("/assets/image/decision_button.png")',
            backgroundSize: 'contain', 
            backgroundPosition: 'center', /* 이미지를 가운데 배치 */
            backgroundRepeat: 'no-repeat', /* 이미지가 반복되지 않도록 설정 */
            // 테두리
            borderWidth: '0px',
            //
            position: 'absolute',

        },

    };

    // 뒤로가기 버튼 함수(실행할 것들)
    const backwardProcess = () => {
        dispatch(codePage());
    }
    // 메시지 결정 시 서버와 통신
    const handleFileUpload = async () => {
        if((photoDataState.split("//////")).slice(1).join("\n") == "false" || (photoDataState.split("//////")).slice(1).join("\n") == false ){
            alert("목록에 없는 메시지입니다.");
            
            return null;
        }

        // base64로 인코딩된 이미지의 접두사 제거
        const base64Data = base64Img.replace(/^data:image\/[a-z]+;base64,/, "");

        const content = {
            file: base64Data,  // 접두사 제거된 base64 데이터
            number: (photoDataState.split("//////"))[0]  // 추가 폼 데이터
        };

        console.log("요청본문");
        console.log(content);
    
        try {
            const response = await fetch("http://localhost:8000/process-image/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",  // JSON 형식으로 전송
                },
                body: JSON.stringify(content),
            });
    
            if (response.ok) {
                const result = await response.json();
                dispatch(setProcessedImage(result.output_image));
                console.log("요청 성공:", result.output_image);



                dispatch(printPage());
            } else {
                console.error("요청 실패:", response.statusText);
            }
        } catch (error) {
            console.error("에러 발생:", error);
        }
    };
    
    const buttonOnMouseDown = () => {
        setButtonState(1);
    };
    const buttonOnMouseUp = () => {
        setButtonState(0);
        handleFileUpload().then(()=>{
            dispatch(printPage());
        });
    };
    
    return (
        <div style={style.codePage} >
            <div style={style.empty1}></div>
            <div style={style.backwardContainer}>
                <div style={style.backwardButton} id="code-page-back-button" onClick={backwardProcess}></div>
            </div>
            <div style={style.empty2}></div>
            <div style={style.codeText}>{(photoDataState.split("//////"))[0]}</div>
            <div style={style.descriptionText}>
                <div style={style.innerT1}>
                    {/* {((photoDataState.split("//////")).slice(1).join(""))} */}
                    {((photoDataState.split("//////")).slice(1).join("")).split("@@")[0]}
                </div>
                <div id="hihi" style={style.innerT2}>
                    {((((photoDataState.split("//////")).slice(1).join("")).split("@@")[1]).split("##"))[0]}
                    {"\n"}
                    {((((photoDataState.split("//////")).slice(1).join("")).split("@@")[1]).split("##"))[1]}
                
                </div>
                
            </div>
            <div id="hi" style={style.buttonContainer} onClick={handleFileUpload}>
                {(buttonState == 0) && <InterPageButtonLight onMouseDown={buttonOnMouseDown}/>}
                {(buttonState == 1) && <InterPageButtonDark onMouseUp={buttonOnMouseUp}/>}
            </div>

        </div>
    );
};

export default InterPage;
