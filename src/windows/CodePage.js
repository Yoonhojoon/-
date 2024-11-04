import React, { useState, useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { showWindow, hideWindow, photoPage, codePage, interPage, savePhotoData, setBase64Image, setProcessedImage } from '../redux/action';
import messageInterpret from '../services/messageInterpret';
// 이미지
import { ReactComponent as CodePageTitle } from '../asset/codePageTitle.svg';
import { ReactComponent as CodePageButtonLight } from '../asset/codePageButtonLight.svg';
import { ReactComponent as CodePageButtonDark } from '../asset/codePageButtonDark.svg';

const CodePage = () => {

    // 리덕스 상태관리
    const photoDataState = useSelector((state) => state.photoData.photoData);
    const dispatch = useDispatch();
    // 로컬 상태
    const [buttonState, setButtonState] = useState(0);

    // 초기 설정 -> photoDataSate가 null이 아니면 해당 값으로
    useEffect(() => {
        if(photoDataState !== null){
            const existingCode = photoDataState.split("//////")[0];
            document.getElementById("codeInput").value = existingCode; 
        }
    },[]);

    // 뒤로가기 버튼 함수(실행할 것들)
    const backwardProcess = () => {
        dispatch(photoPage());
        dispatch(savePhotoData(null));
    }
    
    // 사진 데이터 리덕스로 넘기기
    const handlePhotoData = () => {
        // 사진 데이터를 저장
        const elem = document.getElementById("codeInput");
        const data = elem.value;
        if(data == null) {
            console.log("흑흑 사진이 없어요 따흑");
        } else {
            const interprettedMessage = messageInterpret(data);
            console.log(elem, " ",data, " ", interprettedMessage);
            const processData = data + "//////" + interprettedMessage;
            dispatch(savePhotoData(processData));
        }
    };

    const handleInputChange = (e) => {
        console.log(typeof(e.target.value), " ", e.target.value);
        document.getElementById("codeInput").value = e.target.value;
        console.log("흐흐 ", document.getElementById("codeInput").value);
        const data = document.getElementById("codeInput").value;
        const interprettedMessage = messageInterpret(data);
        const processData = data + "//////" + interprettedMessage;
        dispatch(savePhotoData(processData));
    };
    
    // 버튼 클릭 시 동작
    const buttonOnMouseDown = () => {
        setButtonState(1);
    };
    const buttonOnMouseUp = () => {
        handlePhotoData(); 
        console.log("응애", photoDataState);
        console.log(document.getElementById("codeInput").value);
        if((photoDataState == null) || ((photoDataState.split("//////")).slice(1).join("\n") == "false" || (photoDataState.split("//////")).slice(1).join("\n") == false) || document.getElementById("codeInput").value == null || document.getElementById("codeInput").value == ''){
            alert("목록에 없는 메시지입니다.");
            setButtonState(0);
        } else {
            dispatch(interPage()); 
            // handlePhotoData(); 
        }
    };
    


    const style = {
        codePage: {
            // 크기
            width: '100%',
            height:'100%',
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
            height: '100%',
            width: '100%',

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
            //  위치
            flex: 149,
            // 크기
            height: '100%',
            width: '100%',
        },

        codePageTitle: {
            //  위치
            flex: 109,
            // 크기
            // height: '100%',
            // width: '100%',
            // 글씨 
            fontFamily: 'Galmuri14, sans-serif',
            fontSize: '38.27px',
            fontWeight: 'normal',
        },

        codeInputContainer: {
            //  위치
            flex: 236,
            // 크기
            height: '100%',
            width: '100%',
        },

        codeInputArea: {
            // 크기
            width: '49.846%',
            height: '100%',
            maxWidth: '810px',
            maxHeight: '108px',
            // 글씨 
            fontFamily: 'Departure Mono, monospace', /* 폰트 이름 */
            fontSize: '50.01px', /* 폰트 크기 */
            fontWeight: '400', /* Regular 굵기 */
            lineHeight: '0px', /* 줄 간격 */
            letterSpacing: '0px', /* 글자 간격 */
            // 내부 간격
            paddingLeft :'3.95%',
        },

        buttonContainer: {
            flex: 296,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
        },

        interpretButton: {
            // 크기
            display: 'flex',
            justifyContent: 'center',
        },

        
        

    };


    
    
    return (
        <div style={style.codePage} >
            <div style={style.empty1}></div>
            <div style={style.backwardContainer}>
                <div style={style.backwardButton} id="code-page-back-button" onClick={backwardProcess}></div>
            </div>
            <div style={style.empty2}></div>
            <CodePageTitle style={style.codePageTitle}/>
            <div style={style.codeInputContainer}>
                <input id="codeInput" style={style.codeInputArea} onChange={handleInputChange} autocomplete="off"></input>
            </div>
            <div style={style.buttonContainer}>
                {(buttonState == 0) && <CodePageButtonLight style={style.interpretButton} 
                    onMouseDown={buttonOnMouseDown}
                />}
                {(buttonState == 1) && <CodePageButtonDark style={style.interpretButton} 
                    onMouseUp={buttonOnMouseUp}
                />}
            </div>
        </div>
    );
};

export default CodePage;
