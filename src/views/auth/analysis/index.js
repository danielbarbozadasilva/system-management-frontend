import { Container, Row, Col } from 'react-bootstrap'
import { SForm, STextForm } from '../../error/styled'

const Analysis = () => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <SForm>
            <STextForm>Conta criada com sucesso!</STextForm>
            <h5>
              Agora é só aguardar que o administrador liberará seu acesso.
            </h5>
            <h5>Assim que ele autorizar você receberá um e-mail com a confirmação.</h5>
          </SForm>
        </Col>
      </Row>
    </Container>
  )
}
export default Analysis
