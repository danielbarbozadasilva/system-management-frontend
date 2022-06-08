import React from 'react'
import { useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { getAllProductsWithFilter } from '../../../store/product/product.action'

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
    <Box sx={{ pb: 10 }} className="dataSearchProvider">
      <Box sx={{ pb: 3 }}>
        <Typography>Buscar</Typography>
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
      </Box>
    </Box>
  )
}
export default FilterSearch
