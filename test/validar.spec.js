const { validar } = require('../validar.js');

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