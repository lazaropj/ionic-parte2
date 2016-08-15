angular.module('starter')
.service('CarroService', function($http){

	//var url = 'https://aluracar.herokuapp.com';
	var url = 'http://localhost:8080';

	return {
		obterCarros : function(){
			return $http.get(url).then(function(response){
				return response.data;
			});
		},

		salvarPedido : function(pedido){
			return $http.get(url + "/salvarpedido", pedido).then(function(response){
				return response.data;
			});

		},
		realizarLogin : function(login){
			return $http.get(url + "/login", login).then(function(response){
				return response;
			}).catch(function(erro){
				return erro;
			});

		}
	};

});
