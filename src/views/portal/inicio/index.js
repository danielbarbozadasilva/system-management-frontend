import React, { useEffect } from 'react';
import CardItem from "../../../components/card_inicio/card_item";
import Loading from '../../../components/loading';
import styled from 'styled-components';
import { Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../../store/categoria/categoria.action';
import '../../../assets/css/style.css';

const Inicio = () => {

    const dispatch = useDispatch();

    // estou pegando o estado categoria no index
    const categoria = useSelector(state => state.categoria.all);
    const loading = useSelector(state => state.auth.loading);

    useEffect(() => {
        dispatch(getAll());
    }, [dispatch])

    if (loading) {
      return <Loading />
  }

    const Mapearcategorias = (categorias) => categorias.map((item, i) => (
        <Col className="cardsTelaInicial" md="6" xl="4" sm="12" xs="12" key={i}>
            <CardItem item={{ ...item, status: true }} />
        </Col>
    ))

    return (
        <>
            <Boxcategorias>
                {!loading && categoria.length === 0 ? "Não há categorias disponiveis" : Mapearcategorias(categoria)}
            </Boxcategorias>

        </>
    )

}

export default Inicio;


const Boxcategorias = styled(Row)`

`