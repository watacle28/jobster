import React from 'react';
import styled from 'styled-components';
import { DevProfile } from '../components/DevProfile';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllDevs } from '../redux/actions/user';
import { DevView } from '../components/DevView';

const StyledDevs = styled.div`  
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    @media screen and (max-width: 700px){
        margin-bottom: 16vh
    }
   .dev{
       margin: 1rem;
   }
`

export const Devs = () => {
    const devs = useSelector(state => state.user && state.user.devs)
 const dispatch = useDispatch()
    useEffect(() => {
         dispatch(getAllDevs())
    
       
    }, [devs.length])
    return (
        <StyledDevs>
         {devs.map(dev =><div className='dev'><DevView dev={dev}/></div>)}
        </StyledDevs>
    )
}
