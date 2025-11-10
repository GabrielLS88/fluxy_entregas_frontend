export default {
  testEnvironment: 'jsdom', // Simula o ambiente do navegador
  setupFilesAfterEnv: ['./src/test/setupTests.js'], // Configurações adicionais para Jest
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Usa Babel para transformar JS/JSX
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Ignora estilos
    'bootstrap/dist/css/bootstrap.min.css': 'identity-obj-proxy', // Ignora Bootstrap
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/test/__mocks__/fileMock.js', // Ignora imagens
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignora diretórios desnecessários
};
