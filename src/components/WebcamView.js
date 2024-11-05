import React, { useEffect, useRef } from "react";
import { useSelector } from 'react-redux';

const WebcamView = ({ id, width, height, flex, scale, style: externalStyle = {} }) => {
  const style = {
    webcamContainer: { 
      width: width,
      height: height,
      flex: flex,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden', 
      zIndex: 999,
      position: 'relative',
      ...externalStyle,
    },
    webcam: {
      objectFit: 'cover',
      transform: `scale(${scale})`, 
      width: '100%',
      height: '100%',
      position: 'absolute', // 추가
    }
  };

  const videoRef = useRef(null);

  // Redux 상태 가져오기
  const changePage = useSelector(state => state.changePage.changePage);

  useEffect(() => {
    const getWebcamStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("웹캠 접근 실패(브라우저 권한을 확인해보세요): ", err);
      }
    };

    // 상태가 0, 1일 때만 웹캠을 켜고, 아니면 끕니다
    if (changePage === 0 || changePage === 2) {
      getWebcamStream();
    } else {
      // 웹캠 연결 해제
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop()); // 모든 트랙을 중지
        videoRef.current.srcObject = null; // srcObject를 null로 설정하여 연결 해제
      }
    }

    // 컴포넌트가 언마운트될 때 스트림 중지
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, [changePage]); // changePage가 변경될 때마다 실행

  return (
    <div style={style.webcamContainer}>
      <video style={style.webcam} id={id} ref={videoRef} autoPlay />
    </div>
  );
};

export default WebcamView;
