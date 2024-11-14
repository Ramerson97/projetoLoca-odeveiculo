'use client'

import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Col, Card } from 'react-bootstrap'
import { FaCar, FaUsers, FaFileInvoiceDollar } from 'react-icons/fa'
import Pagina from '@/components/Pagina'

export default function HomePage() {
    const [dashboardData, setDashboardData] = useState({
        veiculosDisponiveis: 0,
        clientesRegistrados: 0,
        totalLocacoes: 0
    });

    useEffect(() => {
        const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        const locacoes = JSON.parse(localStorage.getItem('locacoes')) || [];

        setDashboardData({
            veiculosDisponiveis: veiculos.filter(veiculo => veiculo.status === 'Disponível').length,
            clientesRegistrados: clientes.length,
            totalLocacoes: locacoes.length
        });
    }, []);

    const { veiculosDisponiveis, clientesRegistrados, totalLocacoes } = dashboardData;

    return (
        <Pagina titulo="Bem-vindo à Locadora">
            <Container>
                {/* Hero Section */}
                <Row className="text-center my-5">
                    <Col>
                        <h1>Encontre o Veículo Perfeito para Sua Jornada</h1>
                        <p>Carros de todos os tipos, com a melhor qualidade e preço justo.</p>
                        <Button href="/veiculos" variant="primary" size="lg">Ver Veículos</Button>
                    </Col>
                </Row>

                {/* Estatísticas Principais */}
                <Row className="text-center mb-5">
                    <Col md={4}>
                        <Card className="text-white bg-primary mb-3">
                            <Card.Body>
                                <FaCar size={40} />
                                <h4>Veículos Disponíveis</h4>
                                <p>{veiculosDisponiveis}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="text-white bg-success mb-3">
                            <Card.Body>
                                <FaUsers size={40} />
                                <h4>Clientes Registrados</h4>
                                <p>{clientesRegistrados}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="text-white bg-warning mb-3">
                            <Card.Body>
                                <FaFileInvoiceDollar size={40} />
                                <h4>Locações Realizadas</h4>
                                <p>{totalLocacoes}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Chamada para Ação */}
                <Row className="text-center mb-5">
                    <Col>
                        <Button href="/veiculos" variant="outline-dark" size="lg">Reserve Agora</Button>
                    </Col>
                </Row>

                {/* Depoimentos ou Avaliações */}
                <Row className="text-center mb-5">
                    <Col>
                        <h3>Avaliações de Clientes</h3>
                        <p>"Excelente serviço! O carro estava em perfeitas condições!" - João</p>
                        <p>"A locadora é confiável e os preços são justos." - Maria</p>
                    </Col>
                </Row>
            </Container>
        </Pagina>
    );
}
