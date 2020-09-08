import React,{useState, useEffect} from 'react';

import { Form } from '../components/StyledForm';
import { StyledBtn } from '../components/CustomButton';
import { Container_600 } from '../components/Container_600';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../redux/actions/auth';




export const EditCo = ({history}) => {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.userData && state.auth.userData.company)
    const [data, setData] = useState({name:'', location:'', website:''})

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
    
    
     dispatch( updateProfile(data,history,'company'))

  }
  useEffect(() => {
      if(userData){
         
          setData({...data, name: userData?.name,location: userData?.location, website: userData?.website
         })
        
      }
      
  }, [userData])

    return (
     <Container_600>
            <Form noValidate onSubmit={saveChanges}>
        <h2>Update profile</h2>
        
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" value={data.name} onChange={handleDataChange} placeholder='company name'/>
        <label htmlFor="name">Location</label>
        <input type="text" name="location" id="location" value={data.location} onChange={handleDataChange} placeholder='location'/>
  
        <label htmlFor="website">website</label>
        <input type="text" name="website" id="website" value={data.website} onChange={handleDataChange} placeholder='https://watacle.com'/>
       
        <StyledBtn>Save Changes</StyledBtn>
        </Form>
     </Container_600>
    )
}
