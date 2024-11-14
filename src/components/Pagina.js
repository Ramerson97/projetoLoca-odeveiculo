'use client';

import { Container, NavDropdown } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';


export default function Pagina(props) {
    return (
        <>
            {/* Barra de Navegação */}
            <Navbar bg="danger" data-bs-theme="light" className="navbar-custom">
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/veiculos">Veículos</Nav.Link>
                        <Nav.Link href="/clientes">Clientes</Nav.Link>
                        <Nav.Link href="/locacao">Locação</Nav.Link>
                        <Nav.Link href="/pagamentos">Pagamento</Nav.Link>
                        <Nav.Link href="/agentes">Agentes</Nav.Link>
                    </Nav>
                    <div className="cta">
                        <a href="/dashboard" className="btn-reserve">Dashboard</a>
                    </div>
                </Container>
            </Navbar>


            {/* Barra de Título */}
            <div className="bg-black text-center text-white py-2">
                <h1>{props.titulo}</h1>
            </div>

            {/* Conteúdo da Página */}
            <Container className="mt-2">
                {props.children}
            </Container>

            {/* Rodapé */}
            <Footer />
        </>
    );
}

