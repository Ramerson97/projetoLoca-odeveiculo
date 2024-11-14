// components/Footer.js
'use client'

import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';
import './footer.css'

export default function Footer() {
    return (
        <footer className="bg-dark text-white py-5">
            <Container>
                <Row>
                    {/* Informações de Contato */}
                    <Col md={4}>
                        <h5 className="mb-3">Sobre a Locadora</h5>
                        <p>
                            A nossa locadora oferece veículos de alta qualidade para garantir que sua experiência seja única.
                            Reserve agora e aproveite a liberdade de viajar com conforto e segurança.
                        </p>
                        <p>📞 +55 (11) 98765-4321</p>
                        <p>✉️ contato@locadora.com.br</p>
                    </Col>

                    {/* Links Rápidos */}
                    <Col md={4}>
                        <h5 className="mb-3">Links Rápidos</h5>
                        <Nav className="flex-column">
                            <Nav.Link as={Link} href="/veiculos">Veículos</Nav.Link>
                            <Nav.Link as={Link} href="/clientes">Clientes</Nav.Link>
                            <Nav.Link as={Link} href="/locacao">Locação</Nav.Link>
                            <Nav.Link as={Link} href="/agentes">Agentes</Nav.Link>
                        </Nav>
                    </Col>

                    {/* Redes Sociais */}
                    <Col md={4}>
                        <h5 className="mb-3">Siga-nos</h5>
                        <div>
                            <a href="https://facebook.com" target="_blank" className="text-white me-3">
                                <FaFacebookF size={20} />
                            </a>
                            <a href="https://instagram.com" target="_blank" className="text-white me-3">
                                <FaInstagram size={20} />
                            </a>
                            <a href="https://twitter.com" target="_blank" className="text-white me-3">
                                <FaTwitter size={20} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" className="text-white">
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                    </Col>
                </Row>

                {/* Rodapé final */}
                <Row className="mt-4 text-center">
                    <Col>
                        <p className="mb-0">© 2024 Locadora - Todos os direitos reservados</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
