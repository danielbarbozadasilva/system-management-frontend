import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import './style.css'
import {getAll} from  '../../../store/produto/produto.action'
import {parsedToQuery} from '../../../util/helpers'

const PesquisaProduto = () => {
  const dispatch = useDispatch()

  return (
    <div className="container-fluid">
      <TextField type="text" onChange={(props)=>dispatch(getAll(parsedToQuery(props.target.value)))} />
    </div>
  )
}
export default PesquisaProduto
