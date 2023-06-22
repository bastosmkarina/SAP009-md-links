const { validar } = require('../validar.js');

describe('validar', () => {

  it('should return link ok if the status is less than 400', () => {
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
  
  it('should return link fail if the status is greater than or equal to 400', () => {
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

  it('should return link fail if the link is broken', () => {
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