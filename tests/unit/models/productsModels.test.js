const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/productsModel');
const connection = require('../../../models/connection');

describe('Pesquisar todos os produtos', () => {
 
  before(async () => {
    const execute = [
      {
        "id": 1,
        "name": "Martelo de Thor"
      },
      {
        "id": 2,
        "name": "Traje de encolhimento"
      },
      {
        "id": 3,
        "name": "Escudo do Capitão América"
      }
    ];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('quando retorna o objeto esperado', () => {
    it('o retorno é um objeto', async () => {
      const response = await productsModel.getAllProducts();
      expect(response).to.be.an('object');
    });

    it('o retorno é um objeto', async () => {
      const response = await productsModel.getAllProducts();
      console.log(response);
      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
    });
  });
});

describe('Pesquisar produto por id', () => {
  before(async () => {
    const execute = [{
      "id": 3,
      "name": "Escudo do Capitão América"
    }];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('quando retorna o objeto esperado', () => {
    it('o retorno é um objeto', async () => {
      const response = await productsModel.getProductById(3);
      expect(response).to.be.an('object');
    });

    it('o retorno é o produto com o id pesquisado', async () => {
      const response = await productsModel.getProductById(3);
      expect(response).to.have.a.property('id');
    });
  });
});  