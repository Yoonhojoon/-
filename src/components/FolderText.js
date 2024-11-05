import React, { useState } from 'react';

const FolderText = ({ id, style: parentStyle = {} }) => {

    const style = {
        folderText: {
            // 크기
            width: '10%',
            height: '3.518%',
            maxWidth: '192px',
            maxHeight: '38px',
            /* 이미지 */
            backgroundImage: 'url("/assets/image/TO_MY_LOVE.png")',
            backgroundSize: 'contain', 
            backgroundPosition: 'center', /* 이미지를 가운데 배치 */
            backgroundRepeat: 'no-repeat', /* 이미지가 반복되지 않도록 설정 */
            

        }
    }


    return (
        <object id={id} style={{...style.folderText, ...parentStyle }} type="image/svg+xml" data="/assets/image/TO_MY_LOVE.svg" ></object>
    );
};

export default FolderText;
