'use client'

import Pagina from '@/components/Pagina'
import React, { useEffect, useState } from 'react'

import { Button, Table } from 'react-bootstrap'
import { FaPen, FaTrash } from 'react-icons/fa'

export default function LocacaoListPage() {
    const [locacoes, setLocacoes] = useState([])

    useEffect(() => {
        // Carregar as locações do LocalStorage ao montar o componente
        const locacoesLocalStorage = JSON.parse(localStorage.getItem('locacoes')) || []
        setLocacoes(locacoesLocalStorage)
    }, [])

    // Função para excluir uma locação
    function excluir(locacao) {
        if (window.confirm(`Tem certeza que deseja excluir a locação de ${locacao.cliente}?`)) {
            const novaLista = locacoes.filter(item => item.id !== locacao.id)

            localStorage.setItem('locacoes', JSON.stringify(novaLista))
            setLocacoes(novaLista)
            alert('Locação excluída com sucesso!')
        }
    }

    return (
        <Pagina titulo={'Lista de Locações'}>
            <div className='text-end mb-3'>
                <Button href='/locacao/form'>Nova Locação</Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Veículo</th>
                        <th>Data de Início</th>
                        <th>Data de Término</th>
                        <th>Valor Total</th>
                        <th>Forma de Pagamento</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {locacoes.map(locacao => (
                        <tr key={locacao.id}>
                            <td>{locacao.cliente}</td>
                            <td>{locacao.veiculo}</td>
                            <td>{locacao.dataInicio}</td>
                            <td>{locacao.dataTermino}</td>
                            <td>{locacao.valorTotal}</td>
                            <td>{locacao.formaPagamento}</td>
                            <td>{locacao.status}</td>
                            <td>
                                <Button className='me-2' href={`/locacao/form?id=${locacao.id}`}>
                                    <FaPen />
                                </Button>
                                <Button variant='danger' onClick={() => excluir(locacao)}>
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
