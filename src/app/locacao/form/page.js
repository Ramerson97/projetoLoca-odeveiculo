'use client'


import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup'
import { v4 } from 'uuid'
import Pagina from '@/components/Pagina'

export default function LocacaoFormPage(props) {
    const router = useRouter()

    // Carregar os dados de clientes e veículos do LocalStorage
    // const [clientes, setClientes] = useState([]);
    // const [veiculos, setVeiculos] = useState([]);

    

    // useEffect(() => {
    //     setClientes(JSON.parse(localStorage.getItem('clientes')) || [])
    //     setVeiculos(JSON.parse(localStorage.getItem('veiculos')) || [])
        
        
    // }, [])

    // Carregar ou inicializar a lista de locações
    const veiculos = JSON.parse(localStorage.getItem('veiculos')) || []
    const clientes = JSON.parse(localStorage.getItem('clientes')) || []
    const locacoes = JSON.parse(localStorage.getItem('locacoes')) || []

    
    const id = props.searchParams.id
    const locacaoEditado = locacoes.find(locacao => locacao.id === id)

    // Função para salvar a locação no LocalStorage
    function salvar(dados) {
        if (locacaoEditado) {
            // Atualiza cliente existente
            Object.assign(locacaoEditado, dados)
            localStorage.setItem('locacoes', JSON.stringify(locacoes))
        } else {
            // Adiciona novo cliente
            dados.id = v4()
            locacoes.push(dados)
            localStorage.setItem('locacoes', JSON.stringify(locacoes))
        }
        alert('Cliente salvo com sucesso!')
        router.push('/locacao')
    }

    const initialValues = {
        cliente: '',
        veiculo: '',
        dataInicio: '',
        dataTermino: '',
        valorTotal: '',
        formaPagamento: '',
        status: '',
    }

    const validationSchema = Yup.object().shape({
        cliente: Yup.string().required('Campo obrigatório'),
        veiculo: Yup.string().required('Campo obrigatório'),
        dataInicio: Yup.date().required('Campo obrigatório'),
        dataTermino: Yup.date().required('Campo obrigatório'),
        valorTotal: Yup.number().required('Campo obrigatório').positive(),
        formaPagamento: Yup.string().required('Campo obrigatório'),
        status: Yup.string().required('Campo obrigatório'),
    })

    return (
        <Pagina titulo={'Cadastro de Locação'}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
               onSubmit={salvar}
            >
                {({ values, touched, errors, handleChange, handleBlur, handleSubmit, handleReset }) => (
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>Cliente:</Form.Label>
                                <Form.Select
                                    name='cliente'
                                    value={values.cliente}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.cliente && !errors.cliente}
                                    isInvalid={touched.cliente && errors.cliente}
                                >
                                    <option value=''>Selecione o cliente</option>
                                    {clientes.map(cliente => (
                                        <option key={cliente.id} value={cliente.nome}>{cliente.nome}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type='invalid'>{errors.cliente}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Veículo:</Form.Label>
                                <Form.Select
                                    name='veiculo'
                                    value={values.veiculo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.veiculo && !errors.veiculo}
                                    isInvalid={touched.veiculo && errors.veiculo}
                                >
                                    <option value=''>Selecione o veículo</option>
                                    {veiculos.map(veiculo => (
                                        <option key={veiculo.id} value={veiculo.modelo}>{veiculo.modelo}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type='invalid'>{errors.veiculo}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>Data de Início:</Form.Label>
                                <Form.Control
                                    type="date"
                                    name='dataInicio'
                                    value={values.dataInicio}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.dataInicio && !errors.dataInicio}
                                    isInvalid={touched.dataInicio && errors.dataInicio}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.dataInicio}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Data de Término:</Form.Label>
                                <Form.Control
                                    type="date"
                                    name='dataTermino'
                                    value={values.dataTermino}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.dataTermino && !errors.dataTermino}
                                    isInvalid={touched.dataTermino && errors.dataTermino}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.dataTermino}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>Valor Total:</Form.Label>
                                <Form.Control
                                    type="number"
                                    name='valorTotal'
                                    value={values.valorTotal}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.valorTotal && !errors.valorTotal}
                                    isInvalid={touched.valorTotal && errors.valorTotal}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.valorTotal}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Forma de Pagamento:</Form.Label>
                                <Form.Select
                                    name='formaPagamento'
                                    value={values.formaPagamento}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.formaPagamento && !errors.formaPagamento}
                                    isInvalid={touched.formaPagamento && errors.formaPagamento}
                                >
                                    <option value=''>Selecione</option>
                                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                                    <option value="Boleto">Boleto</option>
                                    <option value="Transferência">Transferência</option>
                                </Form.Select>
                                <Form.Control.Feedback type='invalid'>{errors.formaPagamento}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>Status:</Form.Label>
                                <Form.Select
                                    name='status'
                                    value={values.status}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.status && !errors.status}
                                    isInvalid={touched.status && errors.status}
                                >
                                    <option value=''>Selecione</option>
                                    <option value="Ativa">Ativa</option>
                                    <option value="Finalizada">Finalizada</option>
                                </Form.Select>
                                <Form.Control.Feedback type='invalid'>{errors.status}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mt-3">
                            <div className='text-start'>
                                <Button href='/locacao'>Voltar</Button>
                            </div>
                            <div className='text-end'>
                                <Button onClick={handleReset}>Limpar</Button>
                                <Button variant='success' type='submit'>Salvar</Button>
                              
                            </div>
                        </Row>
                    </Form>
                )}
            </Formik>
        </Pagina>
    )
}
