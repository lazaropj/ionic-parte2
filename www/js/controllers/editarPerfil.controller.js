angular.module('starter')
.controller('EditarPerfilController', function($rootScope, $scope, $cordovaCamera){

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

	$scope.takeImage = function() {
        var options = {
            quality: 80,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 250,
            targetHeight: 250,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.srcImage = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // error
        });
    }

});
