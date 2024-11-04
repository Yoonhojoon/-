import React, { useEffect, useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { showWindow, hideWindow, photoPage, codePage, savePhotoData, setBase64Image } from '../redux/action';
import messageInterpret from '../services/messageInterpret';
// 컴포넌트
import WebcamView from '../components/WebcamView';
// 이미지
import { ReactComponent as PhotoPageTitle } from '../asset/photoPageTitle.svg';
import { ReactComponent as PhotoPageButtonLight } from '../asset/photoPageButtonLight.svg';
import { ReactComponent as PhotoPageButtonDark } from '../asset/photoPageButtonDark.svg';
import { ReactComponent as PhotoPageText1 } from '../asset/photoPageText1.svg';
import { ReactComponent as PhotoPageText2 } from '../asset/photoPageText2.svg';
import { ReactComponent as PhotoPageText3 } from '../asset/photoPageText3.svg';
import { ReactComponent as PhotoPageCheck } from '../asset/photoPageCheck.svg';

const PhotoPage = () => {

    // 로컬 상태
    const [capturedImage, setCapturedImage] = useState(null); 
    const [buttonState, setButtonState] = useState(0);
    // 리덕스 상태관리
    const photoDataState = useSelector((state) => state.photoData.photoData);
    const changePageState = useSelector((state) => state.changePage.changePage);
    const dispatch = useDispatch();

    // 사진 캡처 함수
    const capturePhoto = () => {
        const video = document.getElementById('photopage_webcamview');
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // 캡처한 사진을 새로운 이미지로 보여주거나, 저장 등 다른 처리를 할 수 있습니다.
        const imgUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(imgUrl); // 캡처된 이미지를 상태에 저장
        dispatch(setBase64Image(imgUrl));
    };

        // 버튼 클릭 시 변화
    const buttonOnMouseDown = () => {
        setButtonState(1);
    }
    const buttonOnMouseUp = () => {
        let count = 0;
        setButtonState(0);
        setButtonState(2+count);
        const interv = setInterval(()=>{
            
            if(count === 3){
                clearInterval(interv);
                dispatch(codePage());
            }
            setButtonState(3+count);
            if(count === 2){
                capturePhoto();
            }
            count += 1;
        }, 1500);
        
        dispatch(photoPage());
    }  
    
    const style = {
        photoPage: {
            // 크기
            width: '100%',
            // 위치
            flex: 1540,
            // 내부 배치
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // 
            position: 'relative',
        },

        empty1:{
            // 크기
            width: '100%',
            flex: 71,
        },

        photoPageTitleLayout: {
            // 
            flex: 115,
            width: '100%',
        },

        middleContainer: {
            // 크기
            flex: 440,
            width: '150%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            //
            position: 'relative',
        },

        captureImgContainer: {
            // 크기
            width: '40%',
            height: '100%',
            maxWidth: 443,
            maxHeight: 440,
            // 내부
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative',
            
        },

        captureImg: {
            objectFit: 'contain',
            transform: 0.5, 
            width: '140%',
            height: '100%',
            // position: 'absolute', // 추가
            // flex: '441.04',
            // backgroundColor: 'red'
        },

        bottomContainer: {
            //
            width: '100%',
            height: '100%',
            flex: 237,
            // 내부
            display: 'flex',
            flexDirection:'row',
            alignItems: 'flex-start',
            justifyContent:'center',
            
        },

        // 실제 요소
        bottomButton: {
            marginTop: '3.766%',
        },

        bottomCountdown: {
            marginTop: '1.688%',
        },

        bottomCheck: {
            marginTop: '3.896%'
        }


        
    };




    return (
        <div style={style.photoPage} id="photoPage">
            <div style={style.empty1}></div>
            <div id="photopage-title" style={style.photoPageTitleLayout}>
                <PhotoPageTitle/>
            </div>
            <div id="middleContainer" style={style.middleContainer}>
                {capturedImage && 
                    <div style={style.captureImgContainer}>
                        <img style={style.captureImg} src={capturedImage} alt="Captured" />
                    </div>    
                }   
                {!capturedImage &&<WebcamView id='photopage_webcamview' width='26.769%' height='100%' flex='441.04' scale="1" style={{maxHeight: 440, maxWidth: 440}}/>}
            </div>
            <div style={style.bottomContainer}>
                {(buttonState == 0) && <PhotoPageButtonLight style={style.bottomButton} onMouseDown={buttonOnMouseDown}/>}
                {(buttonState == 1) && <PhotoPageButtonDark style={style.bottomButton} onMouseUp={buttonOnMouseUp}/>}
                {(buttonState == 2) && <PhotoPageText1 style={style.bottomCountdown}/>}
                {(buttonState == 3) && <PhotoPageText2 style={style.bottomCountdown}/>}
                {(buttonState == 4) && <PhotoPageText3 style={style.bottomCountdown}/>}
                {(buttonState == 5) && <PhotoPageCheck style={style.bottomCheck}/>}
            </div>
        </div>
    );
};

export default PhotoPage;
