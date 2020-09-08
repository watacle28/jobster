import styled from 'styled-components'

export const Container_600 = styled.div`    
   max-width: 600px;
 
 margin: 60px auto;
 box-shadow: 1px 5px 20px ${props => props.theme.gray};
 @media screen and (max-width: 600px){
        box-shadow: none;
        margin-top: 1rem;
      }
`