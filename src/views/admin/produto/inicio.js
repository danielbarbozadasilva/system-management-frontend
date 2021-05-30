import { toastr } from 'react-redux-toastr'
import Produto from '~/components/produto'

const Inicio = () => {
  function message () {
    toastr.info('The title', 'The message')
  }

  return (
    <>
      <Produto />
      <button onClick={message}>Abrir</button>
    </>
  )
}

export default Inicio
