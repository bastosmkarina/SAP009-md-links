const { mdLinks } = require('../index.js');
const  modulovalidar  = require('../validar');

modulovalidar.validar = jest.fn();

describe('Testes da função mdLinks', () => {
  it('deve retornar os links encontrados no arquivo', async () => {
    const path = './files/file.md';

    const result = await mdLinks(path);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('deve lançar um erro caso o arquivo não exista', async () => {
    const path = 'caminho/do/arquivo_que_nao_existe.md';

    await expect(mdLinks(path)).rejects.toThrowError();
  });

  it('deve chamar a função validar se a opção for fornecida', async () => {
    const path = './files/file.md';
    const options = true;
  
    await mdLinks(path, options);

    expect(modulovalidar.validar).toHaveBeenCalled(1);
  });

});