'use client'

import Pagina from '@/components/Pagina'
import React, { useEffect, useState } from 'react'

import { Button, Table } from 'react-bootstrap'
import { FaPen, FaTrash } from 'react-icons/fa'

export default function PagamentosListPage() {
    const [pagamentos, setPagamentos] = useState([])

    useEffect(() => {
        // Busca a lista de pagamentos do localStorage ao carregar a página
        const pagamentosLocalStorage = JSON.parse(localStorage.getItem('pagamentos')) || []
        setPagamentos(pagamentosLocalStorage)
    }, [])

    function excluir(pagamento) {
        if (window.confirm(`Tem certeza que deseja excluir o pagamento de valor ${pagamento.valorPago}?`)) {
            // Filtra os pagamentos para remover o selecionado e salva a nova lista
            const novaLista = pagamentos.filter(item => item.id !== pagamento.id)
            localStorage.setItem('pagamentos', JSON.stringify(novaLista))
            setPagamentos(novaLista)
            alert('Pagamento excluído com sucesso!')
        }
    }

    return (
        <Pagina titulo="Lista de Pagamentos">
            <div className="text-end mb-3">
                <Button href="/pagamentos/form">Novo Pagamento</Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Locação</th>
                        <th>Data de Pagamento</th>
                        <th>Valor Pago</th>
                        <th>Forma de Pagamento</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pagamentos.map(pagamento => (
                        <tr key={pagamento.id}>
                           
                            <td>{pagamento.locacao}</td>
                            <td>{pagamento.dataPagamento}</td>
                            <td>{pagamento.valorPago}</td>
                            <td>{pagamento.formaPagamento}</td>
                            <td>{pagamento.status}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    className="me-2"
                                    href={`/pagamentos/form?id=${pagamento.id}`}
                                >
                                    <FaPen />
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => excluir(pagamento)}
                                >
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
