
import styled from 'styled-components'

export const StyledBtn = styled.button`
     padding: .2rem 1rem;
     height: 2.2rem;
    position: relative;
    background:  ${props => props.secondary ? `${props.theme.darkerGray}` : 'transparent'};
    color: ${props => props.secondary ? `${props.theme.background}` : `${props.theme.darkerGray}`};
    border: 1px solid ${props =>props.theme.darkerGray};
    font-size: ${props => props.large ? '2rem' : props.medium ? '1.5rem' : '1rem'};
    border-radius: 200px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-weight: 700;
    margin: 1rem auto;
    outline: none;
    transition: all 1s ease;
    z-index: 2;
    letter-spacing: 1.5px;
    
    cursor: pointer;
    @media screen and (max-width: 600px){
      font-size: 1rem;
      
    }
 
    &:hover{
        background: ${props => props.secondary ? 'transparent': props.theme.darkerGray};
        color: ${props => props.secondary ? props.theme.darkerGray : props.theme.primaryColor};
        scale: 1.01;    
        };
    &:disabled{
    opacity: 0.5;
    pointer-events: none;
    }
     & :focus{
          outline: none;
  }
`

