'use client'

import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid'
import Pagina from '@/components/Pagina'
import ReactInputMask from 'react-input-mask'

export default function AgenteFormPage(props) {
    const router = useRouter()
    const locacoes = JSON.parse(localStorage.getItem('locacoes')) || []
    const agentes = JSON.parse(localStorage.getItem('agentes')) || []

    const id = props.searchParams.id
    const agenteEditado = agentes.find(agente => agente.id === id)

    function salvar(dados) {
        if (agenteEditado) {
            // Atualiza o agente existente
            Object.assign(agenteEditado, dados)
            localStorage.setItem('agentes', JSON.stringify(agentes))
        } else {
            // Adiciona um novo agente
            dados.id = uuidv4()
            agentes.push(dados)
            localStorage.setItem('agentes', JSON.stringify(agentes))
        }
        alert('Agente salvo com sucesso!')
        router.push('/agentes')
    }

    const initialValues = {
        nome: '',
        cargo: '',
        email: '',
        telefone: '',
        locacoes: []
    }

    const validationSchema = Yup.object().shape({
        nome: Yup.string().required('Campo obrigatório'),
        cargo: Yup.string().required('Campo obrigatório'),
        email: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
        telefone: Yup.string().required('Campo obrigatório'),
        locacoes: Yup.array().min(1, 'Selecione pelo menos uma locação')
    })

    return (
        <Pagina titulo="Cadastro de Agentes">
            <Formik
                initialValues={agenteEditado || initialValues}
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
                                <Form.Label>Cargo</Form.Label>
                                <Form.Control
                                    name="cargo"
                                    value={values.cargo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.cargo && !errors.cargo}
                                    isInvalid={touched.cargo && errors.cargo}
                                />
                                <Form.Control.Feedback type="invalid">{errors.cargo}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row>
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
                        </Row>

                        <Form.Group>
                            <Form.Label>Locações em que atuou</Form.Label>
                            <Form.Select
                                multiple
                                name="locacoes"
                                value={values.locacoes}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isValid={touched.locacoes && !errors.locacoes}
                                isInvalid={touched.locacoes && errors.locacoes}
                            >
                                <option value="">Selecione</option>
                                {locacoes.map(locacao => (
                                    <option key={locacao.id} value={locacao.id}>
                                        {locacao.cliente} - {locacao.veiculo}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{errors.locacoes}</Form.Control.Feedback>
                        </Form.Group>

                        <Row className="mt-3">
                            <Col className="text-start">
                                <Button href="/agentes">Voltar</Button>
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
