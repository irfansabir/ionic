// Controller of menu toggle.
// Learn more about Sidenav directive of angular material
// https://material.angularjs.org/latest/#/demo/material.components.sidenav
appControllers.controller('menuCtrl', function ($rootScope,$scope, $timeout, $mdUtil, $mdSidenav, $log, $ionicHistory, $state,$localstorage) {
    
    $scope.toggleLeft = buildToggler('left');

       $scope.$watch(
    function () {
      return $mdSidenav('left').isOpen();
    },
    function (newValue, oldValue) {
      console.log(newValue);
      if (newValue == true) {
       var data = $localstorage.getObject('userdata');
        if(data.UEMAIL == undefined){

            $scope.login_status = "Login";
           
            //var data = $localstorage.getObject('userdata');
           // console.log(data.UEMAIL)
         }else {
           // console.log("in");
            $scope.login_status = "Logout";
         }
      }
    });

    // buildToggler is for create menu toggle.
    // Parameter :  
    // navID = id of navigation bar.
    function buildToggler(navID) {

        var debounceFn = $mdUtil.debounce(function () {
            $mdSidenav(navID).toggle();
        }, 0);
        return debounceFn;
    };// End buildToggler.

    // navigateTo is for navigate to other page 
    // by using targetPage to be the destination state. 
    // Parameter :  
    // stateNames = target state to go
    $scope.navigateTo = function (stateName) {
        $timeout(function () {
            $mdSidenav('left').close();
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
                $state.go(stateName);
            }
        }, ($scope.isAndroid == false ? 300 : 0));
    };// End navigateTo.


      $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
   //assign the "from" parameter to something

   console.log(ev);
   console.log(from);
   console.log(fromParams);
   //return;
   if(from.name == "app.listcatMembers"){
   console.log(from.name)
$rootScope.state = "app.listcatMembers"
$rootScope.params =  fromParams;

   }else if(from.name == "app.newbuyersdetails"){

    $rootScope.state = "app.newbuyersdetails"
    $rootScope.params =  fromParams;

   }else if(from.name == "app.list"){

     $rootScope.state = "app.list"
    $rootScope.params =  fromParams;


   }else{
  $rootScope.state = "app.newsuppliers" }
});
}); // End of menu toggle controller.