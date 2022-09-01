import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import { Title } from './styled'

const Head = ({ title, actions: Actions }) => {
  return (
    <Title>
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="subtitle1">
        <Actions />
      </Typography>
    </Title>
  )
}

export default Head

Head.propTypes = {
  title: PropTypes.string
}
