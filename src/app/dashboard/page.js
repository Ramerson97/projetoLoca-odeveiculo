'use client'

import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import Pagina from '@/components/Pagina';

export default function DashboardPage() {
    const [dashboardData, setDashboardData] = useState({
        veiculosDisponiveis: 0,
        veiculosLocados: 0,
        clientesRegistrados: 0,
        totalPagamentos: 0,
        totalLocacoes: 0
    });

    useEffect(() => {
        const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        const pagamentos = JSON.parse(localStorage.getItem('pagamentos')) || [];
        const locacoes = JSON.parse(localStorage.getItem('locacoes')) || [];

        const veiculosDisponiveis = veiculos.filter(veiculo => veiculo.status === 'Disponível').length;
        const veiculosLocados = veiculos.filter(veiculo => veiculo.status === 'Locado').length;
        const totalPagamentos = pagamentos.reduce((acc, pagamento) => acc + pagamento.valorPago, 0);
        const totalLocacoes = locacoes.length;

        setDashboardData({
            veiculosDisponiveis,
            veiculosLocados,
            clientesRegistrados: clientes.length,
            totalPagamentos,
            totalLocacoes
        });
    }, []);

    const { veiculosDisponiveis, veiculosLocados, clientesRegistrados, totalPagamentos, totalLocacoes } = dashboardData;

    return (
        <Pagina titulo="Dashboard">
            <Container>
                <Row>
                    <Col md={6} className="mb-4">
                        <h3>Veículos</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'Disponíveis', value: veiculosDisponiveis },
                                        { name: 'Locados', value: veiculosLocados }
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#82ca9d"
                                    label
                                >
                                    <Cell fill="#4CAF50" />
                                    <Cell fill="#FF5722" />
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Col>

                    <Col md={6} className="mb-4">
                        <h3>Pagamentos</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={[{ name: 'Pagamentos', total: totalPagamentos }]}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Legend />
                                <Bar dataKey="total" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>

                <Row>
                    <Col md={6} className="mb-4">
                        <h3>Locações</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={[{ name: 'Locações', total: totalLocacoes }]}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Legend />
                                <Bar dataKey="total" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Col>

                    <Col md={6} className="mb-4">
                        <h3>Clientes</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'Clientes Registrados', value: clientesRegistrados }
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#82ca9d"
                                    label
                                >
                                    <Cell fill="#4CAF50" />
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>
            </Container>
        </Pagina>
    );
}
