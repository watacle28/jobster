
import styled from 'styled-components'

export const Form = styled.form` 
    margin: auto;
    width: 100%;
    max-width: 600px;
    padding: 2rem;
    flex: 1; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props =>props.theme.background};
    margin-bottom: 2rem; 
    @media screen and (max-width: 799px){
      margin-bottom:0;
      padding-bottom:0;
    }
 
    @media screen and (max-width: 700px){
      margin-bottom: 16vh;
    }
    @media screen and (max-width: 600px){
      padding: .5rem;
    }
   
 
    h2{
        color: ${props=>props.theme.primaryColor};
        font-weight: 700;
        margin-bottom: 1.5rem;
        font-size: 2.2rem;
        transition: all .5s .2s;
        border-bottom: 1px solid  ${props=> props.theme.gray};
        padding-bottom: .5rem;
        @media screen and (max-width: 376px){
         font-size: 1.5rem;
    }
 
    }
    .account-select{
        display: flex;
        justify-content:center;
        align-items: center;
        border: 1px solid ${props => props.theme.gray};
        border-radius: 200px;
        width: 100%;
        max-width: 350px;
        height: 2.2rem;
        margin-bottom: 1rem;

        div{
            padding: 0 2rem;
            cursor: pointer;
            transition: all .3s .2s;
            
            &:hover{
                color: ${props => props.theme.darkerGray};
                
            }
        }
        div:first-of-type{
            border-right: 1px solid ${props => props.theme.gray}
        }
    }
    .active{
        color: ${props => props.theme.darkerGray};
        font-size: 1.2rem;
    }
    label{
        margin-bottom: .5rem;
        text-transform: capitalize;
        color: ${props => props.theme.gray}
    }
    textarea{
        border: 1px solid  ${props=> props.theme.gray};
        border-radius: 10px;
        outline: none;
        padding: 1rem;
        width: 100%;
        max-width: 350px;
        font-family: inherit;
    }
    input{
        background: ${props => props.theme.gray};
        border: none;
        padding: .5rem 1rem;
        color: ${props=>props.theme.background};
        margin: 0 0 1rem 0;
        width: 100%;
        max-width: 350px;
        height: 2.2rem;
        border-radius: 200px;
        outline: none;
        font-size: 1.2rem;
        &::placeholder{
            color: ${props=>props.theme.background};
            opacity: .5;
        }
    }
`


