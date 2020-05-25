import styled from 'styled-components'
import { InputBase } from '@material-ui/core'

export const CustomInputBase = styled(InputBase)`
  background-color: white;
  width: 100%;
  padding: 0 1rem;
  border-radius: 0.5rem;
  height: 2.5rem;
  transition: all 50ms linear;
  &:active {
    transform: scale(1.02);
  }
`
export const SearchWrapper = styled.div`
  width: 50rem;
  display: flex;
  position: relative;
`

export const CustomForm = styled.form`
  width: 100%;
`
