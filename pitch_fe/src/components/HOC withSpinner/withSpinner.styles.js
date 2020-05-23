import styled, { keyframes } from 'styled-components'

const Loading = keyframes`
from{
    transform: rotate(0deg);
}
to{
    transform: rotate(360deg);
}
`

export const WithSpinner = styled.div`
  width: 1rem;
  height: 1rem;
  border-top: 3px solid ${(props) => (props.color ? props.color : 'black')};
  border-right: 3px solid transparent;
  border-bottom: 3px solid ${(props) => (props.color ? props.color : 'black')};
  border-left: 3px solid transparent;
  border-radius: 100%;
  animation ${Loading} 0.8s infinite ease-in-out
`

export const SearchWithSpinnerWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 0.5rem;
`
