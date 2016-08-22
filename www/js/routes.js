angular.module('starter').config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'MenuController'
  })

  .state('app.listagem', {
    url: '/listagem',
    views: {
        'menuContent' :{
          templateUrl: "templates/listagem.html",
          controller: 'ListagemController'
        }
      }
  })

  .state('app.carroescolhido', {
  url: '/carroescolhido/:carro',
  views: {
      'menuContent' :{
        templateUrl: "templates/carroescolhido.html",
        controller: 'CarroEscolhidoController'
      }
    }
  })

  .state('app.finalizarpedido', {
    url: '/finalizarpedido/:carro',
    views: {
        'menuContent' :{
          templateUrl: "templates/finalizarpedido.html",
          controller: 'FinalizarPedidoedidoController'
        }
      }
  })

  .state('app.compras', {
    url: '/compras',
    views: {
        'menuContent' :{
          templateUrl: "templates/compras.html",
          controller: 'CompraController'
        }
      }
  })

  .state('app.editarperfil', {
    url: '/editarperfil',
    views: {
        'menuContent' :{
          templateUrl: "templates/editarperfil.html",
          controller: 'EditarPerfilController'
        }
      }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  })

    $urlRouterProvider.otherwise('/login');
});
