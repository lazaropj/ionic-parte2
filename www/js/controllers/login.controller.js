angular.module('starter').controller('LoginController', function($scope, CarroService, $state,  $ionicPopup, $rootScope, DataBaseValues){

	$scope.login = {};

	$scope.realizarLogin = function(){

		/*
		var dadosDoLogin = {
			params: {
				email: $scope.login.email,
				senha: $scope.login.senha
			}
		};


		CarroService.realizarLogin(dadosDoLogin).then(function(dados){
			if(dados.status === 200){
					$rootScope.usuario = dados.data.usuario;
					$state.go('app.listagem', dados);
			}else{
				$ionicPopup.alert({
					title: 'Opa!',
					template: 'Email ou senha incorreta'
				});
			}

		});*/

		var dadosDoLogin = {
			params: {
				email: 'joao@alura.com.br',
				senha: 'alura123'
			}
		};

		CarroService.realizarLogin(dadosDoLogin).then(function(dados){
			if(dados.status === 200){
					$rootScope.usuario = dados.data.usuario;
					$state.go('app.listagem', dados);
			}else{
				$ionicPopup.alert({
					title: 'Opa!',
					template: 'Email ou senha incorreta'
				});
			}

		});


	}


});
