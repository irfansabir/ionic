
//home service




appServices.factory('InfoService', ['$http','$q' ,function($http, $q) {

  var InfoServices = {
    async: function() {
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http.get(base_url+'homePageServices').then(function (response) {
        // The then function here is an opportunity to modify the response
        //console.log(response);
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return InfoServices;
}])

appServices.factory('categoriesService', ['$http','$q' ,function($http, $q) {

  var InfoServices = {
    async: function() {
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http.get(base_url+'categories').then(function (response) {
        // The then function here is an opportunity to modify the response
        //console.log(response);
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return InfoServices;
}])



appServices.factory('MainPageService', ['$http','$q' ,function($http, $q) {

  var MainPageService = {
    async: function() {
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http.get(base_url+'homePageleads').then(function (response) {
        // The then function here is an opportunity to modify the response
        //console.log(response);
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return MainPageService;
}])

appServices.factory('MessageCenter1', ['$http','$q' ,function($http, $q) {

  var MainPageService = {
    async: function() {
      // $http returns a promise, which has a then function, which also returns a promise
      var promise = $http.get(base_url+'messagecenter').then(function (response) {
        // The then function here is an opportunity to modify the response
        //console.log(response);
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
    }
  };
  return MainPageService;
}])

appServices.factory('MessageCenter', ['$http', '$rootScope', function($http, $rootScope) {
 
  var messages = [];
 
  return {
    getMessages: function($params) {
     return $http({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        url: base_url + 'messagecenter',
        method: "POST",
        data: $params,
      })
        .success(function(addData) {
       
          messages = addData;
        //  $rootScope.$broadcast('handleSharedMessages',messages);
        });
    },
    saveBooks: function($params) {
      return $http({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        url: base_url + 'json/save_book',
        method: "POST",
        data: $params,
      })
        .success(function(addData) {
          messages = addData;
          $rootScope.$broadcast('handleSharedBooks',books);
        });
    }
  };
}]);



appServices.factory('checkUserDetail',['$http','$q','$localstorage', function($http,$q,$localstorage){

   
}])



appServices.factory('$localstorage', ['$window', function($window) {
    return {
        set: function(key, value) {
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
            return JSON.parse($window.localStorage[key] || '{}');
        },
        clear: function(key) {
            return $window.localStorage.clear(key);
        }
    }
}])
;