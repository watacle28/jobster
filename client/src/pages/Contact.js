import React,{useState} from 'react';
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai';
import {GoLocation} from 'react-icons/go'
import { Form } from '../components/StyledForm';
import { StyledBtn } from '../components/CustomButton';

const StyledContact = styled.div` 
        width: 100%;
        margin-top: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 1px 5px 20px ${props => props.theme.gray};
        padding: 1rem 1rem 5rem 1rem;
        background: linear-gradient(${props=>props.theme.background} 70%, ${props=> props.theme.primaryColor} 30%);
        @media screen and (max-width: 800px){
            flex-direction: column;
            box-shadow: none;
    }

`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    color: ${props=> props.theme.gray};
    @media screen and (max-width: 800px){
        margin-right: 0;
    }
    h2{
        font-weight: 700;
        color: ${props=> props.theme.darkerGray};
        border-bottom: 1px solid  ${props=> props.theme.gray};
      
    }
    ul{
     
       li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        span{
            text-align: left;
            width: 200px;
        }
        svg{
            margin-right: 1rem;
            align-self: flex-start;
            color: ${props=> props.theme.darkerGray}
        }
       }
    }
`

const RightForm = styled.div`
flex: 1;
box-shadow: 1px 5px 20px ${props => props.theme.gray};
display: flex;
flex-direction: column;
button{
    background: ${props=> props.theme.primaryColor};
    border: none;
    &:hover{
        background: ${props=> props.theme.darkerGray};
        color: ${props=> props.theme.primaryColor};
    }
}
form{
    margin-bottom: 0;
   
    h2{
        font-size: 1.5rem;
    }
}
`

export const Contact = () => {
    const [status, setStatus] = useState("")
    const [loading, setLoading] = useState(false)
    const contacts = [
        {icon: <AiOutlinePhone/>, link: '+276800612336'},
        {icon: <AiOutlineMail/>, link: 'sirwatacle@gmail.com'},
        {icon: <GoLocation/>, link: 'Cape Town, ZA'}
    ]

    const submitForm =  (ev)=> {
        ev.preventDefault();
        setLoading(true)
        const form = ev.target;
        const data = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open(form.method, form.action);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = () => {
          if (xhr.readyState !== XMLHttpRequest.DONE) return;
          if (xhr.status === 200) {
            setLoading(false)
            form.reset();
            setStatus("SUCCESS");
            
          } else {
            setLoading(false)
            setStatus("ERROR")

          }
        };
        xhr.send(data);
      }
    

    return (
        <StyledContact>
            <Helmet>
          <title>Contact</title>
          <meta name="description" content='Contact developer page' />
         
        </Helmet>
          <Left>
              <h2>Get In Touch</h2>
              <p>Hello Chum thank you for stopping by, please feel free to get in touch 
              for any queries or if you would like to get in bed with us<span role='img' aria-label='wink'>😉</span></p>
              <ul>
                    {contacts.map((contact,i)=><li>{contact.icon}<span>{contact.link}</span></li>)}
              </ul>
          </Left>
          <RightForm>
          <Form onSubmit = {submitForm} action = 'https://formspree.io/mbjzpwlp' method = 'POST' autoComplete= 'off' >
              <h2>Say Something</h2> 
              <input type="text" placeholder='email'/>
              <input type='text' placeholder='your name'/>
              <textarea name="message" id="" cols="30" rows="10" placeholder='Your message'></textarea>
              
    {status === "SUCCESS" ? <p>Message submitted. Thanks!</p> :<StyledBtn disabled={loading} secondary medium>{loading ? 'Submitting' : 'Submit'}</StyledBtn>}
              {status === "ERROR" && <p>Ooops! There was an error.</p>}
           </Form>
          </RightForm>
        </StyledContact>
    )
}
