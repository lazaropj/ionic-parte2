angular.module('starter').controller('FinalizarPedidoedidoController', function($scope, $stateParams, $ionicPopup, $state, CarroService, ionicDatePicker, $ionicHistory, DataBaseValues) {

	$scope.carroFinal = angular.fromJson($stateParams.carro);

	$scope.pedido = {};

	$scope.dataEscolhida;

	$scope.abrirPopupCalendario = function (val) {
      var ipObj1 = {
        callback: function (val) {
          console.log('Return value from the datepicker popup is : ' + val, new Date(val));
          $scope.dataEscolhida = new Date(val);
        }
      };
      ionicDatePicker.openDatePicker(ipObj1);
    };

	$scope.finalizarPedido = function(){

		var pedidoFinalizado = {
			params: {
				nome: $scope.pedido.nome,
				endereco: $scope.pedido.endereco,
				email: $scope.pedido.email,
				carro: $scope.carroFinal.nome,
				preco: $scope.carroFinal.preco,
				dataEntrega: $scope.dataEscolhida
			}
		}

		CarroService.salvarPedido(pedidoFinalizado).then(function(pedidoSalvo){

			$ionicHistory.clearCache();
			$ionicHistory.clearHistory();
			$ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });


			$scope.salvarCompraBancoDeDados(true);

			$ionicPopup.alert({
				title: 'Parabens!',
				template: 'Você acaba de agendar seu Test Drive.'
			}).then(function(){
				$state.go('app.listagem');
			});

		}, function(erro){

			$ionicHistory.clearCache();
			$ionicHistory.clearHistory();
			$ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });

			$scope.salvarCompraBancoDeDados(false);

			$ionicPopup.alert({
				title: 'Ops',
				template: 'Estamos com problemas no servidor. Tente enviar seu agendamento novamente pela tela de Agendamentos Realizados'
			}).then(function(){
				$state.go('app.compras');
			});
		});

		$scope.salvarCompraBancoDeDados = function(isConfirmado){

			try {
				DataBaseValues.setup();
				DataBaseValues.bancoDeDados.transaction(function(tx){
						tx.executeSql(
							"INSERT INTO compra (nome, endereco, email, dataEntrega, carro, preco, isConfirmado) " +
							"VALUES (?,?,?,?,?,?,?)",[$scope.pedido.nome, $scope.pedido.endereco,
								$scope.pedido.email, $scope.dataEscolhida, $scope.carroFinal.nome, $scope.carroFinal.preco, isConfirmado]);
						});

			} catch (e) {
				alert("Erro com o WebSQL" + e);
			}


		}


	};

});
