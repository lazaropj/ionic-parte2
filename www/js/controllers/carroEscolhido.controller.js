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

	};

});
