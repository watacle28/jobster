import React,{useState} from 'react';
import styled from 'styled-components';
import svg from './bg-header-desktop.svg'
import { Nav } from '../components/Nav';
import { Motto } from '../components/Motto';
import { IsDev } from '../components/IsDev';
import { DevProfile } from '../components/DevProfile';
import { IsCompany } from '../components/IsCompany';
import { CompanyProfile } from '../components/CompanyProfile';
const StyledHeader = styled.header`
    position: relative;
    height: 12vh;
    
    width: 100%;
    z-index: 20;
    color: white;
    /* background-image: url(${svg}); */
    background-color: #5ba4a4;
    padding: 1rem;
    @media screen and (max-width: 374px){
      height: 16vh;
      padding: .5rem;
      padding-top: 1rem;
      font-size: 1rem;
    }
 
    .profiles{
        @media screen and (max-width: 600px){
            display: none;
        }
    }
`
export const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    
    return (
        <StyledHeader>
            <Nav setIsOpen={setIsOpen} open={isOpen}/>
          <div className="profiles">
          <IsDev>
                <DevProfile open={isOpen}/>
            </IsDev>
            <IsCompany>
                <CompanyProfile open={isOpen}/> 
            </IsCompany>
          </div>
            <Motto/>
        </StyledHeader>
    )
}
