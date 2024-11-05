import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideWindow, startPage, photoPage, savePhotoData } from '../redux/action';
// 컴포넌트
import ExplainPage from '../windows/ExplainPage';
import PhotoPage from '../windows/PhotoPage';
import CodePage from '../windows/CodePage';
import InterPage from '../windows/InterPage';
import PrintPage from '../windows/PrintPage';


const Window = ({ id, style: parentStyle = {} }) => {
    const style = {
        window: {
            position: 'absolute',
            left: '10.52%',
            top: '9.074%',
            width: '84.635%',
            height: '84.537%',
            maxWidth: '1625px',
            maxHeight: '913px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflow: 'hidden',
        },

        windowForeign: {
            width: '100%',
            height: '100%',
            //
            display:'flex',
            flexDirection: 'column',
            //
            position: 'absolute'
        },

        exitButton: {
            // 배치
            flex: 50,
            // 크기
            width: '100%',
            height: '100%',
        },

        contentContainer: {
            // 배치
            flex: 863,
            // 크기
            width: '100%',
            height: '100%',
            // 
            display: 'flex',
            position: 'relative'
        },
    };

    const changePageState = useSelector((state) => state.changePage.changePage);
    const showWindowState = useSelector((state) => state.showWindow.showWindow);
    const photoDataState = useSelector((state) => state.photoData.photoData);
    const dispatch = useDispatch();

    return (
        <svg
            width="1625"
            height="913"
            viewBox="0 0 1625 913"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ ...style.window, ...parentStyle }}
        >
            {/* 기존의 SVG 구성 */}
            <rect width="1625" height="913" fill="#F3F0F0"/>
            <rect width="1625" height="50" fill="#2D4B94"/>
            <path d="M32.25 17.125V19H34.125V22.75H30.375V19H26.625V32.125H30.375V28.375H34.125V32.125H32.25V34H24.75V32.125H22.875V19H24.75V17.125H32.25ZM45.375 24.625V17.125H49.125V34H45.375V26.5H41.625V34H37.875V17.125H41.625V24.625H45.375ZM56.625 26.5V32.125H64.125V34H52.875V17.125H64.125V19H56.625V24.625H62.25V26.5H56.625ZM77.25 17.125V19H79.125V24.625H77.25V28.375H79.125V34H75.375V28.375H73.5V26.5H71.625V34H67.875V17.125H77.25ZM75.375 19H71.625V24.625H75.375V19ZM86.625 26.5V32.125H94.125V34H82.875V17.125H94.125V19H86.625V24.625H92.25V26.5H86.625ZM101.625 20.875H103.5V22.75H101.625V34H97.875V17.125H101.625V20.875ZM107.25 17.125H111V34H107.25V22.75H105.375V20.875H107.25V17.125ZM103.5 28.375V22.75H105.375V28.375H103.5ZM120.375 19V32.125H122.25V34H114.75V32.125H116.625V19H114.75V17.125H122.25V19H120.375ZM146.625 20.875H148.5V22.75H146.625V34H142.875V17.125H146.625V20.875ZM152.25 17.125H156V34H152.25V22.75H150.375V20.875H152.25V17.125ZM148.5 28.375V22.75H150.375V28.375H148.5ZM161.625 19V17.125H165.375V19H167.25V20.875H169.125V34H165.375V28.375H161.625V34H157.875V20.875H159.75V19H161.625ZM165.375 20.875H161.625V26.5H165.375V20.875ZM176.625 17.125V24.625H178.5V20.875H180.375V17.125H184.125V20.875H182.25V24.625H180.375V26.5H182.25V30.25H184.125V34H180.375V30.25H178.5V26.5H176.625V34H172.875V17.125H176.625ZM191.625 19V17.125H195.375V19H197.25V20.875H199.125V34H195.375V28.375H191.625V34H187.875V20.875H189.75V19H191.625ZM195.375 20.875H191.625V26.5H195.375V20.875Z" fill="white"/>
            <rect x="1581.5" y="9.5" width="31" height="31" fill="url(#paint0_linear_251_22)" stroke="black"/>
            <path d="M1583.5 40V25.5V11.5H1612" stroke="#EAE8E8" stroke-width="3"/>
            <path d="M1604 20.2429H1604.1V20.1429V18V17.9H1604H1602.38H1602.28V18V20.0429H1600.75H1600.65V20.1429V22.1857H1599.12H1599.02V22.2857V24.3286H1595.97V22.2857V22.1857H1595.88H1594.35V20.1429V20.0429H1594.25H1592.73V18V17.9H1592.62H1591H1590.9V18V20.1429V20.2429H1591H1592.52V22.2857V22.3857H1592.62H1594.15V24.4286V24.5286H1594.25H1595.78V26.4714H1594.25H1594.15V26.5714V28.6143H1592.62H1592.52V28.7143V30.7571H1591H1590.9V30.8571V33V33.1H1591H1592.62H1592.73V33V30.9571H1594.25H1594.35V30.8571V28.8143H1595.88H1595.97V28.7143V26.6714H1599.02V28.7143V28.8143H1599.12H1600.65V30.8571V30.9571H1600.75H1602.28V33V33.1H1602.38H1604H1604.1V33V30.8571V30.7571H1604H1602.48V28.7143V28.6143H1602.38H1600.85V26.5714V26.4714H1600.75H1599.22V24.5286H1600.75H1600.85V24.4286V22.3857H1602.38H1602.48V22.2857V20.2429H1604Z" fill="black" stroke="black" stroke-width="0.2"/>
            <defs>
            <linearGradient id="paint0_linear_251_22" x1="1597" y1="9" x2="1633" y2="53" gradientUnits="userSpaceOnUse">
            <stop stop-color="#D9D9D9"/>
            <stop offset="1" stop-color="#737373"/>
            </linearGradient>
            </defs>
            





            {/* HTML 요소 삽입 (foreignObject) */}
            <foreignObject style={{width: '100%', height: '100%'}}>
                <div xmlns="http://www.w3.org/1999/xhtml"  style={{width: '100%', height: '100%'}}>
                    <div style={style.windowForeign}>
                        <div
                            id="exitButton"
                            style={style.exitButton}
                            onClick={() => { dispatch(hideWindow()); dispatch(startPage()); dispatch(savePhotoData(null));  }}
                        >
                        </div>
                        <div id="contentContainer" style={style.contentContainer}>
                            <div id="cont" style={{width: '100%', height: '100%', position: 'absolute', display:'flex'}}>
                                {changePageState === 1 && <ExplainPage />}
                                {changePageState === 2 && <PhotoPage />}
                                {changePageState === 3 && <CodePage />}
                                {changePageState === 4 && <InterPage />}
                                {changePageState === 5 && <PrintPage/>}
                            </div>
                        </div>
                    </div>
                </div>
            </foreignObject>
        </svg>
    );
};

export default Window;
