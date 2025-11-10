import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '../../components/NavBar/NavBar.jsx';
import React from 'react';

describe('NavBar Componente', () => {
  beforeEach(() => {
    // Simula dados no localStorage antes do teste
    localStorage.setItem('acesso', 'liberado');
    localStorage.setItem('nome', 'Gabriel');
    localStorage.setItem('id', '67890');
  });

  afterEach(() => {
    // Limpa o localStorage após cada teste
    localStorage.clear();
  });

  test('renderiza corretamente o NavBar', () => {
    render(<NavBar />);
    
    // Verifica se os elementos da navbar estão no DOM
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Disparo')).toBeInTheDocument();
    expect(screen.getByAltText('Telek')).toBeInTheDocument(); // Verifica se a imagem da logo está presente
    expect(screen.getByText('Sair')).toBeInTheDocument();
  });

  test('remove os dados do localStorage ao clicar em "Sair"', () => {
    render(<NavBar />);
    
    // Obtém o botão "Sair" e simula um clique nele
    const sairButton = screen.getByText('Sair');
    fireEvent.click(sairButton);
    
    // Verifica se os itens foram removidos
    expect(localStorage.getItem('acesso')).toBeNull();
    expect(localStorage.getItem('nome')).toBeNull();
    expect(localStorage.getItem('id')).toBeNull();
  });
});