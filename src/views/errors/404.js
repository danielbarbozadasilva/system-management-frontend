
import ReactSwal from '../../plugins/alert';


const Error404 = () => {

    ReactSwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'A página não foi encontrada!',
    })

      return (
        null
      )


}

export default Error404;

