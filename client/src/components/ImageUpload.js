import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import { setAuthToken } from '../utils/setAtuthToken';
import { useDispatch } from 'react-redux';
import { loadUserData } from '../redux/actions/auth';
import { FaCheckCircle } from 'react-icons/fa';


const StyledUploader = styled.div`  
  
    display: flex;
   
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;


.image-preview-box { 
    width:120px;
    height: 120px;
   display: flex;
   align-items: center;
   justify-content: center;
    position: relative;
   padding: .5rem;
        img{
            width:100%;
            height: 100%;
            border-radius: 50%;
            
        }
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
}

.image-preview-box span {
    padding: 1rem;
}

.image-preview-box img {
    object-fit: cover;
    height: 100%;
    width: 100%;
}

.form {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    position: relative;
}

.form > * {
    margin: 0.5em auto;
}

.file-chooser-button {
    
    border: 1px solid teal;
    padding: 0.6em 2em;
    position: relative;
    color: teal;
    background: none;
}

.file-input {
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}

.upload-button {
    background: teal;
    border: 1px solid teal;
    color: #fff;
    padding: 0.6em 2em;
    &:disabled{
        opacity: .5
    }
}
.success-msg{
    background-color:rgba(0,0,0,.1);
    color: teal;
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius:50%;
    span{
        color: teal;
    }
    svg{
        width: 5rem;
    }
}
.progress-bar-container > * {
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
    right:0;
    bottom:0;
   
}
`

const acceptedTypes = [
    'image/png',
    'image/jpg',
    'image/jpeg',
];


export const ImageUpload = ({avatar, user}) => {
    const dispatch = useDispatch()
    const [file, setFile] = useState();
    const [uploadProgress, updateUploadProgress] = useState(0);
    const [imageURI, setImageURI] = useState(avatar);
    const [uploading, setUploading] = useState(false);

    const UPLOAD_API_URL = `/api/${user}/upload`;
    const token = localStorage.getItem('token');
   

    const isValidFileType = (fileType)=> {
        return acceptedTypes.includes(fileType);
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        
        if (!isValidFileType(file.type)) {
            alert('Only images are allowed (png or jpg)');
            return;
        }
        
       
        const formData = new FormData();
        formData.append('avatar', file);

       try {
           setAuthToken(token)
          const res = await axios({
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: formData,
            url: UPLOAD_API_URL,
            onUploadProgress: (e) => {
                console.log({e});
                const progress = e.loaded / e.total * 100;
                setUploading(true);
                updateUploadProgress(Math.round(progress));
            },
        })
      
           console.log(res.data);
       
          user == 'company' && localStorage.setItem('token',res.data.token)
            setUploading(false);
            dispatch(loadUserData())
            setTimeout(() => {
               updateUploadProgress(0)
           }, 3000);
           
     
       } catch (error) {
          return alert(error?.message)
       }
    };
    return (
        <StyledUploader>
       
        <div className="image-preview-box"> 
        <img src={imageURI} alt="preview" />
            <div className="progress-bar-container">
            
                 
      
         {(uploading)
            ?   <CircularProgressbar
                    value={uploadProgress}
                    text={`${uploadProgress}%`}
                    styles={buildStyles({
                        textSize: '16px',
                        pathColor: 'hsl(180, 14%, 20%)',
                      textColor : 'white'
                    })}
                />  : uploadProgress == 100 ?  
                    <div className="success-msg"><FaCheckCircle/><span>Image updated!!!</span></div>
               : null
            }
      

            </div>
        </div>
          

        <form onSubmit={handleFileUpload} className="form">
           {!uploading &&  <button className="file-chooser-button" type="button">
               {file ? 'Pick Different Image': 'Change Profile Pic'}
                <input
                    className="file-input"
                    type="file" name="file"
                    accept={acceptedTypes.toString()}
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            setFile(e.target.files[0])
                            setImageURI(URL.createObjectURL(e.target.files[0]))
                               
                        }
                    }} />
            </button>}
            <button disabled ={!file || uploading} className="upload-button" type="submit">
                Upload
            </button>
        </form>
        
      

    </StyledUploader>
);
    }