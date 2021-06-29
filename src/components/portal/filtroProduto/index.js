import Autocomplete from '@material-ui/lab/Autocomplete'
import { TextField } from '@material-ui/core'

const FiltroProduto = () => {
  return (
    <div>
      <Autocomplete
        id="combo-box-demo"
        // options={sadads}
        getOptionLabel={(option) => option.title}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Combo box" variant="outlined" />
        )}
      />
    </div>
  )
}

export default FiltroProduto
