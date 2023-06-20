const { validar, mdLinks } = require('../index.js');

describe('Testes da função validar', () => {

  it('deve retornar link ok, caso o status seja menor que 400', () => {
    const links = [
      { url: 'https://www.google.com', status: null, ok: null },
      { url: 'https://www.github.com', status: null, ok: null },
    ];
  
    global.fetch = jest.fn(() => Promise.resolve({
      status: 200
    }));

    function resolverMock(result) {
      expect(result[0].ok).toBe('ok');
      expect(result[0].status).toBe(200); 
      expect(result[1].ok).toBe('ok');
      expect(result[1].status).toBe(200);
    }
  
    validar(links, resolverMock);
  });
  
  it('deve retornar link fail, caso o status seja maior ou igual a 400', () => {
    const links = [
      { url: 'https://www.google.com', status: null, ok: null },
      { url: 'https://www.github.com', status: null, ok: null },
    ];
  
    global.fetch = jest.fn(() => Promise.resolve({
      status: 404
    }));

    function resolverMock(result) {
      expect(result[0].ok).toBe('fail');
      expect(result[0].status).toBe(404);
      expect(result[1].ok).toBe('fail');
      expect(result[1].status).toBe(404);
    }
  
    validar(links, resolverMock);
  });

  it('deve retornar link fail, caso o link esteja quebrado', () => {
    const links = [
      { url: 'https://www.google.com', status: null, ok: null },
      { url: 'https://www.github.com', status: null, ok: null },
    ];
  
    global.fetch = jest.fn(() => Promise.reject({
    }));

    function resolverMock(result) {
      expect(result[0].ok).toBe('fail');
      expect(result[0].status).toBe('erro');
      expect(result[1].ok).toBe('fail');
      expect(result[1].status).toBe('erro');
    }
  
    validar(links, resolverMock);
  });

});

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

  it('deve chamar a função validar se a opção for fornecida', () => {
    const path = './files/file.md';
    const options = { validar: true };
  
    const links = [
      { text: 'Link 1', url: 'https://www.google.com', pathlink: path, status: null, ok: null },
      { text: 'Link 2', url: 'https://www.github.com', pathlink: path, status: null, ok: null },
    ];
  
    global.fetch = jest.fn(() => Promise.resolve({ status: 200 }));
  
    function resolverMock(result) {
      expect(result[0].ok).toBe('ok');
      expect(result[0].status).toBe(200); 
      expect(result[1].ok).toBe('ok');
      expect(result[1].status).toBe(200);
    }
  
    mdLinks(path, options).then(resolverMock);
  });

});