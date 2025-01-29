const request = require('supertest');
const express = require('express');
const failureController = require('../../controllers/FailureController');
const router = require('../../routes/failures');

// Mock do controller
jest.mock('../controllers/FailureController');

const app = express();
app.use(express.json());
app.use('/api/failures', router);

describe('Failure Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /', () => {
    it('deve retornar lista de falhas', async () => {
      const mockFailures = [
        { id: 1, description: 'Falha 1', inconsistencyTypeId: 1, formId: 1 },
        { id: 2, description: 'Falha 2', inconsistencyTypeId: 1, formId: 1 }
      ];

      failureController.getAllFailures.mockImplementation((req, res) => {
        res.json(mockFailures);
      });

      const response = await request(app)
        .get('/api/failures')
        .expect(200);

      expect(failureController.getAllFailures).toHaveBeenCalled();
      expect(response.body).toEqual(mockFailures);
    });
  });

  describe('GET /:id', () => {
    it('deve retornar uma falha específica', async () => {
      const mockFailure = { id: 1, description: 'Falha 1', inconsistencyTypeId: 1, formId: 1 };

      failureController.getFailureById.mockImplementation((req, res) => {
        res.json(mockFailure);
      });

      const response = await request(app)
        .get('/api/failures/1')
        .expect(200);

      expect(failureController.getFailureById).toHaveBeenCalled();
      expect(response.body).toEqual(mockFailure);
    });
  });

  describe('POST /', () => {
    it('deve criar uma nova falha', async () => {
      const newFailure = {
        description: 'Nova Falha',
        inconsistencyTypeId: 1,
        formId: 1
      };
      const createdFailure = { id: 1, ...newFailure };

      failureController.createFailure.mockImplementation((req, res) => {
        res.status(201).json(createdFailure);
      });

      const response = await request(app)
        .post('/api/failures')
        .send(newFailure)
        .expect(201);

      expect(failureController.createFailure).toHaveBeenCalled();
      expect(response.body).toEqual(createdFailure);
    });
  });

  describe('PUT /:id', () => {
    it('deve atualizar uma falha existente', async () => {
      const updatedFailure = { id: 1, description: 'Falha Atualizada', inconsistencyTypeId: 1, formId: 1 };

      failureController.updateFailure.mockImplementation((req, res) => {
        res.json(updatedFailure);
      });

      const response = await request(app)
        .put('/api/failures/1')
        .send(updatedFailure)
        .expect(200);

      expect(failureController.updateFailure).toHaveBeenCalled();
      expect(response.body).toEqual(updatedFailure);
    });
  });

  describe('DELETE /:id', () => {
    it('deve deletar uma falha', async () => {
      failureController.deleteFailure.mockImplementation((req, res) => {
        res.status(204).send();
      });

      await request(app)
        .delete('/api/failures/1')
        .expect(204);

      expect(failureController.deleteFailure).toHaveBeenCalled();
    });
  });
});
