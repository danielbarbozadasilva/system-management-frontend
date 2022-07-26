import { Avatar, CircularProgress } from '@material-ui/core'
import styled from 'styled-components'

export const SignBox = styled.div`
  margin-top: ${({ theme }) => theme.spacing(8)}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const AvatarStyle = styled(Avatar)`
  margin: ${({ theme: t }) => t.spacing(1)}px;
  background-color: ${({ theme: t }) => t.palette.secondary.main};
`

export const FormStyle = styled.div`
  width: 100%;
  margin-top: ${({ theme: t }) => t.spacing(1)};
`

export const Submit = styled.div`
  margin: ${({ theme: t }) => t.spacing(0.5)};
  .buttonSubmit {
    margin: ${({ theme: t }) => t.spacing(3, 0, 2)};
  }
`

export const LoadingSubmit = styled(CircularProgress)`
  color: ${({ theme: t }) => t.palette.primary};
`

export const Sign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100%;
  min-height: 100%;
`
