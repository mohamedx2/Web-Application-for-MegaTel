const express = require('express');
const controller = require('../controllers/controller');
// import all controllers
// import SessionController from './app/controllers/SessionController';

const routes = express.Router();



// // Add routes
routes.post('/signUp', controller.signUp);
routes.post('/login', controller.login);
routes.put('/users/:id', controller.update);//
/*                article                               */
routes.post('/articles/new',controller.createArticle);
routes.get('/articles', controller.showArticles);
routes.put('/articles/:id', controller.updateArticle);
routes.delete('/articles/:id', controller.delateArticle);
routes.post('/users/:id/myArticles', controller.myArticles);

// routes.post('/', SessionController.store);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

module.exports = routes;
