(function() {
  'use strict';

  angular.module('deviceTable', []).component('deviceTable', {
    templateUrl: 'assets/javascripts/components/device-table/device-table.html',
    controller: DeviceTableController
  });

  DeviceTableController.$inject = ['deviceFactory', '$scope'];

  function DeviceTableController(deviceFactory, $scope) {
    var vm = this;
    // Scope Variables
    vm.collection = [];
    vm.allRows = [];
    vm.searchTerm = "";
    vm.checkBoxes = [];

    // Scope Functions
    $scope.search = function() {
      var newCollection = []
      var rows = vm.allRows;
      for (var row=0; row<rows.length; row++) {
        for (var col=0; col<rows[row].length; col++) {
          if (filterByColumnChecked(col) && containsSearchTerm(rows[row][col])) {
            newCollection.push(rows[row])
            break;
          }
        }
      }
      vm.collection.rows = newCollection
    };

    // Lifecycle Hooks
    vm.$onInit = onInit;
    
    ////////////////////////

    function onInit() {
      deviceFactory.get().then(function(res) {
        vm.collection = res;
        vm.allRows = vm.collection.rows;
        initializeCheckBoxes(vm.collection.headers)
      });
    }

    function initializeCheckBoxes(headers) {
      for (var i=0; i<headers.length; i++) {
        vm.checkBoxes.push(true);
      }
    }

    function filterByColumnChecked(col) {
      return vm.checkBoxes[col]
    }

    function containsSearchTerm(str) {
      return str.includes(vm.searchTerm)
    }

  }
})();
