// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ui.utils.masks', 'ngCordova', 'ionic-datepicker', 'idf.br-filters'])

.run(function($ionicPlatform, DataBaseValues) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    DataBaseValues.setup();
    DataBaseValues.bancoDeDados.transaction(function(tx){
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS compra (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,nome VARCHAR(300), endereco VARCHAR(300), email VARCHAR(300)," +
         "dataEntrega VARCHAR(40), carro VARCHAR(100), preco VARCHAR(50), isConfirmado BOOLEAN);",[]);
      });

  });
})
