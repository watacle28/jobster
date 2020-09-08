import React , { useState } from 'react'
import {useDispatch} from 'react-redux';

import { AuthSideBar } from '../components/AuthSideBar'
import { Form } from '../components/StyledForm'
import { StyledBtn } from '../components/CustomButton'
import { StyledContainer } from './Login'
import { register } from '../redux/actions/auth'
import { Error } from '../components/Error';




export const Register = ({history}) => {
    const [data, setData] = useState({name:'', email:'', password:'', confirm:''}) 
    const [userType, setUserType] = useState('dev');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch()
    const handleDataChange = e =>{
        const {value,name} = e.target;
        setData({...data, [name]: value})
    
    }

     
    

    const registerUser = (e)=>{
        
     e.preventDefault();
     let errs = [];
     !data.name && errs.push('name can not be  empty')
     !data.password && errs.push('password can not be empty')
     !data.email && errs.push(' email can not be empty')
     data.password !== data.confirm && errs.push('passwords do not match')
     if(errs.length > 0)
        {
         setErrors([...errors, ...errs]) 
        return setTimeout(() => {
              setErrors([])
         }, 3000);
        }
    dispatch(register(data,history,'/',userType))
    setData({name:'', email:'', password:'', confirm:''})
    }

    return (
        <div>
          
            <StyledContainer>
             
                <AuthSideBar url='login'/>
                <Form onSubmit={registerUser} noValidate>
                    <h2>Create an Account</h2> 
                    <div className="account-select">
                        <div onClick={()=>setUserType('dev')} className = {userType == 'dev'? 'active' : ''}>Developer</div>
                        <div onClick={()=>setUserType('company')} className = {userType == 'dev'? '' : 'active'}>Company</div>
                    </div>
                    <input type="text" name ='name' value={data.name} onChange={handleDataChange} placeholder={userType =='dev'? 'fullname': 'company name'}/>
                    <input type="email" name='email'value={data.email} onChange={handleDataChange} placeholder='email'/>
                    <input type='password' name='password' value={data.password} onChange={handleDataChange} placeholder='password'/>
                    <input type='password' name = 'confirm' value={data.confirm} onChange={handleDataChange} placeholder='confirm password'/>
                    <StyledBtn type='submit' disabled={errors.length > 0}  secondary medium>Register</StyledBtn>
                    <Error errors={errors}/>
                </Form>
            </StyledContainer>
        </div>
    )
}
