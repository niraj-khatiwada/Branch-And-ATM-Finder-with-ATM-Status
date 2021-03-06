import styled from 'styled-components'
import { Typography, Button, Grid, AppBar } from '@material-ui/core'
import { spacing, palette } from '@material-ui/system'

export const SidebarWrapper = styled.div`
  position: absolute;
  top: 5rem;
  right: 1rem;
  max-height: 90vh;
  overflow-y: scroll;
  overflow-x: none;
  max-width: 25rem;
  z-index: 1500;
  background-color: white;
  border-radius: 1rem;
  -webkit-box-shadow: 0px 7px 24px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 7px 24px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 7px 24px 0px rgba(0, 0, 0, 0.75);
`

export const CustomTypography = styled(Typography)`
  display: flex;
  align-items: center;
`

export const CustomButton = styled(Button)`
  width: 10rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  && {
    border-radius: 1rem;
    background-color: #00a8b5;
  }
`

export const CustomGrid = styled(Grid)`
  padding: 0.5rem 1rem;
`

export const CustomAppBar = styled(AppBar)`
  && {
    background-color: #048998;
  }
`

export const CustomBox = styled.div`${spacing}${palette}`
