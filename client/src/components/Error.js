import React from 'react';
import styled from 'styled-components';

const StyledError = styled.div`
  background-color : ${props => props.theme.gray};
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  p{
      color: rgba(255,0,0,.5);
  }
`

export const Error = ({errors}) => {
    return (
        <>
        {errors.length > 0 && <StyledError>
        {errors.map((err,i) => <p key={i}>{i + 1}. {err}</p>)} 
        </StyledError>}
        </>
    )
}
