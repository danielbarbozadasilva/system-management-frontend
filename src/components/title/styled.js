import { Box } from '@material-ui/core'
import styled from 'styled-components'

export const Title = styled(Box)`
  color: ${({ theme: t }) => t.palette.primary.main};
  font-weight: 500;
  padding: ${({ theme: t }) => t.spacing(2)}px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
`
