import { render, screen } from '@testing-library/react';
import Loading from '../../components/Loading/Loading';
import React from 'react';

describe('Loading Componente', () => {
  test('does not render when visibilidade is false', () => {
    render(<Loading visibilidade={false} />);
    expect(screen.queryByRole('bodyLoading')).toBeNull(); // Verifica se elemento não existe
  });

  test('renders correctly when visibilidade is true', () => {
    render(<Loading visibilidade={true} />);
    expect(screen.getByRole('bodyLoading')).toBeInTheDocument(); // verifica se o elemento existe
  });
});
