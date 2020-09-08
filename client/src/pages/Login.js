import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import { AuthSideBar } from '../components/AuthSideBar'
import { Form } from '../components/StyledForm'
import { StyledBtn } from '../components/CustomButton'
import { Error } from '../components/Error'
import { login } from '../redux/actions/auth'
import { useDispatch, useSelector } from 'react-redux'


export const StyledContainer = styled.div`
    display: flex;
    box-shadow: 1px 5px 20px ${props => props.theme.gray};
    margin-top: 2rem;
    @media screen and (max-width: 799px){
      flex-wrap: wrap-reverse;
      box-shadow:none;
    }
 
    button{
        width: 100%;
        max-width: 350px;
    }
`
export const Login = ({history}) => {
    const [data, setData] = useState({ email:'', password:''}) 
    const [userType, setUserType] = useState('dev');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch()
    const dbErrors = useSelector(state => state.auth.errors)
    const handleDataChange = e =>{
        const {value,name} = e.target;
        setData({...data, [name]: value})
    
    }

    const loginUser = (e)=>{
        
     e.preventDefault();
     let errs = [];
    
     !data.password && errs.push('password can not be empty')
     !data.email && errs.push(' email can not be empty')
   
     if(errs.length > 0)
        {
         setErrors([...errors, ...errs]) 
        return setTimeout(() => {
              setErrors([])
         }, 3000);
        }
    dispatch(login(data,history,'/',userType))
    setData({email:'', password:''})
    }
   useEffect(() => {
   dbErrors && dbErrors.length > 0 && setErrors([...errors, ...dbErrors])
        setTimeout(() => {
        setErrors([])
    }, 3000);
   }, [dbErrors && dbErrors.length])
    return (
        <StyledContainer>
           <AuthSideBar url='register'/>
           <Form onSubmit={loginUser}>
              <h2>Log in</h2> 
              <div className="account-select">
                        <div onClick={()=>setUserType('dev')} className = {userType == 'dev'? 'active' : ''}>Developer</div>
                        <div onClick={()=>setUserType('company')} className = {userType == 'dev'? '' : 'active'}>Company</div>
                    </div>
                  
                    <input type="email" name='email'value={data.email} onChange={handleDataChange} placeholder='email'/>
                    <input type='password' name='password' value={data.password} onChange={handleDataChange} placeholder='password'/>
                   
                    <StyledBtn type='submit' disabled={errors.length > 0}  secondary medium>Log In</StyledBtn>
                    <Error errors={errors}/>
           </Form>
        </StyledContainer>
    )
}
