import styled from 'styled-components'

export const SmallWrapper = styled.div`
  color: black;
  border-radius: 0.2rem;
  width: 2.5rem;
  background-color: ${(props) =>
    props.type === 'atm' ? '#f96d80' : '#b4f2e1'};
  margin-right: 0.5rem;
  text-align: center;
`
