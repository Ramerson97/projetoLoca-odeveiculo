'use client'

import React, { useEffect, useState } from 'react'

import { Form, Button, Col, Row } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { v4 as uuidv4 } from 'uuid'
import Pagina from '@/components/Pagina'

export default function VeiculoFormPage({ searchParams }) {
    const router = useRouter()

    // Estado para controlar o veículo que será editado
    const [veiculoEditado, setVeiculoEditado] = useState(null)

    // Pegando o ID do veículo a ser editado, caso exista no query params
    const { id } = searchParams

    useEffect(() => {
        if (id) {
            const veiculos = JSON.parse(localStorage.getItem('veiculos')) || []
            const veiculo = veiculos.find(veiculo => veiculo.id === id)
            setVeiculoEditado(veiculo)
        }
    }, [id])

    const salvar = (dados) => {
        const veiculos = JSON.parse(localStorage.getItem('veiculos')) || []

        if (veiculoEditado) {
            // Se veículo editado, atualiza
            const index = veiculos.findIndex(v => v.id === veiculoEditado.id)
            veiculos[index] = { ...veiculoEditado, ...dados }
        } else {
            // Se novo, adiciona
            dados.id = uuidv4()
            veiculos.push(dados)
        }

        // Salva no LocalStorage
        localStorage.setItem('veiculos', JSON.stringify(veiculos))
        alert('Veículo salvo com sucesso!')
        router.push('/veiculos')
    }

    const initialValues = {
        modelo: '',
        marca: '',
        ano: '',
        placa: '',
        cor: '',
        status: '',
        foto: ''
    }

    const validationSchema = Yup.object({
        modelo: Yup.string().required('Campo obrigatório'),
        marca: Yup.string().required('Campo obrigatório'),
        ano: Yup.number().required('Campo obrigatório'),
        placa: Yup.string().required('Campo obrigatório'),
        cor: Yup.string().required('Campo obrigatório'),
        status: Yup.string().required('Campo obrigatório'),
        foto: Yup.string().required("Campo obrigatório")
    })

    return (
        <Pagina titulo={veiculoEditado ? 'Editar Veículo' : 'Cadastrar Veículo'}>
            <Formik
                initialValues={veiculoEditado || initialValues}
                validationSchema={validationSchema}
                onSubmit={salvar}
            >
                {({ values, touched, errors, handleChange, handleBlur, handleSubmit, handleReset }) => (
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Label>Modelo</Form.Label>
                                <Form.Control
                                    name="modelo"
                                    value={values.modelo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.modelo && !errors.modelo}
                                    isInvalid={touched.modelo && errors.modelo}
                                />
                                <Form.Control.Feedback type="invalid">{errors.modelo}</Form.Control.Feedback>
                            </Col>
                            <Col>
                                <Form.Label>Marca</Form.Label>
                                <Form.Control
                                    name="marca"
                                    value={values.marca}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.marca && !errors.marca}
                                    isInvalid={touched.marca && errors.marca}
                                />
                                <Form.Control.Feedback type="invalid">{errors.marca}</Form.Control.Feedback>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Ano</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="ano"
                                    value={values.ano}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.ano && !errors.ano}
                                    isInvalid={touched.ano && errors.ano}
                                />
                                <Form.Control.Feedback type="invalid">{errors.ano}</Form.Control.Feedback>
                            </Col>
                            <Col>
                                <Form.Label>Placa</Form.Label>
                                <Form.Control
                                    name="placa"
                                    value={values.placa}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.placa && !errors.placa}
                                    isInvalid={touched.placa && errors.placa}
                                />
                                <Form.Control.Feedback type="invalid">{errors.placa}</Form.Control.Feedback>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Cor</Form.Label>
                                <Form.Control
                                    name="cor"
                                    value={values.cor}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.cor && !errors.cor}
                                    isInvalid={touched.cor && errors.cor}
                                />
                                <Form.Control.Feedback type="invalid">{errors.cor}</Form.Control.Feedback>
                            </Col>
                            <Col>
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
                                    <option value="Disponível">Disponível</option>
                                    <option value="Locado">Locado</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
                            </Col>

                            <Form.Group as={Col}>
                                <Form.Label>Foto:</Form.Label>
                                <Form.Control
                                    name='foto'
                                    type='text'
                                    placeholder='Adicione a foto do veiculo aqui'
                                    value={values.foto}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.foto && !errors.foto}
                                    isInvalid={touched.foto && !!errors.foto}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.foto}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className='text-center'>
                            <Button variant="secondary" onClick={handleReset}>Limpar</Button>
                            <Button variant="success" type="submit">Salvar</Button>
                        </Row>
                    </Form>
                )}
            </Formik>
        </Pagina>
    )
}
