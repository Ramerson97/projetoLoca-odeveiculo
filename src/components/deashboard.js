import React, { useState, useEffect } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const Dashboard = () => {
  const [locacoes, setLocacoes] = useState([])
  const [pagamentos, setPagamentos] = useState([])
  const [veiculos, setVeiculos] = useState([])

  // Carregar dados do LocalStorage
  useEffect(() => {
    const storedLocacoes = JSON.parse(localStorage.getItem('locacoes')) || []
    const storedPagamentos = JSON.parse(localStorage.getItem('pagamentos')) || []
    const storedVeiculos = JSON.parse(localStorage.getItem('veiculos')) || []

    setLocacoes(storedLocacoes)
    setPagamentos(storedPagamentos)
    setVeiculos(storedVeiculos)
  }, [])

  // Funções para calcular totais e outros dados
  const totalLocacoes = locacoes.length
  const totalPagamentos = pagamentos.length
  const totalVeiculos = veiculos.length

  const locacoesAtivas = locacoes.filter(loc => loc.status === 'Ativa').length
  const locacoesConcluidas = locacoes.filter(loc => loc.status === 'Concluída').length

  const pagamentosPendentes = pagamentos.filter(pgto => pgto.status === 'Pendente').length
  const pagamentosConcluidos = pagamentos.filter(pgto => pgto.status === 'Pago').length

  // Exemplo de gráfico de status das locações
  const data = [
    { name: 'Ativas', value: locacoesAtivas },
    { name: 'Concluídas', value: locacoesConcluidas }
  ]

  const COLORS = ['#0088FE', '#00C49F']

  return (
    <div>
      <h1>Dashboard de Performance</h1>

      <Row className="mb-4">
        <Col sm={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total de Locações</Card.Title>
              <Card.Text>{totalLocacoes}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total de Pagamentos</Card.Title>
              <Card.Text>{totalPagamentos}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total de Veículos</Card.Title>
              <Card.Text>{totalVeiculos}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col sm={6}>
          <h3>Status das Locações</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Col>

        <Col sm={6}>
          <h3>Status dos Pagamentos</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Pendentes', value: pagamentosPendentes },
                  { name: 'Concluídos', value: pagamentosConcluidos }
                ]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Col>
      </Row>

      {/* Você pode adicionar mais gráficos ou tabelas conforme necessário */}
    </div>
  )
}

export default Dashboard
