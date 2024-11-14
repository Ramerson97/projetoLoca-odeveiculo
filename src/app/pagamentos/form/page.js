'use client'

import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup'
import { v4 } from 'uuid'
import Pagina from '@/components/Pagina'

export default function PagamentoFormPage(props) {
    const router = useRouter()

    // Busca as locações do localStorage para associar ao pagamento
    const locacoes = JSON.parse(localStorage.getItem('locacoes')) || []
    const pagamentos = JSON.parse(localStorage.getItem('pagamentos')) || []

    const id = props.id
    const pagamentoEditado = pagamentos.find(pagamento => pagamento.id === id)

    // Função para salvar o pagamento
    function salvar(dados) {
        if (pagamentoEditado) {
            
            Object.assign(pagamentoEditado, dados)
            localStorage.setItem('pagamentos', JSON.stringify(pagamentos))
        } else {
            dados.id = v4()
            pagamentos.push(dados)
            localStorage.setItem('pagamentos', JSON.stringify(pagamentos))
        }

        alert('Pagamento registrado com sucesso!')
        router.push('/pagamentos')
    }

    const initialValues = {
        locacao: '',
        dataPagamento: '',
        valorPago: '',
        formaPagamento: '',
        status: ''
    }

    const validationSchema = Yup.object().shape({
        locacao: Yup.string().required('Campo obrigatório'),
        dataPagamento: Yup.date().required('Campo obrigatório'),
        valorPago: Yup.number().required('Campo obrigatório'),
        formaPagamento: Yup.string().required('Campo obrigatório'),
        status: Yup.string().required('Campo obrigatório')
    })

    return (
        <Pagina titulo="Cadastro de Pagamento">
            <Formik
                initialValues={pagamentoEditado || initialValues}
                validationSchema={validationSchema}
                onSubmit={(dados) => salvar(dados)}
            >
                {({ values, touched, errors, handleBlur, handleChange, handleSubmit, handleReset }) => (
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>Locação</Form.Label>
                                <Form.Select
                                    name="locacao"
                                    value={values.locacao}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.locacao && !errors.locacao}
                                    isInvalid={touched.locacao && errors.locacao}
                                >
                                    <option value="">Selecione uma locação</option>
                                    {locacoes.map(locacao => (
                                        <option key={locacao.id} value={locacao.id}>{`${locacao.cliente} - ${locacao.veiculo}`}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{errors.locacao}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Data de Pagamento</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dataPagamento"
                                    value={values.dataPagamento}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.dataPagamento && !errors.dataPagamento}
                                    isInvalid={touched.dataPagamento && errors.dataPagamento}
                                />
                                <Form.Control.Feedback type="invalid">{errors.dataPagamento}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>Valor Pago</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="valorPago"
                                    value={values.valorPago}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.valorPago && !errors.valorPago}
                                    isInvalid={touched.valorPago && errors.valorPago}
                                />
                                <Form.Control.Feedback type="invalid">{errors.valorPago}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Forma de Pagamento</Form.Label>
                                <Form.Select
                                    name="formaPagamento"
                                    value={values.formaPagamento}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.formaPagamento && !errors.formaPagamento}
                                    isInvalid={touched.formaPagamento && errors.formaPagamento}
                                >
                                    <option value="">Selecione</option>
                                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                                    <option value="Cartão de Débito">Cartão de Débito</option>
                                    <option value="Boleto">Boleto</option>
                                    <option value="Dinheiro">Dinheiro</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{errors.formaPagamento}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                    name="status"
                                    value={values.status}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.status && !errors.status}
                                    isInvalid={touched.status && errors.status}
                                >
                                    <option value="">Selecione</option>
                                    <option value="Pago">Pago</option>
                                    <option value="Pendente">Pendente</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mt-3">
                            <div className="text-start">
                                <Button href="/pagamentos">Voltar</Button>
                            </div>
                            <div className="text-end">
                                <Button onClick={handleReset} className="me-2">Limpar</Button>
                                <Button variant="success" type="submit">Salvar</Button>
                            </div>
                        </Row>
                    </Form>
                )}
            </Formik>
        </Pagina>
    )
}
