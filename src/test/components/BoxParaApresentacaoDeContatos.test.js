import { render, screen } from '@testing-library/react';
import BoxParaApresentacaoDeContatos from '../../components/BoxParaApresentacaoDeContatos/BoxParaApresentacaoDeContatos.jsx';
import React from 'react';

describe('BoxParaApresentacaoDeContatos Component', () => {
    const mockContatos = [
        { telefone: '34997801826' },
        { telefone: '34997801827' },
        { telefone: '34997801828' },
        { telefone: '34997801829' }
    ];

    test('renderiza com visibilidade inicial definida como false', () => {
        render(<BoxParaApresentacaoDeContatos statusVisibilidade={false} contatos={[]} />);
        expect(screen.queryByRole('boxParaNovoRoteador')).toBeNull(); // Verifica se elemento não existe
    });

    test('renderiza com visibilidade inicial definida como true', () => {
        render(<BoxParaApresentacaoDeContatos statusVisibilidade={true} contatos={[]} />);
        expect(screen.getByRole('boxParaNovoRoteador')).toBeInTheDocument(); // Verifia se elemento existe
    });

    test('substitui números corretamente quando a prop contatos muda', () => {
        const { rerender } = render(
            <BoxParaApresentacaoDeContatos statusVisibilidade={true} contatos={mockContatos} />
        );
    
        // Verifique se os contatos iniciais são renderizados corretamente
        mockContatos.forEach(({ telefone }) => {
            expect(screen.getByText(telefone)).toBeInTheDocument();
        });
    
        // Atualize os contatos
        const novoMockContatos = [{ telefone: '349978012313' }, { telefone: '349978012312' }];
        rerender(<BoxParaApresentacaoDeContatos statusVisibilidade={true} contatos={novoMockContatos} />);
    
        // Verifique se os contatos antigos foram removidos
        mockContatos.forEach(({ telefone }) => {
            expect(screen.queryByText(telefone)).toBeNull();
        });
    
        // Verifique se apenas os novos contatos foram renderizados corretamente
        novoMockContatos.forEach(({ telefone }) => {
            expect(screen.getByText(telefone)).toBeInTheDocument();
        });
    });

});
