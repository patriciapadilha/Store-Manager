const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe('CONTROLER - Testes da camada controller', () => {
  describe('Pesquisar todos os produtos - Retorna produtos com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(productsService, "getAllProducts").resolves(true);
    });

    after(() => {
      productsService.getAllProducts.restore();
    });

    it("é chamado o status com o código 200", async () => {
      await productsController.getAllProducts(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json os objetos"', async () => {
      await productsController.getAllProducts(request, response);
      expect(response).to.be.a('object');
    });
  });

  describe('Pesquisar produto por id - Não encontrado', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();
  
      sinon.stub(productsService, "getProductById").resolves(false);
    });

    after(() => {
      productsService.getProductById.restore();
    });

    it("é chamado o status com o código 404", async () => {
      await productsController.getProductById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "Product not found"', async () => {
      await productsController.getProductById(request, response);
      expect(response.send.calledWith({ message: 'Product not found' })).to.be.equal(true);
    });
  });

  describe('Pesquisar todos os produtos - Retorna produtos com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(productsService, "getProductById").resolves(true);
    });

    after(() => {
      productsService.getProductById.restore();
    });

    it("é chamado o status com o código 200", async () => {
      await productsController.getProductById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json o objeto"', async () => {
      await productsController.getProductById(request, response);
      expect(response).to.be.a('object');
    });
  });
});

describe('Verifica função de adicionar um novo produto', () => {
  const response = {};
  const request = {};

  describe('produto adicionado com sucesso', () => {
    before(() => {
      request.params = { id: 1 };
      request.body = { name: 'testes' };

      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(productsService, "addNewProduct").resolves(true);
    });

    after(() => {
      productsService.addNewProduct.restore();
    });

    it("é chamado o status com o código 201", async () => {
      await productsController.addNewProduct(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  });
});

describe('Verifica função de atualizar um produto', () => {
  const response = {};
  const request = {};

  describe('produto atualizado com sucesso', () => {
    before(() => {
      request.params = { id: 1 };
      request.body = { name: 'testes' };

      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(productsService, "updateProduct").resolves(true);
    });

    after(() => {
      productsService.updateProduct.restore();
    });
    
    it("é chamado o status com o código 200", async () => {
      await productsController.updateProduct(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
});