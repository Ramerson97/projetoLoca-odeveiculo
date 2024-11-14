'use client'

import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaTrash } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Pagina from '@/components/Pagina'

export default function AgenteListPage() {
    const [agentes, setAgentes] = useState([])
    const router = useRouter()

    // Carrega os agentes do LocalStorage
    useEffect(() => {
        const agentesLocalStorage = JSON.parse(localStorage.getItem('agentes')) || []
        setAgentes(agentesLocalStorage)
    }, [])

    // Função para excluir um agente
    function excluir(agente) {
        if (window.confirm(`Tem certeza que deseja excluir o agente ${agente.nome}?`)) {
            const novaLista = agentes.filter(item => item.id !== agente.id)
            localStorage.setItem('agentes', JSON.stringify(novaLista))
            setAgentes(novaLista)
            alert('Agente excluído com sucesso!')
        }
    }

    return (
        <Pagina titulo="Lista de Agentes">
            <div className="text-end mb-3">
                <Button href="/agentes/form">Novo Agente</Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Cargo</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Locações</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {agentes.map(agente => (
                        <tr key={agente.id}>
                            <td>{agente.nome}</td>
                            <td>{agente.cargo}</td>
                            <td>{agente.email}</td>
                            <td>{agente.telefone}</td>
                            <td>
                                {agente.locacoes.join(', ')} {/* Mostra as locações associadas */}
                            </td>
                            <td>
                                <Button className="me-2" href={`/agentes/form?id=${agente.id}`}>
                                    <FaPen />
                                </Button>
                                <Button variant="danger" onClick={() => excluir(agente)}>
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    )
}
