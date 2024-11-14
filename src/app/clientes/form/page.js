'use client'


import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid'
import Pagina from '@/components/Pagina'
import ReactInputMask from 'react-input-mask'

export default function ClienteFormPage(props) {
    const router = useRouter()

    // Busca lista de clientes no LocalStorage
    const clientes = JSON.parse(localStorage.getItem('clientes')) || []

    const id = props.searchParams.id
    const clienteEditado = clientes.find(cliente => cliente.id === id)

    // Função para salvar dados no LocalStorage
    function salvar(dados) {
        if (clienteEditado) {
            // Atualiza cliente existente
            Object.assign(clienteEditado, dados)
            localStorage.setItem('clientes', JSON.stringify(clientes))
        } else {
            // Adiciona novo cliente
            dados.id = uuidv4()
            clientes.push(dados)
            localStorage.setItem('clientes', JSON.stringify(clientes))
        }
        alert('Cliente salvo com sucesso!')
        router.push('/clientes')
    }

    const initialValues = {
        nome: '',
        endereco: '',
        telefone: '',
        email: '',
        cpf: '',
        carteiraMotorista: '',
        dataNascimento: '',
        historicoAlugueis: ''
    }

    const validationSchema = Yup.object().shape({
        nome: Yup.string().required('Campo obrigatório'),
        endereco: Yup.string().required('Campo obrigatório'),
        telefone: Yup.string().required('Campo obrigatório'),
        email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
        cpf: Yup.string().required('Campo obrigatório'),
        carteiraMotorista: Yup.string().required('Campo obrigatório'),
        dataNascimento: Yup.date().required('Campo obrigatório'),
        historicoAlugueis: Yup.string()
    })

    return (
        <Pagina titulo="Cadastro de Clientes">
            <Formik
                initialValues={clienteEditado || initialValues}
                validationSchema={validationSchema}
                onSubmit={(dados) => salvar(dados)}
            >
                {({ values, touched, errors, handleBlur, handleChange, handleSubmit, handleReset }) => (
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.nome && !errors.nome}
                                    isInvalid={touched.nome && errors.nome}
                                />
                                <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Endereço</Form.Label>
                                <Form.Control
                                    name="endereco"
                                    value={values.endereco}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.endereco && !errors.endereco}
                                    isInvalid={touched.endereco && errors.endereco}
                                />
                                <Form.Control.Feedback type="invalid">{errors.endereco}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control as={ReactInputMask}
                                    mask={'(99)9999-9999'}
                                    name="telefone"
                                    value={values.telefone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.telefone && !errors.telefone}
                                    isInvalid={touched.telefone && errors.telefone}
                                />
                                <Form.Control.Feedback type="invalid">{errors.telefone}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    name="email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.email && !errors.email}
                                    isInvalid={touched.email && errors.email}
                                />
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>CPF</Form.Label>
                                <Form.Control as={ReactInputMask}
                                    mask={'999.999.999-99'}
                                    name="cpf"
                                    value={values.cpf}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.cpf && !errors.cpf}
                                    isInvalid={touched.cpf && errors.cpf}
                                />
                                <Form.Control.Feedback type="invalid">{errors.cpf}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Número da Carteira de Motorista</Form.Label>
                                <Form.Control
                                    name="carteiraMotorista"
                                    value={values.carteiraMotorista}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.carteiraMotorista && !errors.carteiraMotorista}
                                    isInvalid={touched.carteiraMotorista && errors.carteiraMotorista}
                                />
                                <Form.Control.Feedback type="invalid">{errors.carteiraMotorista}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label>Data de Nascimento</Form.Label>
                                <Form.Control
                                    name="dataNascimento"
                                    type="date"
                                    value={values.dataNascimento}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.dataNascimento && !errors.dataNascimento}
                                    isInvalid={touched.dataNascimento && errors.dataNascimento}
                                />
                                <Form.Control.Feedback type="invalid">{errors.dataNascimento}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Histórico de Aluguéis</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="historicoAlugueis"
                                    value={values.historicoAlugueis}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.historicoAlugueis && !errors.historicoAlugueis}
                                    isInvalid={touched.historicoAlugueis && errors.historicoAlugueis}
                                />
                                <Form.Control.Feedback type="invalid">{errors.historicoAlugueis}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mt-3">
                            <Col className="text-start">
                                <Button href="/clientes">Voltar</Button>
                            </Col>
                            <Col className="text-end">
                                <Button variant="secondary" onClick={handleReset}>Limpar</Button>
                                <Button variant="success" type="submit">Salvar</Button>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </Pagina>
    )
}
