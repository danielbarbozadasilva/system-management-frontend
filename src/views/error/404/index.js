import { Container, Row, Col } from 'react-bootstrap'
import { SForm, STextForm } from '../styled'

const Error404 = () => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <SForm>
            <STextForm>Erro 404</STextForm>
            <h5>Esta página não pode ser encontrada.</h5>
          </SForm>
        </Col>
      </Row>
    </Container>
  )
}
export default Error404