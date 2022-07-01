const { viewController, insertController, comboController, updateController, deleteController, comboTopController } = require('../controller/role.controller');
const { validateResourceMW, validateResourceUpdateMW, validateResourceDeleteMW } = require('../middleware/role.middleware');
const { insertSchema, updateSchema, deleteSchema, pageSchema } = require("./../validator/role.validator");
var role = require('express').Router();


/*  @swagger
 path:
  /admin/role:
    post:
      summary: Creates a new agent
      tags: [Books]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Book'
      responses:
        "200":
          description: The created .
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Book' */

role.post('/', validateResourceMW(insertSchema), insertController);


role.post('/list', viewController);


role.get('/', comboController);


role.get('/:id', comboTopController);


role.put('/:id', validateResourceUpdateMW(updateSchema), updateController);


role.delete('/:id', validateResourceDeleteMW(deleteSchema), deleteController);

module.exports = role;