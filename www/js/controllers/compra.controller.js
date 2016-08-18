angular.module('starter')
.controller('CompraController', function($scope, CarroService, DataBaseValues, CarroService, $ionicPopup, $state){

	$scope.compras = [];

	try {
		DataBaseValues.setup();

		DataBaseValues.bancoDeDados.transaction(function (tx) {
    	tx.executeSql("SELECT * FROM compra", [], function(tx, results) {
        if(results.rows.length > 0) {
            for(var i = 0; i < results.rows.length; i++) {
                console.log("Result -> " + results.rows.item(i).nome + " " + results.rows.item(i).email);
								$scope.compras.push(results.rows.item(i));
            }
        }
    	});
    });

	} catch (e) {
		alert("Erro com o WebSQL" + e);
	}

	$scope.reenviarCompra = function(compra){

		var pedidoFinalizado = {
			params: {
				nome: compra.nome,
				endereco: compra.endereco,
				email: compra.email,
				carro: compra.carro,
				preco: compra.preco,
				dataEntrega: compra.dataEntrega
			}
		}

		CarroService.salvarPedido(pedidoFinalizado).then(function(pedidoSalvo){

			try {
				DataBaseValues.setup();
				DataBaseValues.bancoDeDados.transaction(function(tx){
						tx.executeSql(
							"UPDATE compra SET isConfirmado = 'true' where id = ?",[compra.id]);
						});

			} catch (e) {
				alert("Erro com o WebSQL" + e);
			}

			$ionicPopup.alert({
				title: 'Parabens!',
				template: 'Compra transmitida com sucesso.'
			}).then(function(){
				$state.go($state.current,{},{reload:true})
			});



		}, function(erro){

			$ionicPopup.alert({
				title: 'Ops',
				template: 'O servidor continua com erro. Tente novamente'
			});
		});
	}

});
