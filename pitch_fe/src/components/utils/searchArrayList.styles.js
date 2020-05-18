import styled from 'styled-components'
import ListItem from '@material-ui/core/ListItem'

export const CustomListItem = styled(ListItem)`
  &:hover {
    ${(props) => {
      if (!props.issinglestate) {
        return 'background-color:red'
      }
    }};
  }
`
