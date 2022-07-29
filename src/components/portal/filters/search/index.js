import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { getAllProductsWithFilter } from '../../../../store/product/product.action'
import { STitle, SBox } from './styled'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  }
}))

const FilterSearch = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const handleChange = async (props) => {
    const { value, name } = props.target
    dispatch(getAllProductsWithFilter(value || ' ', name))
  }

  return (
    <SBox>
      <STitle>Buscar</STitle>
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Digite o produto"
          onChange={handleChange}
          inputProps={{
            name: 'nameFilter'
          }}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </SBox>
  )
}
export default FilterSearch
