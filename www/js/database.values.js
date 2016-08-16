angular.module('starter')
.value('DataBaseValues', {
  bancoDeDados :  null,
  setup : function(){
    this.bancoDeDados = window.openDatabase("aluraCar", "1.0", "Banco de dados do Alura Car ", 3000);
  }

});
