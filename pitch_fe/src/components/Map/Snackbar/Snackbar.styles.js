import styled from 'styled-components'
import { Snackbar, IconButton } from '@material-ui/core'

export const CustomSnackbar = styled(Snackbar)`
  && {
    top: 5rem;
    max-width: 20rem;
    width: 100%;
  }
`

export const SnackBarContent = styled.div`
  display: grid;
  grid-template-rows: 2rem auto;
  width: 100%;
  background: #1b1b2f;
  color: white;
  border-radius: 1rem;
  overflow: hidden;
`
export const ButtonWrapper = styled.div`
  padding-right: 5px;
  background-color: #048998;
  display: flex;
  justify-content: end;
`
