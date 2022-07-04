const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('SERVICE - Testes da camada Service', () => {
  describe('Pesquisar todos os produtos - Não encontrado', () => {
    before(() => {
      const results = [];
      sinon.stub(productsModel, 'getAllProducts')
        .resolves(results);
    });

    after(() => {
      productsModel.getAllProducts.restore();
    });

    it('Quando não encontrado retorna um array vazio', async () => {
      const response = await productsService.getAllProducts();
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });
  });

  describe('Pesquisar todos os produtos - Retorna produtos com sucesso', () => {
    before(() => {
      const results = [
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
      sinon.stub(productsModel, 'getAllProducts')
        .resolves(results);
    });

    after(() => {
      productsModel.getAllProducts.restore();
    });

    it('retorna um array de objetos', async () => {
      const response = await productsService.getAllProducts();
      expect(response.length > 1).to.be.equal(true);
    });
  });

  describe('Pesquisar um produto por id', () => {
    before(() => {
      const results = [];
      sinon.stub(productsModel, 'getProductById')
        .resolves(results);
    });

    after(() => {
      productsModel.getProductById.restore();
    });

    it('Quando não encontrado retorna um array vazio', async () => {
      const response = await productsService.getProductById(4);
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });
  });

  describe('Quando os produtos são encontrados corretamente', () => {
    before(() => {
      const results = {
        "id": 3,
        "name": "Escudo do Capitão América"
      };
  
      spy = sinon.stub(productsModel, 'getProductById')
        .resolves(results);
    });

    after(() => {
      productsModel.getProductById.restore();
    });

    it('retorna um objeto, com id e name', async () => {
      const response = await productsService.getProductById(3);
      console.log(response);
      expect(response).to.be.not.empty;
      expect(response).to.be.a('object');
      expect(response).to.have.a.property('id');
      expect(response.id).to.be.equal(3);
      expect(response).to.have.a.property('name');
      expect(response.name).to.be.equal('Escudo do Capitão América');
    });

    it('A função a foi chamada', async () => {
      expect(spy.callCount).to.be.equal(1);
    });
  });
});

describe('Verifica função de adicionar um novo produto', () => {
  describe('produto adicionado com sucesso', () => {
    before(() => {
      const results = {
        "id": 3,
        "name": "Escudo do Capitão América"
      };
      sinon.stub(productsModel, 'addNewProduct')
        .resolves(results);
    })

    after(() => {
      productsModel.addNewProduct.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsService.addNewProduct(3);
      expect(response).to.be.not.empty;
      expect(response).to.be.a('object');
      expect(response).to.have.a.property('id');
      expect(response.id).to.be.equal(3);
      expect(response).to.have.a.property('name');
      expect(response.name).to.be.equal('Escudo do Capitão América');
    });
  });

  describe('quando não encontrado', () => {
    before(() => {
      const results = [];
      sinon.stub(productsModel, 'addNewProduct')
        .resolves(results);
    });

    after(() => {
      productsModel.addNewProduct.restore();
    });

    it('retorna um array vazio', async () => {
      const response = await productsService.addNewProduct(4);
      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });
  });
}); 

describe('Verifica função de atualizar um produto', () => {
  describe('produto adicionado com sucesso', () => {
    before(async () => {
      const execute = {
        "id": 3,
        "name": "Escudo do Capitão América"
      };
  
      sinon.stub(productsModel, 'updateProduct').resolves(execute);
    });
  
    after(async () => {
      productsModel.updateProduct.restore();
    });
    
    it('retorna um objeto com id e name', async () => {
      const response = await productsModel.updateProduct(3);
      console.log(response);
      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
    });
  });
});
