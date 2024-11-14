'use client'

import React, { useEffect, useState } from 'react'
import { Button, Card, Row, Col, Container } from 'react-bootstrap'
import { FaPen, FaTrash } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Pagina from '@/components/Pagina'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function VeiculosPage() {
    const [veiculos, setVeiculos] = useState([])
    const router = useRouter()

    useEffect(() => {
        // Busca a lista de veículos do LocalStorage
        const veiculosLocalStorage = JSON.parse(localStorage.getItem('veiculos')) || []
        setVeiculos(veiculosLocalStorage)
    }, [])

    function excluir(veiculo) {
        if (window.confirm(`Tem certeza que deseja excluir o veículo ${veiculo.modelo}?`)) {
            const novaLista = veiculos.filter(item => item.id !== veiculo.id)
            localStorage.setItem('veiculos', JSON.stringify(novaLista))
            setVeiculos(novaLista)
            alert('Veículo excluído com sucesso!')
        }
    }

    return (
        <Pagina titulo="Lista de Veículos">
            <div className='text-end mb-3'>
                <Button href='/veiculos/form'>Novo Veículo</Button>
            </div>

            {/* Container e Grid para um layout responsivo */}
            <Container>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {veiculos.length === 0 ? (
                        <div className="col-12 text-center">
                            <p>Nenhum veículo cadastrado</p>
                        </div>
                    ) : (
                        veiculos.map(veiculo => (
                            <Col key={veiculo.id}>
                                <Card className="shadow-sm rounded">
                                    <Card.Img variant="top" src={veiculo.foto} style={{ height: '200px', objectFit: 'cover' }} />
                                    <Card.Body>
                                        <Card.Title>{veiculo.modelo}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{veiculo.marca}</Card.Subtitle>
                                        <p><strong>Placa:</strong> {veiculo.placa}</p>
                                        <p><strong>Cor:</strong> {veiculo.cor}</p>
                                        <p><strong>Status:</strong> {veiculo.status}</p>

                                        <div className="d-flex justify-content-between">
                                            <Button variant="primary" href={`/veiculos/form?id=${veiculo.id}`}><FaPen /> Editar</Button>
                                            <Button variant="danger" onClick={() => excluir(veiculo)}><FaTrash /> Excluir</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </Pagina>
    )
}
