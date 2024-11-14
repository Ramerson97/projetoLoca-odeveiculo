'use client'

import React, { useEffect, useState } from 'react'

import { Button, Table } from 'react-bootstrap'
import { FaPen, FaTrash } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Pagina from '@/components/Pagina'

export default function ClienteListPage() {
    const [clientes, setClientes] = useState([]);
    const router = useRouter()

    // Carrega os clientes do LocalStorage ao montar o componente
    useEffect(() => {
        const clientesLocalStorage = JSON.parse(localStorage.getItem('clientes')) || []
        setClientes(clientesLocalStorage)
    }, [])

    // Função para excluir um cliente
    function excluir(cliente) {
        if (window.confirm(`Tem certeza que deseja excluir o cliente ${cliente.nome}?`)) {
            const novaLista = clientes.filter(item => item.id !== cliente.id)
            localStorage.setItem('clientes', JSON.stringify(novaLista))
            setClientes(novaLista)
            alert('Cliente excluído com sucesso!')
        }
    }

    return (
        <Pagina titulo="Lista de Clientes">
            <div className="text-end mb-3">
                <Button href="/clientes/form">Novo Cliente</Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Endereço</th>
                        <th>Telefone</th>
                        <th>E-mail</th>
                        <th>CPF</th>
                        <th>Carteira de Motorista</th>
                        <th>Data de Nascimento</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.nome}</td>
                            <td>{cliente.endereco}</td>
                            <td>{cliente.telefone}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.cpf}</td>
                            <td>{cliente.carteiraMotorista}</td>
                            <td>{cliente.dataNascimento}</td>
                            <td>
                                <Button className="me-2" href={`/clientes/form?id=${cliente.id}`}>
                                    <FaPen />
                                </Button>
                                <Button variant="danger" onClick={() => excluir(cliente)}>
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
