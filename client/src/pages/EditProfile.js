import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet'
import { Form } from '../components/StyledForm';
import { StyledBtn } from '../components/CustomButton';
import { Container_600 } from '../components/Container_600';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../redux/actions/auth';

const Label = styled.label`
  
`
const StyledUpload = styled.div` 
width: 100%;  
margin-top: 0; 
   .file-chooser-button {
    width: 100%;
    max-width: 350px;
   
}

    
.file-input {
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}
`

export const EditProfile = ({history}) => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.userData && state.auth.userData.dev)
    const [resume, setResume] = useState('');
    const [data, setData] = useState({fullname:'', location:'', stack:'', website:'', github:'', bio:''})

    const handleDataChange = (e)=>{
        const {name, value} = e.target;
        setData({...data, [name]: value})
    }

    const hasChanged =(field)=>{
        if(field != userData[field]) {
            return true
        }
        else return false
    }
  const saveChanges = (e)=>{
      e.preventDefault();
      let formdata = new FormData();
      const {fullname,location,stack,website,github,bio} = data;
                     formdata.append('resume',resume);
     hasChanged(fullname) && formdata.append('fullname', fullname)
     hasChanged(bio) && formdata.append('bio', bio)
     hasChanged(stack) && formdata.append('stack', stack)
    hasChanged(website) &&  formdata.append('website', website)
     hasChanged(location) && formdata.append('location', location)
     hasChanged(github) && formdata.append('github',github)
    
     dispatch( updateProfile(formdata,history,'dev'))

  }
  useEffect(() => {
      if(userData){
         
          setData({...data,github: userData?.github, fullname: userData?.fullname,location: userData?.location, website: userData?.website, stack:  userData?.stack.toString()
         })
         setResume(userData?.resume)
      }
      
  }, [userData])

    return (
     <Container_600>
         <Helmet>
    <title>{`Edit` | data.fullname}</title>
          <meta name="description" content={`${data.fullname}'s profile`} />
         
        </Helmet>
            <Form noValidate onSubmit={saveChanges}>
        <h2>Update profile</h2>
        <label htmlFor="file">Resume (pdf)</label>
        <StyledUpload>
        <StyledBtn secondary className="file-chooser-button" type="button">
         {userData?.resume ? 'change your resume' : 'browse'}
                <input
                    className="file-input"
                    type="file" name="file"
                    accept='application/pdf'
                   value=''
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            
                            console.log(e.target.files[0]);
                            setResume(e.target.files[0])
                               
                        }
                    }} />
            </StyledBtn>
        </StyledUpload>
        <Label htmlFor="name">Fullname</Label>
        <input type="text" name="fullname" id="name" value={data.fullname} onChange={handleDataChange} placeholder='fullname'/>
        <Label htmlFor="name">Location</Label>
        <input type="text" name="location" id="location" value={data.location} onChange={handleDataChange} placeholder='location'/>
        <Label htmlFor="stack">stack (comma separated)</Label>
        <input type="text" name="stack" id="stack" value={data.stack} onChange={handleDataChange} placeholder='React, Vue, HTML'/>
        <Label htmlFor="website">website</Label>
        <input type="text" name="website" id="website" value={data.website} onChange={handleDataChange} placeholder='https://watacle.com'/>
        <Label htmlFor="github">Github</Label>
        <input type="text" name="github" id="github" value={data.github} onChange={handleDataChange} placeholder='https://github.com/watacle28'/>
        <Label htmlFor="bio">bio</Label>
        <textarea name="bio" id="bio" cols="30" rows="10" value={data.bio} onChange={handleDataChange} placeholder='say something about yourself'></textarea>
        <StyledBtn>Save Changes</StyledBtn>
        </Form>
     </Container_600>
    )
}
