import { Container, Row, Col } from 'react-bootstrap'
import { SForm, STextForm } from '../styled'

const Error500 = () => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <SForm>
            <STextForm>Erro 500</STextForm>
            <h5>Ocorreu um erro no servidor interno.</h5>
            <br />
            <h5>Por favor tente mais tarde!</h5>
          </SForm>
        </Col>
      </Row>
    </Container>
  )
}
export default Error500