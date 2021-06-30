// import Autocomplete from '@material-ui/lab/Autocomplete'
// import { TextField } from '@material-ui/core'

// const FiltroProduto = () => {
//   return (
//     <div>
//       <Autocomplete
//         id="combo-box-demo"
//         // options={sadads}
//         getOptionLabel={(option) => option.title}
//         style={{ width: 300 }}
//         renderInput={(params) => (
//           <TextField {...params} label="Combo box" variant="outlined" />
//         )}
//       />
//     </div>
//   )
// }

// export default FiltroProduto

import React, { useEffect, useState } from 'react'
// import Button from '@material-ui/core/Button'
// import Grid from '@material-ui/core/Grid'
// import Typography from '@material-ui/core/Typography'
// import Container from '@material-ui/core/Container'
// import Box from '@material-ui/core/Box'
// import { Link } from '@reach/router'
import { FormControl, Select } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { getAll as allProdutos } from '~/store/produto/produto.action'
import { getAll as allprodutos } from '~/store/produto/produto.action'
import { useDispatch, useSelector } from 'react-redux'
import './style.css'
import {
  FormGroup,
  Label,
  Input,
  Alert,
  Button,
  Spinner,
  FormFeedback,
  Row,
  Container,
  Col
} from 'reactstrap'

function Filtroproduto() {
  const dispatch = useDispatch()
  const produtos = useSelector((state) => state.produto.all)

  return (
    <div>
      <form>
        <FormGroup>
          <Label for="produto">Buscar produto</Label>
          <Input
            className="form-intro"
            type="text"
            name="produto"
            id="produto"
            placeholder="digite o nome do produto"
          />
        </FormGroup>
      </form>
    </div>
  )
}

export default Filtroproduto
