import styled from 'styled-components'
import { InputBase, Typography, Button, Toolbar } from '@material-ui/core'

export const SearchWrapper = styled.div`
  width: 50rem;
  display: flex;
  position: relative;
`

export const CustomInputBase = styled(InputBase)`
  background-color: white;
  width: 100%;
  padding: 0 1rem;
  border-radius: 0.5rem;
  height: 3rem;
  transition: all 50ms linear;
  &:active {
    transform: scale(1.02);
  }
`

export const SidebarWrapper = styled.div`
  position: absolute;
  top: 5rem;
  right: 1rem;
  max-height: 90vh;
  overflow-y: scroll;
  overflow-x: none;
  max-width: 20vw;
  z-index: 1500;
  background-color: white;
  border-radius: 1rem;
  -webkit-box-shadow: 0px 7px 24px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 7px 24px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 7px 24px 0px rgba(0, 0, 0, 0.75);
`

export const CustomForm = styled.form`
  width: 100%;
`
export const CustomTypography = styled(Typography)`
  display: flex;
  align-items: center;
`

export const CustomButton = styled(Button)`
  width: 10rem;
  height: 3rem;
  display: flex;
  justify-content: center;
`

export const CustomToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`
