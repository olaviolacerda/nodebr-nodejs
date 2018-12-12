/*
  0 - Obter um usuário
  1 - Obter o número de telefone de um usuário a partir de seu Id
  2 - Obter o endereço do usuário pelo Id
*/

//importamos um modulo interno do nodejs
const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  // quando der algum problema -> reject(ERRO)
  // quando tudo der certo -> resolve
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function() {
      return resolve({
        id: 1,
        nome: 'Aladin',
        dataNascimento: new Date()
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function() {
      return resolve({
        telefone: '110055334',
        ddd: '11'
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(function() {
    return callback(null, {
      rua: 'dos Bobos',
      numero: '0'
    });
  }, 2000);
}

const usuarioPromise = obterUsuario();
// para manipular o sucesso -> .then
// para manipular erros -> .catch
usuarioPromise
  .then(function(usuario) {
    return obterTelefone(usuario.id).then(function resolverTelefone(result) {
      return {
        usuario: {
          nome: usuario.nome,
          id: usuario.id
        },
        telefone: result
      };
    });
  })
  .then(function(resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id);
    return endereco.then(function resolverEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result
      };
    });
  })
  .then(function(resultado) {
    console.log('resultado', resultado);
  })
  .catch(function(erro) {
    console.error('Deu ruim', erro);
  });
