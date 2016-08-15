angular.module('starter')
.controller('ListagemController', function($scope, CarroService){



	CarroService.obterCarros().then(function(dados){
		$scope.listaDeCarros = dados;
	})


});

angular.module('starter').controller('MenuController', function($rootScope, $scope){


	$scope.usuarioLogado = $rootScope.usuario;

	$scope.isEdit = false;
	$scope.textoBtn = 'Editar';

	$scope.acaoBotao = function(isEdit){
		if(isEdit){
			$scope.textoBtn = 'Editar';
			$scope.isEdit = false;
			$rootScope.usuario = $scope.usuarioLogado;
		}else{
			$scope.textoBtn = 'Salvar';
			$scope.isEdit = true;
		}
	}

});

angular.module('starter').controller('LoginController', function($scope, CarroService, $state,  $ionicPopup, $rootScope){

	$scope.login = {};



	$scope.realizarLogin = function(){

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

		});


	}


});

angular.module('starter').controller('CarroEscolhidoController', function($scope, $stateParams) {

	$scope.carroEscolhido = angular.fromJson($stateParams.carro);

	$scope.acessorios = [
							{"nome": "Freio ABS", "preco": 500},
							{"nome": "Ar Cond.", "preco": 1000},
							{"nome": "MP3", "preco": 800}];

	$scope.extra = 0;

	$scope.mudou = function(acessorio, acessorioEscolhido) {

		if (acessorioEscolhido) {
			$scope.carroEscolhido.preco = $scope.carroEscolhido.preco + acessorio.preco;
		} else {
			$scope.carroEscolhido.preco = $scope.carroEscolhido.preco - acessorio.preco;
		}

		console.log(acessorioEscolhido);
	};

});

angular.module('starter').controller('FinalizarPedidoedidoController', function($scope, $stateParams, $ionicPopup, $state, CarroService) {

	$scope.carroFinal = angular.fromJson($stateParams.carro);

	$scope.pedido = {};

	$scope.finalizarPedido = function(){

		var pedidoFinalizado = {
			params: {
				nome: $scope.pedido.nome,
				endereco: $scope.pedido.endereco,
				email: $scope.pedido.email,
				carro: $scope.carroFinal.nome,
				preco: $scope.carroFinal.preco
			}
		}

		CarroService.salvarPedido(pedidoFinalizado).then(function(pedidoSalvo){

			$ionicPopup.alert({
				title: 'Parabens!',
				template: 'Você acaba de comprar um carro.'
			}).then(function(){
				$state.go('listagem');
			});
		});


	};

});
