const { mdLinks } = require('../index.js');
const  modulovalidar  = require('../validar');

modulovalidar.validar = jest.fn();

describe('mdLinks', () => {
  it('should return the links found in the file', async () => {
    const path = './files/file.md';

    const result = await mdLinks(path);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should throw an error if the file does not exist', async () => {
    const path = 'caminho/do/arquivo_que_nao_existe.md';

    await expect(mdLinks(path)).rejects.toThrowError();
  });

  it('should call the validate function if the option is provided', async () => {
    const path = './files/file.md';
    const options = true;
  
    const validarMock = jest.spyOn(modulovalidar, 'validar');
    validarMock.mockImplementation((links, resolve) => {
      resolve('Resultado da função validar');
    });
  
    await mdLinks(path, options);
  
    expect(validarMock).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

});