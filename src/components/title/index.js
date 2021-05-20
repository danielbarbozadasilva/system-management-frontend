import React from 'react'
import PropTypes from 'prop-types'
import { Box, Typography } from '@material-ui/core'
import styled from 'styled-components'

const Head = ({ title }) => {
  return (
    <Title>
      <Typography variant="subtitle1">{title}</Typography>
    </Title>
  )
}

export default Head

const Title = styled(Box)`
  color: ${({ theme: t }) => t.palette.primary.main};
  font-weight: 500;
  padding: ${({ theme: t }) => t.spacing(2)}px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 16px;
`

Head.propTypes = {
  title: PropTypes.string
}
