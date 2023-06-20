function validar(links, resolve) {
  const promessas = links.map((link) => { 
    return fetch(link.url)
    .then((response) => {
      link.status = response.status;
      link.ok = 'ok'
      if(link.status >= 400) {
        link.ok = 'fail'
      }
      return link;
    })
    .catch((erro) => {
      link.status = 'erro'
      link.ok = 'fail'
      return link;
    })
  })
  Promise.all(promessas)
  .then((result) => {
    resolve(result);
  })
}

module.exports = { validar };