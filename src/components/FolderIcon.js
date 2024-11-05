import React, { useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { showWindow, hideWindow } from '../redux/action';

const FolderIcon = ({ id, style: parentStyle = {}, onClick:onClickFunc=()=>{} }) => {

    const style = {
        folder: {
            // 크기
            width: '7.604%',
            height: '11.342%',
            maxWidth: '146px',
            maxHeight: '122.5px',
        },
        
        folderImg: {
            width: '100%',
            height: '100%',
        }
    }

    return (
        <div style={{...style.folder, ...parentStyle}} onClick={()=>onClickFunc()}>
            <object type="image/svg+xml" data="/assets/image/folder.svg" 
                id={id} 
                className="folder-icon"    
                style={style.folderImg}
            > </object>
        </div>
    );
};

export default FolderIcon;
