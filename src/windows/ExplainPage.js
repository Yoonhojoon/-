import React, { useState, useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { startPage, showWindow, hideWindow, photoPage, codePage, interPage, savePhotoData, setBase64Image, setProcessedImage } from '../redux/action';
import messageInterpret from '../services/messageInterpret';
// 이미지
import { ReactComponent as ExplainPageContent } from '../asset/explainPageContent.svg';
import { ReactComponent as ExplainPageButtonLight } from '../asset/explainPageButtonLight.svg';
import { ReactComponent as ExplainPageButtonDark } from '../asset/explainPageButtonDark.svg';


const ExplainPage = () => {
    // 리액트 훅
    const [buttonState, setButtonState] = useState(0);
    // 리덕스 상태관리
    const dispatch = useDispatch();

    // 뒤로가기 버튼 함수(실행할 것들)
    const backwardProcess = () => {
        dispatch(hideWindow()); 
        dispatch(startPage());
    }

    // 버튼 클릭 시 변화
    const buttonOnMouseDown = () => {
        setButtonState(1);
    }
    const buttonOnMouseUp = async () => {
        dispatch(photoPage());
    }  


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
        
        // 이 아래부터 수정

        empty2:{
            //  위치
            flex: 46,
            // 크기
            height: '100%',
            width: '100%',
        },

        titleLayout: {
            // 위치
            flex: 137,
            // 크기
            height: '100%',
            width: '100%',
        },

        contentLayout: {
            // 위치
            flex: 480,
            // 크기
            height: '100%',
            width: '100%',
        },

        buttonLayout: {
            // 위치
            flex: 127,
            // 크기
            height: '100%',
            width: '100%',
        },

        // 실제 요소
        title: {
            // 크기
            width: '56.298%',
            height: '37.226%',
    

        }


    };


    
    
    return (
        <div style={style.codePage} >
            <div style={style.empty1}></div>
            <div style={style.backwardContainer}>
                <div style={style.backwardButton} id="code-page-back-button" onClick={backwardProcess}></div>
            </div>
            <div style={style.empty2}></div>
            <div style={style.titleLayout}>
                {/* svg */}
                <svg style={style.title} viewBox="0 0 858 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.227093 20.064V16.8768H35.2864V0.940726H41.6608V26.4384H35.2864V20.064H16.1631V26.4384H9.78871V20.064H0.227093ZM9.78871 0.940726H16.1631V4.12793H19.3503V7.31514H22.5375V10.5023H25.7247V13.6896H19.3503V10.5023H16.1631V7.31514H9.78871V10.5023H6.60151V13.6896H0.227093V10.5023H3.4143V7.31514H6.60151V4.12793H9.78871V0.940726ZM16.1631 36V32.8128H19.3503V26.4384H25.7247V32.8128H28.912V36H35.2864V39.1872H25.7247V36H19.3503V39.1872H9.78871V36H16.1631ZM3.4143 39.1872H9.78871V42.3744H3.4143V39.1872ZM35.2864 39.1872H41.6608V42.3744H35.2864V39.1872ZM63.9712 7.31514V10.5023H67.1584V20.064H63.9712V26.4384H57.5968V20.064H54.4096V10.5023H57.5968V7.31514H63.9712ZM57.5968 36V29.6256H63.9712V36H57.5968ZM137.277 23.2512H111.779V20.064H108.592V16.8768H105.405V10.5023H108.592V7.31514H111.779V4.12793H137.277V7.31514H140.464V10.5023H143.651V16.8768H140.464V20.064H137.277V23.2512ZM114.967 10.5023H111.779V16.8768H114.967V20.064H134.09V16.8768H137.277V10.5023H134.09V7.31514H114.967V10.5023ZM146.839 29.6256H127.715V42.3744H121.341V29.6256H102.218V26.4384H146.839V29.6256ZM194.647 42.3744H188.272V0.940726H194.647V42.3744ZM172.336 39.1872H156.4V36H153.213V16.8768H169.149V7.31514H153.213V4.12793H175.523V20.064H159.587V36H169.149V32.8128H175.523V36H172.336V39.1872ZM229.706 20.064H226.519V23.2512H207.396V20.064H204.208V0.940726H229.706V20.064ZM242.455 10.5023H252.016V13.6896H242.455V23.2512H236.08V0.940726H242.455V10.5023ZM223.332 4.12793H210.583V20.064H223.332V4.12793ZM213.77 39.1872H242.455V42.3744H210.583V39.1872H207.396V26.4384H213.77V39.1872ZM296.637 42.3744H290.263V39.1872H255.204V36H290.263V0.940726H296.637V42.3744ZM274.327 26.4384H261.578V23.2512H258.391V20.064H255.204V10.5023H258.391V7.31514H261.578V4.12793H274.327V7.31514H277.514V10.5023H280.701V20.064H277.514V23.2512H274.327V26.4384ZM264.765 10.5023H261.578V20.064H264.765V23.2512H271.14V20.064H274.327V10.5023H271.14V7.31514H264.765V10.5023ZM373.13 42.3744H366.756V0.940726H373.13V42.3744ZM334.884 36H331.697V4.12793H338.071V20.064H347.633V4.12793H354.007V36H350.82V39.1872H334.884V36ZM347.633 23.2512H338.071V36H347.633V23.2512ZM408.19 20.064H405.002V23.2512H385.879V20.064H382.692V0.940726H408.19V20.064ZM424.126 23.2512H417.751V0.940726H424.126V23.2512ZM401.815 4.12793H389.066V20.064H401.815V4.12793ZM385.879 32.8128H417.751V29.6256H385.879V26.4384H424.126V36H392.254V39.1872H424.126V42.3744H389.066V39.1872H385.879V32.8128ZM478.308 39.1872H462.372V36H459.185V4.12793H481.495V20.064H487.87V0.940726H494.244V42.3744H487.87V23.2512H481.495V36H478.308V39.1872ZM503.806 0.940726V42.3744H497.431V0.940726H503.806ZM475.121 7.31514H465.559V36H475.121V7.31514ZM551.614 42.3744H545.239V0.940726H551.614V42.3744ZM529.303 36H526.116V32.8128H519.742V36H516.555V39.1872H510.18V36H513.367V32.8128H516.555V29.6256H519.742V4.12793H526.116V29.6256H529.303V32.8128H532.491V36H535.678V39.1872H529.303V36ZM602.609 42.3744H596.235V0.940726H602.609V42.3744ZM586.673 39.1872H580.299V36H577.112V32.8128H570.737V36H567.55V39.1872H561.175V36H564.363V32.8128H567.55V29.6256H570.737V7.31514H561.175V4.12793H586.673V7.31514H577.112V29.6256H580.299V32.8128H583.486V36H586.673V39.1872ZM659.979 20.064H663.166V23.2512H656.792V20.064H653.604V16.8768H647.23V20.064H644.043V23.2512H637.668V20.064H640.856V16.8768H644.043V13.6896H647.23V7.31514H637.668V4.12793H647.23V0.940726H653.604V4.12793H663.166V7.31514H653.604V13.6896H656.792V16.8768H659.979V20.064ZM675.915 10.5023H685.477V13.6896H675.915V23.2512H669.54V0.940726H675.915V10.5023ZM675.915 39.1872H672.728V42.3744H644.043V39.1872H640.856V26.4384H675.915V39.1872ZM669.54 29.6256H647.23V39.1872H669.54V29.6256ZM707.787 36V39.1872H695.038V36H691.851V32.8128H688.664V10.5023H691.851V7.31514H695.038V4.12793H707.787V7.31514H710.974V10.5023H714.161V13.6896H723.723V0.940726H730.097V42.3744H723.723V29.6256H714.161V32.8128H710.974V36H707.787ZM698.225 36H704.6V32.8128H707.787V10.5023H704.6V7.31514H698.225V10.5023H695.038V32.8128H698.225V36ZM723.723 16.8768H714.161V26.4384H723.723V16.8768ZM768.344 20.064H765.157V0.940726H771.531V10.5023H784.28V0.940726H790.654V20.064H787.467V23.2512H768.344V20.064ZM803.403 10.5023H812.965V13.6896H803.403V23.2512H797.029V0.940726H803.403V10.5023ZM784.28 13.6896H771.531V20.064H784.28V13.6896ZM768.344 29.6256H774.718V26.4384H797.029V29.6256H803.403V39.1872H797.029V42.3744H774.718V39.1872H768.344V29.6256ZM777.906 32.8128H774.718V36H777.906V39.1872H793.842V36H797.029V32.8128H793.842V29.6256H777.906V32.8128ZM819.339 23.2512V20.064H816.152V0.940726H822.526V10.5023H835.275V0.940726H841.65V10.5023H851.211V0.940726H857.586V23.2512H851.211V13.6896H841.65V20.064H838.462V23.2512H819.339ZM835.275 13.6896H822.526V20.064H835.275V13.6896ZM819.339 26.4384H825.714V32.8128H851.211V26.4384H857.586V39.1872H854.399V42.3744H822.526V39.1872H819.339V26.4384ZM851.211 36H825.714V39.1872H851.211V36Z" fill="black"/>
                </svg>

            </div>
            <div style={style.contentLayout}>
                <ExplainPageContent />
            </div>
            <div style={style.buttonLayout}>
                {(buttonState == 0) && <ExplainPageButtonLight onMouseDown={buttonOnMouseDown}/>}
                {(buttonState == 1) && <ExplainPageButtonDark  onMouseUp={buttonOnMouseUp}/>}
            </div>
        </div>
    );
};

export default ExplainPage;
