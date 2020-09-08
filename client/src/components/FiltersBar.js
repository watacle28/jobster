import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { removeFilter, clearFilters } from '../redux/actions/jobs';

const StyledFilters = styled.div`
    width: 100%;
    padding: 1rem;
    box-shadow: 1px 5px 20px ${props => props.theme.gray};
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    .filters{
        display: flex;
        flex-wrap: wrap;
    }
    .filter{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-right: .5rem;
        align-items: center;
        background-color: ${props=>props.theme.background};
        transition: all .5s ease;
       &:hover{
            scale: 1.1;
       }
    }
    .filter-text{
         padding: .3rem 1rem;
        
    }
   .btn{
        display: flex;
        justify-content:center;
         align-items: center;
         background-color: ${props =>props.theme.primaryColor};
         color: ${props =>props.theme.background};
         padding: .3rem;
         margin-left: .3rem;
         cursor: pointer;
         transition: all .5s ease;
         &:hover{
            background-color: ${props =>props.theme.darkerGray};
            scale: 1.05;
         }
   }
   .clear-btn {
       cursor: pointer;
       &:hover{
           border-bottom: 1px solid ${props =>props.theme.primaryColor};
       }
   }
`

export const FiltersBar = ({filters}) => {
    const dispatch = useDispatch()
    return (
        <StyledFilters>
            <div className="filters">
                {filters.map((filter,i)=> <div key={i} className='filter'><span className='filter-text'>{filter}</span>
                
                <span onClick={()=>dispatch(removeFilter(filter))} className='btn'><FaTimes/></span></div>)}
            </div>
            <div onClick={()=>dispatch(clearFilters())} className="clear-btn">clear</div>
        </StyledFilters>
    )
}
