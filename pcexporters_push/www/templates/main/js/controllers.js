
// Controller of dashboard.

appControllers.constant('$ionicLoadingConfig', {
  template: '<div class="ui-progress-circular"><ion-spinner ng-if="!isAndroid" class="progress-circular"></ion-spinner><md-progress-circular ng-if="isAndroid" md-mode="indeterminate"></md-progress-circular></div>'
})

appControllers.controller('homeConnectCtrl', function ($ionicModal, $mdMedia,$mdDialog,$scope, $timeout, $state,$stateParams, $ionicHistory,$ionicViewSwitcher,  InfoService,$rootScope) {


    //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.
    $scope.isAnimated =  $stateParams.isAnimated;

    // navigateTo is for navigate to other page 
    // by using targetPage to be the destination state. 
    // Parameter :  
    // stateNames = target state to go.
    $scope.navigateTo = function (stateName,params) {
        $timeout(function () {
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });
                //$state.go(stateName);
                 $state.go(stateName, {slug: params.CatID});
            }
        }, ($scope.isAnimated  ? 300 : 0));
    }; // End of navigateTo.


  $scope.goto = function (slug) {
      

       //location.path("app/list/"+slug.sef_url);
         $state.go('app.list', {slug: slug.sef_url});
   }

   $scope.openFromLeft = function(ev) {
    $rootScope.category_data = ev;
    
   
     $ionicModal.fromTemplateUrl('../templates/main/html/cat-option.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  return
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
   

    $mdDialog.show({
      controller: DialogController,
      templateUrl: '../templates/main/html/cat-option.html',
      parent: angular.element(document.body),
     // targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
     
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };



    // fetch category data 

      InfoService.async().then(function(d) {
    
    $scope.data = d.categories
    console.log(d);
  });

       

    // goToSetting is for navigate to Dashboard Setting page
    
})

function DialogController($scope, $mdDialog,$rootScope,$state,$ionicHistory,$ionicViewSwitcher) {
 $scope.data = {};
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    //console.log('in dialog');
    $mdDialog.hide(answer);
  };

  $scope.category_data =  $rootScope.category_data;
  //console.log('in dialog');
   $scope.navgoto = function(selection){
    $rootScope.selectdata = selection
  $state.go('app.listcatMembers', {catID: $scope.category_data.ProductCatID, selectedOpt:selection});
    
   }
    $scope.navgobuy = function(selection){

        //if ($ionicHistory.currentStateName() != stateName) {
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });

            //Next view animate will display in back direction
          //  $ionicViewSwitcher.nextDirection('back');
    $rootScope.selectdata = selection
  $state.go('app.buyingleads', {catID: $scope.category_data.ProductCatID});
  //  }
   }
   $scope.navgosell = function(selection){

    $rootScope.selectdata = selection
  $state.go('app.sellingleads', {catID: $scope.category_data.ProductCatID});
    
   }
}

appControllers.controller('mainConnectCtrl', function ($scope, $timeout, $state,$stateParams, $ionicHistory,$ionicViewSwitcher,  MainPageService, $ionicLoading) {

$scope.no_preview = "uploads/logo/No_image.jpg";
    
    


  

    // fetch category data 

      MainPageService.async().then(function(d) {
$ionicLoading.show();
        //console.log(d);
    
    $scope.sellingleads = d.sellingleads;

   // console.log($scope.sellingleads);
    
    $scope.buyingleads = d.buyingleads;
    console.log($scope.buyingleads);
    $ionicLoading.hide();

  });

       

    // goToSetting is for navigate to Dashboard Setting page
    

     //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.
    $scope.isAnimated =  $stateParams.isAnimated;

    // navigateTo is for navigate to other page 
    // by using targetPage to be the destination state. 
    // Parameter :  
    // stateNames = target state to go.
    $scope.navigateTo = function (stateName,params) {
        $timeout(function () {
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });
                console.log(params);
                 $state.go(stateName, {slug: JSON.stringify(params)});
            }
        }, ($scope.isAnimated  ? 300 : 0));
    }; // End of navigateTo.
})



appControllers.controller('detailsConnectCtrl', function ($scope, $timeout, $state,$stateParams, $ionicHistory,$ionicViewSwitcher) {
 

    //console.log($stateParams.slug);
    $scope.data = JSON.parse($stateParams.slug);
   console.log($scope.data);
  

    $scope.backtosupplier = function (stateName) {
        if ($ionicHistory.currentStateName() != stateName) {
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });

            //Next view animate will display in back direction
            $ionicViewSwitcher.nextDirection('back');
      

        $state.go(stateName, {
                slug: $scope.data.ProductCatID
            });
    }
    };


})

appControllers.controller('newsuppliersConnectCtrl', function ($http, $scope, $timeout, $state,$stateParams, $ionicHistory, $ionicViewSwitcher, $ionicLoading,$ionicPopup,$localstorage) {

$scope.navigateTo = function (stateName) {
        $timeout(function () {
            //$mdSidenav('left').close();
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });
                $state.go(stateName);
            }
        }, ($scope.isAndroid == false ? 300 : 0));
    };// End navigateTo.


})

appControllers.controller('messagesConnectCtrl', function ($http, $scope, $timeout, $state,$stateParams, $ionicHistory, $ionicViewSwitcher, $ionicLoading,$ionicPopup,$localstorage,MessageCenter,$rootScope) {

    

 $scope.navigateTo = function ($event,stateName,params) {
       
//console.log($event);  
//console.log($event.srcElement.id);  return
//document.getElementsByName('p'+pos)[0].
  //  getElementsByTagName("img")[0].src="player.png";
//return
               $rootScope.replymessagedata = params;
               //console.log($rootScope.url);
                $state.go(stateName);
           
    };// End navigateTo.



$scope.moredata = false;
  

$scope.url = 'Messages-Received';


$scope.title = $scope.url;

var limit = 0;
$scope.messages = [];
$scope.profile = {}
$scope.profile =  JSON.parse($localstorage.get("userdata"));
    $params = $.param({
    "UID": $scope.profile.UID, 
    "userkey": $scope.profile.userkey,
    "Type": $scope.profile.Type,
    "last" : "",
    "page": 0,
    "url": $scope.url
    })
   MessageCenter.getMessages($params).then(function(d) {

     $scope.max = d.data.messages[0].ID;
    // limit = parseInt(limit+10);
     
    $scope.messages = d.data.messages;
    console.log(d.data.counts);

    
    $rootScope.messagescounts = d.data.counts;

  });

    $rootScope.$on('$stateChangeStart', 
function(event, toState, toParams, fromState, fromParams){

if(toState.name == "app.messageslist"){ 
    if($rootScope.url == ""){
        var limit;
$scope.url = 'Messages-Received';
$scope.title =  $scope.url.replace("-"," ");
console.log("in");
}
else {
 console.log($rootScope.url);
  $scope.url  = $rootScope.url;

//$scope.title =   $rootScope.url 

 
}
  $scope.moredata = false;

 $params = $.param({
    "UID": $scope.profile.UID, 
    "userkey": $scope.profile.userkey,
    "Type": $scope.profile.Type,
    "last" : "",
    "page":  limit,
    "url":  $scope.url 
    })

   MessageCenter.getMessages($params).then(function(d) {

    console.log(d);
     if(d.data.messages.length > 0){
     $scope.max = d.data.messages[0].ID;
     limit = parseInt(limit+10)
    $scope.messages = d.data.messages;
    //console.log($scope.url);
    $timeout(function() {
            $('.title').text($scope.url.replace("-"," "));
          }, 0, false);
    
    $scope.messagescounts = d.data.counts; }
    else {
        $scope.messages = [];
        $timeout(function() {
            $('.title').text($scope.url.replace("-"," "));
          }, 0, false);

    }

  });
   }
})

   $scope.doRefresh = function(){

    $params = $.param({
    "UID": $scope.profile.UID, 
    "userkey": $scope.profile.userkey,
    "Type": $scope.profile.Type,
    "last" :  $scope.max,
    "page": 0,
    "url": $scope.url 
    })

    MessageCenter.getMessages($params).then(function(d) {
        console.log(d.data.messages);
      if(d.data.messages.length > 0){$scope.max = d.data.messages[0].ID;
    
     $scope.messages = d.data.messages.concat($scope.messages);
     $rootScope.messagescounts = d.data.counts;
 }
     
     $scope.$broadcast('scroll.refreshComplete');

  });}

    $scope.loaddata = function(){

    $params = $.param({
    "UID": $scope.profile.UID, 
    "userkey": $scope.profile.userkey,
    "Type": $scope.profile.Type,
    "last" : "",
    "page": limit,
    "url": $scope.url 
    })

    MessageCenter.getMessages($params).then(function(d) {
        console.log(d.data.messages);
      if(d.data.messages.length > 0){
        limit = parseInt(limit+10)
        $scope.title =   $scope.url.replace("-"," ");
    
 $scope.messages = $scope.messages.concat(d.data.messages);
 $scope.$broadcast('scroll.infiniteScrollComplete');   
    }else {

        $scope.moredata = true;
 $scope.$broadcast('scroll.infiniteScrollComplete');
    }
     

  })

   }

    // goToSetting is for navigate to Dashboard Setting page
    $scope.goToSetting = function () {
        $state.go("app.messageslist");
    };// End goToSetting.


   
    

})

appControllers.controller('cat-options', function ($http, $scope, $timeout, $state,$stateParams, $ionicHistory, $ionicViewSwitcher, $ionicLoading,$ionicPopup,$localstorage,$rootScope) {

    //console.log($rootScope.messagescounts);
    //$scope.list = $rootScope.messagescounts

    $scope.navigateTo = function (stateName,params) {
        $timeout(function () {
            //$mdSidenav('left').close();
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });

               $rootScope.url = params;
               //console.log($rootScope.url);
                $state.go(stateName);
            }
        }, ($scope.isAndroid == false ? 300 : 0));
    };// End navigateTo.
    
    $scope.navgoto = function(selection){
    //$scope.modal.hide();
    $rootScope.selectdata = selection
    $state.go('app.listcatMembers', {catID: $scope.category_data.ProductCatID, selectedOpt:selection});
    
   }
    $scope.navgobuy = function(selection){
    //$scope.modal.hide();
  
        //if ($ionicHistory.currentStateName() != stateName) {
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: false
            });

            //Next view animate will display in back direction
          //  $ionicViewSwitcher.nextDirection('back');
    $rootScope.selectdata = selection
    $state.go('app.buyingleads', {catID: $scope.category_data.ProductCatID});
  //  }
   }
   $scope.navgosell = function(selection){
  //$scope.modal.hide();
    $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: false
            });
    $rootScope.selectdata = selection
  $state.go('app.sellingleads', {catID: $scope.category_data.ProductCatID});
    
   }
})

appControllers.controller('messageslist', function ($http, $scope, $timeout, $state,$stateParams, $ionicHistory, $ionicViewSwitcher, $ionicLoading,$ionicPopup,$localstorage,$rootScope) {

    console.log($rootScope.messagescounts);
    $scope.list = $rootScope.messagescounts

    $scope.navigateTo = function (stateName,params) {
        $timeout(function () {
            //$mdSidenav('left').close();
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });

               $rootScope.url = params;
               //console.log($rootScope.url);
                $state.go(stateName);
            }
        }, ($scope.isAndroid == false ? 300 : 0));
    };// End navigateTo.

})

appControllers.controller('messagesreplyConnectCtrl', function ($ionicScrollDelegate,$http, $scope, $timeout, $state,$stateParams, $ionicHistory, $ionicViewSwitcher, $ionicLoading,$ionicPopup,$localstorage,$rootScope) {

    console.log($rootScope.replymessagedata);
    $scope.list = $rootScope.replymessagedata;
    $scope.data = {}

$scope.showform = false;
    $scope.submit = function(valid,data){
        
        if(valid){
            console.log(data);
            }
    }

    $scope.navigateTo = function (stateName,params) {
        $timeout(function () {
            //$mdSidenav('left').close();
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });

               $rootScope.url = params;
               //console.log($rootScope.url);
                $state.go(stateName);
            }
        }, ($scope.isAndroid == false ? 300 : 0));
    };// End navigateTo.


    $scope.bottom = function(){
$scope.showform = true;
        $ionicScrollDelegate.scrollBottom(true);
    }

})
appControllers.controller('alertsConnectCtrl', function ($http, $scope, $timeout, $state,$stateParams, $ionicHistory, $ionicViewSwitcher, $ionicLoading,$ionicPopup,$localstorage) {

$scope.navigateTo = function (stateName) {
        $timeout(function () {
            //$mdSidenav('left').close();
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });
                $state.go(stateName);
            }
        }, ($scope.isAndroid == false ? 300 : 0));
    };// End navigateTo.

})




appControllers.controller('newbuyersConnectCtrl', function ($http, $scope, $timeout, $state,$stateParams, $ionicHistory, $ionicViewSwitcher, $ionicLoading,$ionicPopup,$localstorage) {

//$scope.title = $stateParams.slug;
 // navigateTo is for navigate to other page
    // by using targetPage to be the destination state.
    // Parameter :
    // stateNames = target state to go.
    // objectData = Object data will send to destination state.
    $scope.navigateTo = function (stateName,objectData) {
        if ($ionicHistory.currentStateName() != stateName) {
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });

            //Next view animate will display in back direction
           // $ionicViewSwitcher.nextDirection('back');
           // console.log(objectData);
            $state.go(stateName, {
                slug: JSON.stringify(objectData)
            });
        }
    }; // End of navigateTo.




 $scope.list = [];
  $scope.moredata = false;
   var   limit =0;


$scope.doRefresh = function() {
    //$scope.todos.unshift({name: 'Incoming todo ' + Date.now()})
    $scope.data = {last : $scope.maxid,  page: 0}; 
     $http({
    method: 'POST',
    url: base_url+'ListImporters',
    data: $.param($scope.data),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
      
         
         console.log(data.users);
        if(data.users.length > 0){

         //    $scope.title = data.products[0].CatName;
          $scope.maxid = data.users[0].CompanyID;

           for (var i = 0; i < data.users.length; i++){

            $scope.list.unshift({

         
         "CompanyID" :  data.users[i].CompanyID,
         "CompanyName": data.users[i].CompanyName,
         "PersonTitle":  data.users[i].PersonTitle,
         "FirstName": data.users[i].FirstName,
         "LastName": data.users[i].LastName,
         "Position": data.users[i].Position,
         "ChFirstName": data.users[i].ChFirstName,
         "ChLastName": data.users[i].ChLastName,
         "BusinessType": data.users[i].BusinessType,
         "Address": data.users[i].Address,
         "Unit_Office": data.users[i].Unit_Office,
         "Road_Name": data.users[i].Road_Name,
         "Building_Name": data.users[i].Building_Name,
         "City": data.users[i].City,
         "Zip": data.users[i].Zip,
         "State": data.users[i].State,
         "CountryID": data.users[i].CountryID,
         "IPCountry": data.users[i].IPCountry,
         "Telephone": data.users[i].Telephone,
         "Fax": data.users[i].Fax,
         "Email": data.users[i].Email,
         "cc_email": data.users[i].cc_email,
         "official_email": data.users[i].official_email,
         "MSN": data.users[i].MSN,
         "Yahoo": data.users[i].Yahoo,
         "Skype": data.users[i].Skype,
         "ICQ": data.users[i].ICQ,
         "ShowMessengerID": data.users[i].ShowMessengerID,
         "URL": data.users[i].URL,
         "CompanyActive": data.users[i].CompanyActive,
         "Password": data.users[i].Password,
         "UserKey": data.users[i].UserKey,
         "Introduction": data.users[i].Introduction,
         "YearEstablished":data.users[i].YearEstablished,
         "CompanyType":data.users[i].CompanyType,
         "Employees":data.users[i].Employees,
         "LegalRpr":data.users[i].LegalRpr,
         "PlaceInc":data.users[i].PlaceInc,
         "AnnualTurnover":data.users[i].AnnualTurnover,
         "LastLoginDate":data.users[i].LastLoginDate,
         "LastLoginIP":data.users[i].LastLoginIP,
         "CompanyLogo":data.users[i].CompanyLogo,
         "CompanyCode":data.users[i].CompanyCode,
         "Priority":data.users[i].Priority,
         "SignUpDate":data.users[i].SignUpDate,
         "PaidMember":data.users[i].PaidMember,
         "TransactionID":data.users[i].TransactionID,
         "PolicyID":data.users[i].PolicyID,
         "SecurityQuestion":data.users[i].SecurityQuestion,
         "YourAnswer": data.users[i].YourAnswer,
         "FeaturedCompany":data.users[i].FeaturedCompany,
         "FlashLogo": data.users[i].FlashLogo,
         "Approved":data.users[i].Approved,
         "PaymentProcessed":data.users[i].PaymentProcessed,
         "VerificationCode":data.users[i].VerificationCode,
         "VoucherNo":data.users[i].VoucherNo,
         "Renewal_date":data.users[i].Renewal_date,
         "Expiry_date":data.users[i].Expiry_date,
         "PriceListComments":data.users[i].PriceListComments,
         "PriceListUpdationDate":data.users[i].PriceListUpdationDate,
         "Pricelistfile":data.users[i].Pricelistfile,
         "Verify_date":data.users[i].Verify_date,
         "shorturl":data.users[i].shorturl,
         "ReceiveLeads":data.users[i].ReceiveLeads,
         "BuyingLeadsEmail":data.users[i].BuyingLeadsEmail,
         "SellingLeadsEmail":data.users[i].SellingLeadsEmail,
         "signup_country":data.users[i].signup_country,
         "messenger_clicks":data.users[i].messenger_clicks,
         "skip_ids":data.users[i].skip_ids,
         "remind_at":data.users[i].remind_at,
         "verified":data.users[i].verified,
         "sef_url":data.users[i].sef_url,
         "profile_picture":data.users[i].profile_picture,
         "new_member_notification":data.users[i].new_member_notification,
         "mobile":data.users[i].mobile,
         "linkdin":data.users[i].linkdin,
         "CountryName":data.users[i].CountryName,
         "CountryImage":data.users[i].CountryImage,
         "CCode":data.users[i].CCode,
         "Gmtdiff":data.users[i].Gmtdiff,
         "buyer_featured":data.users[i].buyer_featured,

          })



         
}

    $scope.$broadcast('scroll.refreshComplete');
    //$scope.$apply()
        }else {
$scope.$broadcast('scroll.refreshComplete');
    

        }
       // $scope.list.push();
      
       // $ionicLoading.hide();

       // $rootScope.loading = false;
        
    }).error(function (data){
         //$ionicLoading.hide();
       //  $rootScope.loading = false;
       $scope.$broadcast('scroll.refreshComplete');
   
    })
    
  };

  

$scope.loaddata = function(){


 limit = limit == 0 ? 0 : limit;
$scope.data = {cat_id : $stateParams.slug, page: (limit * 1)}; 
     $http({
    method: 'POST',
    url: base_url+'ListImporters',
    data: $.param($scope.data),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
      console.log(data.users); //return;
         // $scope.title = data.sellingleads[0].CatName;
        $scope.no_preview = "uploads/logo/No_image.jpg";
        if(data.users.length > 0){
$scope.maxid = data.users[0].CompanyID;
           for (var i = 0; i < data.users.length; i++){

            $scope.list.push({

         "CompanyID" :  data.users[i].CompanyID,
         "CompanyName": data.users[i].CompanyName,
         "PersonTitle":  data.users[i].PersonTitle,
         "FirstName": data.users[i].FirstName,
         "LastName": data.users[i].LastName,
         "Position": data.users[i].Position,
         "ChFirstName": data.users[i].ChFirstName,
         "ChLastName": data.users[i].ChLastName,
         "BusinessType": data.users[i].BusinessType,
         "Address": data.users[i].Address,
         "Unit_Office": data.users[i].Unit_Office,
         "Road_Name": data.users[i].Road_Name,
         "Building_Name": data.users[i].Building_Name,
         "City": data.users[i].City,
         "Zip": data.users[i].Zip,
         "State": data.users[i].State,
         "CountryID": data.users[i].CountryID,
         "IPCountry": data.users[i].IPCountry,
         "Telephone": data.users[i].Telephone,
         "Fax": data.users[i].Fax,
         "Email": data.users[i].Email,
         "cc_email": data.users[i].cc_email,
         "official_email": data.users[i].official_email,
         "MSN": data.users[i].MSN,
         "Yahoo": data.users[i].Yahoo,
         "Skype": data.users[i].Skype,
         "ICQ": data.users[i].ICQ,
         "ShowMessengerID": data.users[i].ShowMessengerID,
         "URL": data.users[i].URL,
         "CompanyActive": data.users[i].CompanyActive,
         "Password": data.users[i].Password,
         "UserKey": data.users[i].UserKey,
         "Introduction": data.users[i].Introduction,
         "YearEstablished":data.users[i].YearEstablished,
         "CompanyType":data.users[i].CompanyType,
         "Employees":data.users[i].Employees,
         "LegalRpr":data.users[i].LegalRpr,
         "PlaceInc":data.users[i].PlaceInc,
         "AnnualTurnover":data.users[i].AnnualTurnover,
         "LastLoginDate":data.users[i].LastLoginDate,
         "LastLoginIP":data.users[i].LastLoginIP,
         "CompanyLogo":data.users[i].CompanyLogo,
         "CompanyCode":data.users[i].CompanyCode,
         "Priority":data.users[i].Priority,
         "SignUpDate":data.users[i].SignUpDate,
         "PaidMember":data.users[i].PaidMember,
         "TransactionID":data.users[i].TransactionID,
         "PolicyID":data.users[i].PolicyID,
         "SecurityQuestion":data.users[i].SecurityQuestion,
         "YourAnswer": data.users[i].YourAnswer,
         "FeaturedCompany":data.users[i].FeaturedCompany,
         "FlashLogo": data.users[i].FlashLogo,
         "Approved":data.users[i].Approved,
         "PaymentProcessed":data.users[i].PaymentProcessed,
         "VerificationCode":data.users[i].VerificationCode,
         "VoucherNo":data.users[i].VoucherNo,
         "Renewal_date":data.users[i].Renewal_date,
         "Expiry_date":data.users[i].Expiry_date,
         "PriceListComments":data.users[i].PriceListComments,
         "PriceListUpdationDate":data.users[i].PriceListUpdationDate,
         "Pricelistfile":data.users[i].Pricelistfile,
         "Verify_date":data.users[i].Verify_date,
         "shorturl":data.users[i].shorturl,
         "ReceiveLeads":data.users[i].ReceiveLeads,
         "BuyingLeadsEmail":data.users[i].BuyingLeadsEmail,
         "SellingLeadsEmail":data.users[i].SellingLeadsEmail,
         "signup_country":data.users[i].signup_country,
         "messenger_clicks":data.users[i].messenger_clicks,
         "skip_ids":data.users[i].skip_ids,
         "remind_at":data.users[i].remind_at,
         "verified":data.users[i].verified,
         "sef_url":data.users[i].sef_url,
         "profile_picture":data.users[i].profile_picture,
         "new_member_notification":data.users[i].new_member_notification,
         "mobile":data.users[i].mobile,
         "linkdin":data.users[i].linkdin,
         "CountryName":data.users[i].CountryName,
         "CountryImage":data.users[i].CountryImage,
         "CCode":data.users[i].CCode,
         "Gmtdiff":data.users[i].Gmtdiff,
         "buyer_featured":data.users[i].buyer_featured,

          })

       
} limit = limit + 10;
console.log(limit);
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }else {
 $scope.moredata = true;
 $scope.$broadcast('scroll.infiniteScrollComplete');

        }
       // $scope.list.push();
      
       // $ionicLoading.hide();

       // $rootScope.loading = false;
        
    }).error(function (data){
         //$ionicLoading.hide();
       //  $rootScope.loading = false;
    })
    }



})


/*-------------list exporters --------------------------*/

appControllers.controller('newsuppliersConnectCtrl', function ($http, $scope, $timeout, $state,$stateParams, $ionicHistory, $ionicViewSwitcher, $ionicLoading,$ionicPopup,$localstorage) {

//$scope.title = $stateParams.slug;
 // navigateTo is for navigate to other page
    // by using targetPage to be the destination state.
    // Parameter :
    // stateNames = target state to go.
    // objectData = Object data will send to destination state.
    $scope.navigateTo = function (stateName,objectData) {
        if ($ionicHistory.currentStateName() != stateName) {
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });

            //Next view animate will display in back direction
           // $ionicViewSwitcher.nextDirection('back');
           // console.log(objectData);
            $state.go(stateName, {
                slug: JSON.stringify(objectData)
            });
        }
    }; // End of navigateTo.






 $scope.list = [];
  $scope.moredata = false;
   var   limit = 0;

  $scope.doRefresh = function() {
    //$scope.todos.unshift({name: 'Incoming todo ' + Date.now()})
    $scope.data = {last : $scope.maxid,  page: 0}; 
     $http({
    method: 'POST',
    url: base_url+'ListExporters',
    data: $.param($scope.data),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
      
         
         console.log(data.users);
        if(data.users.length > 0){

         //    $scope.title = data.products[0].CatName;
          $scope.maxid = data.users[0].CompanyID;

           for (var i = 0; i < data.users.length; i++){

            $scope.list.unshift({

         
         "CompanyID" :  data.users[i].CompanyID,
         "CompanyName": data.users[i].CompanyName,
         "PersonTitle":  data.users[i].PersonTitle,
         "FirstName": data.users[i].FirstName,
         "LastName": data.users[i].LastName,
         "Position": data.users[i].Position,
         "ChFirstName": data.users[i].ChFirstName,
         "ChLastName": data.users[i].ChLastName,
         "BusinessType": data.users[i].BusinessType,
         "Address": data.users[i].Address,
         "Unit_Office": data.users[i].Unit_Office,
         "Road_Name": data.users[i].Road_Name,
         "Building_Name": data.users[i].Building_Name,
         "City": data.users[i].City,
         "Zip": data.users[i].Zip,
         "State": data.users[i].State,
         "CountryID": data.users[i].CountryID,
         "IPCountry": data.users[i].IPCountry,
         "Telephone": data.users[i].Telephone,
         "Fax": data.users[i].Fax,
         "Email": data.users[i].Email,
         "cc_email": data.users[i].cc_email,
         "official_email": data.users[i].official_email,
         "MSN": data.users[i].MSN,
         "Yahoo": data.users[i].Yahoo,
         "Skype": data.users[i].Skype,
         "ICQ": data.users[i].ICQ,
         "ShowMessengerID": data.users[i].ShowMessengerID,
         "URL": data.users[i].URL,
         "CompanyActive": data.users[i].CompanyActive,
         "Password": data.users[i].Password,
         "UserKey": data.users[i].UserKey,
         "Introduction": data.users[i].Introduction,
         "YearEstablished":data.users[i].YearEstablished,
         "CompanyType":data.users[i].CompanyType,
         "Employees":data.users[i].Employees,
         "LegalRpr":data.users[i].LegalRpr,
         "PlaceInc":data.users[i].PlaceInc,
         "AnnualTurnover":data.users[i].AnnualTurnover,
         "LastLoginDate":data.users[i].LastLoginDate,
         "LastLoginIP":data.users[i].LastLoginIP,
         "CompanyLogo":data.users[i].CompanyLogo,
         "CompanyCode":data.users[i].CompanyCode,
         "Priority":data.users[i].Priority,
         "SignUpDate":data.users[i].SignUpDate,
         "PaidMember":data.users[i].PaidMember,
         "TransactionID":data.users[i].TransactionID,
         "PolicyID":data.users[i].PolicyID,
         "SecurityQuestion":data.users[i].SecurityQuestion,
         "YourAnswer": data.users[i].YourAnswer,
         "FeaturedCompany":data.users[i].FeaturedCompany,
         "FlashLogo": data.users[i].FlashLogo,
         "Approved":data.users[i].Approved,
         "PaymentProcessed":data.users[i].PaymentProcessed,
         "VerificationCode":data.users[i].VerificationCode,
         "VoucherNo":data.users[i].VoucherNo,
         "Renewal_date":data.users[i].Renewal_date,
         "Expiry_date":data.users[i].Expiry_date,
         "PriceListComments":data.users[i].PriceListComments,
         "PriceListUpdationDate":data.users[i].PriceListUpdationDate,
         "Pricelistfile":data.users[i].Pricelistfile,
         "Verify_date":data.users[i].Verify_date,
         "shorturl":data.users[i].shorturl,
         "ReceiveLeads":data.users[i].ReceiveLeads,
         "BuyingLeadsEmail":data.users[i].BuyingLeadsEmail,
         "SellingLeadsEmail":data.users[i].SellingLeadsEmail,
         "signup_country":data.users[i].signup_country,
         "messenger_clicks":data.users[i].messenger_clicks,
         "skip_ids":data.users[i].skip_ids,
         "remind_at":data.users[i].remind_at,
         "verified":data.users[i].verified,
         "sef_url":data.users[i].sef_url,
         "profile_picture":data.users[i].profile_picture,
         "new_member_notification":data.users[i].new_member_notification,
         "mobile":data.users[i].mobile,
         "linkdin":data.users[i].linkdin,
         "CountryName":data.users[i].CountryName,
         "CountryImage":data.users[i].CountryImage,
         "CCode":data.users[i].CCode,
         "Gmtdiff":data.users[i].Gmtdiff,
         "buyer_featured":data.users[i].buyer_featured,

          })



         
}

    $scope.$broadcast('scroll.refreshComplete');
    //$scope.$apply()
        }else {
$scope.$broadcast('scroll.refreshComplete');
    

        }
       // $scope.list.push();
      
       // $ionicLoading.hide();

       // $rootScope.loading = false;
        
    }).error(function (data){
         //$ionicLoading.hide();
       //  $rootScope.loading = false;
       $scope.$broadcast('scroll.refreshComplete');
   
    })
    
  };

$scope.loaddata = function(){


 limit = limit == 0 ? 0 : limit;
$scope.data = {page: (limit * 1)}; 
     $http({
    method: 'POST',
    url: base_url+'ListExporters',
    data: $.param($scope.data),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
      console.log(data.users); //return;
         // $scope.title = data.sellingleads[0].CatName;
        $scope.no_preview = "uploads/logo/No_image.jpg";
        if(data.users.length > 0){
 $scope.maxid = data.users[0].CompanyID;
           for (var i = 0; i < data.users.length; i++){

            $scope.list.push({

         "CompanyID" :  data.users[i].CompanyID,
         "CompanyName": data.users[i].CompanyName,
         "PersonTitle":  data.users[i].PersonTitle,
         "FirstName": data.users[i].FirstName,
         "LastName": data.users[i].LastName,
         "Position": data.users[i].Position,
         "ChFirstName": data.users[i].ChFirstName,
         "ChLastName": data.users[i].ChLastName,
         "BusinessType": data.users[i].BusinessType,
         "Address": data.users[i].Address,
         "Unit_Office": data.users[i].Unit_Office,
         "Road_Name": data.users[i].Road_Name,
         "Building_Name": data.users[i].Building_Name,
         "City": data.users[i].City,
         "Zip": data.users[i].Zip,
         "State": data.users[i].State,
         "CountryID": data.users[i].CountryID,
         "IPCountry": data.users[i].IPCountry,
         "Telephone": data.users[i].Telephone,
         "Fax": data.users[i].Fax,
         "Email": data.users[i].Email,
         "cc_email": data.users[i].cc_email,
         "official_email": data.users[i].official_email,
         "MSN": data.users[i].MSN,
         "Yahoo": data.users[i].Yahoo,
         "Skype": data.users[i].Skype,
         "ICQ": data.users[i].ICQ,
         "ShowMessengerID": data.users[i].ShowMessengerID,
         "URL": data.users[i].URL,
         "CompanyActive": data.users[i].CompanyActive,
         "Password": data.users[i].Password,
         "UserKey": data.users[i].UserKey,
         "Introduction": data.users[i].Introduction,
         "YearEstablished":data.users[i].YearEstablished,
         "CompanyType":data.users[i].CompanyType,
         "Employees":data.users[i].Employees,
         "LegalRpr":data.users[i].LegalRpr,
         "PlaceInc":data.users[i].PlaceInc,
         "AnnualTurnover":data.users[i].AnnualTurnover,
         "LastLoginDate":data.users[i].LastLoginDate,
         "LastLoginIP":data.users[i].LastLoginIP,
         "CompanyLogo":data.users[i].CompanyLogo,
         "CompanyCode":data.users[i].CompanyCode,
         "Priority":data.users[i].Priority,
         "SignUpDate":data.users[i].SignUpDate,
         "PaidMember":data.users[i].PaidMember,
         "TransactionID":data.users[i].TransactionID,
         "PolicyID":data.users[i].PolicyID,
         "SecurityQuestion":data.users[i].SecurityQuestion,
         "YourAnswer": data.users[i].YourAnswer,
         "FeaturedCompany":data.users[i].FeaturedCompany,
         "FlashLogo": data.users[i].FlashLogo,
         "Approved":data.users[i].Approved,
         "PaymentProcessed":data.users[i].PaymentProcessed,
         "VerificationCode":data.users[i].VerificationCode,
         "VoucherNo":data.users[i].VoucherNo,
         "Renewal_date":data.users[i].Renewal_date,
         "Expiry_date":data.users[i].Expiry_date,
         "PriceListComments":data.users[i].PriceListComments,
         "PriceListUpdationDate":data.users[i].PriceListUpdationDate,
         "Pricelistfile":data.users[i].Pricelistfile,
         "Verify_date":data.users[i].Verify_date,
         "shorturl":data.users[i].shorturl,
         "ReceiveLeads":data.users[i].ReceiveLeads,
         "BuyingLeadsEmail":data.users[i].BuyingLeadsEmail,
         "SellingLeadsEmail":data.users[i].SellingLeadsEmail,
         "signup_country":data.users[i].signup_country,
         "messenger_clicks":data.users[i].messenger_clicks,
         "skip_ids":data.users[i].skip_ids,
         "remind_at":data.users[i].remind_at,
         "verified":data.users[i].verified,
         "sef_url":data.users[i].sef_url,
         "profile_picture":data.users[i].profile_picture,
         "new_member_notification":data.users[i].new_member_notification,
         "mobile":data.users[i].mobile,
         "linkdin":data.users[i].linkdin,
         "CountryName":data.users[i].CountryName,
         "CountryImage":data.users[i].CountryImage,
         "CCode":data.users[i].CCode,
         "Gmtdiff":data.users[i].Gmtdiff,
         "buyer_featured":data.users[i].buyer_featured,

          })

       
} limit = limit + 10;
//console.log(limit);
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }else {
 $scope.moredata = true;
 $scope.$broadcast('scroll.infiniteScrollComplete');

        }
       // $scope.list.push();
      
       // $ionicLoading.hide();

       // $rootScope.loading = false;
        
    }).error(function (data){
         //$ionicLoading.hide();
       //  $rootScope.loading = false;
    })
    }



})


appControllers.controller('detailsbuyersConnectCtrl', function ( $rootScope,$mdBottomSheet,$rootScope,$http, $scope, $timeout, $state,$stateParams, $ionicHistory, $ionicViewSwitcher, $ionicLoading,$ionicPopup,$localstorage) {
$scope.navigateTo = function (stateName) {
        $timeout(function () {
            //$mdSidenav('left').close();
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: false
                });
               // $state.go(stateName);

                $state.go($rootScope.state, {catID : $rootScope.params.catID, selectedOpt: $rootScope.params.selectedOpt} );
            }
        }, ($scope.isAndroid == false ? 300 : 0));
    };// End navigateTo.

    $scope.no_preview = "uploads/logo/No_image.jpg";


    $scope.buyer_details = JSON.parse($stateParams.slug)

     $scope.goToSetting = function (buyer_details) {
        $rootScope.buyer_details = JSON.stringify(buyer_details)
        $state.go("app.buyer-contact");
    };// End goToSetting.

     $scope.showListBottomSheet = function ($event,buyer_details) {
        $mdBottomSheet.show({
            templateUrl: 'ui-list-bottom-sheet-template',
            targetEvent: $event,
            scope: $scope.$new(false),
        });
    };

    // For close list bottom sheet.
  //  $scope.closeListBottomSheet = function () {
    //    $mdBottomSheet.hide();
  //  } // End of closeListBottomSheet.

  console.log($ionicHistory.viewHistory()())
  

    $scope.backtosupplier = function (stateName) {
        if ($ionicHistory.currentStateName() != stateName) {
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });

            //Next view animate will display in back direction
            $ionicViewSwitcher.nextDirection('back');
        $state.go(stateName);
    }
    };

})

appControllers.controller('buyer-contactConnectCtrl', function ($mdToast,$rootScope,$http, $scope, $timeout, $state,$stateParams, $ionicHistory, $ionicViewSwitcher, $ionicLoading,$ionicPopup,$localstorage) {

   
 $scope.company_data = JSON.parse($rootScope.buyer_details);
 $scope.company_name =  $scope.company_data.CompanyName;
 $scope.data = {}
 $scope.sendmessage = function(valid,data){

if(valid){
   
$scope.profile =  JSON.parse($localstorage.get("userdata"));

    $scope.postdata = {UID: $scope.profile.UID, PaidMember: $scope.profile.PaidMember,
                    Type : $scope.profile.Type, 
                    PolicyID : $scope.profile.PolicyID, 
                    userkey : $scope.profile.userkey, 
                    UNAME : $scope.profile.UNAME, 
                    cid : $scope.company_data.CompanyID,
                    subject:  data.subject,
                    message: data.message
    };
    console.log($scope.postdata);
    
     $http({
    method: 'POST',
    url: base_url+'send_msg',
    data: $.param($scope.postdata),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
        console.log(data);
      
          
        $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 600,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: data.message
                        }
                    }
                });//End showing toast.

    }).error(function(er){

        jQuery('#contract-list-loading-progress').hide();
            jQuery('#contract-list-content').fadeIn();
            $scope.isLoading = false;

        $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 600,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: "something went wrong!"
                        }
                    }
                });//End showing toast.

    })
     
 }
 }
    
})

appControllers.controller('detailssuppliersConnectCtrl', function ($mdBottomSheet,$rootScope,$http, $scope, $timeout, $state,$stateParams, $ionicHistory, $ionicViewSwitcher, $ionicLoading,$ionicPopup,$localstorage,$rootScope) {
$scope.state = "";
$scope.navigateTo = function (stateName) {
        $timeout(function () {
            //$mdSidenav('left').close();
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });
                $state.go(stateName);
            }
        }, ($scope.isAndroid == false ? 300 : 0));
    };// End navigateTo.

    $scope.no_preview = "uploads/logo/No_image.jpg";


    $scope.buyer_details = JSON.parse($stateParams.slug)

     $scope.goToSetting = function (buyer_details) {
        $rootScope.buyer_details = JSON.stringify(buyer_details)
        $state.go("app.supplier-contact");
    };// End goToSetting.


  

    

     $scope.backtosupplier = function () {
       // if ($ionicHistory.currentStateName() != stateName) {
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });
           // $scope.parameters = JSON.parse($rootScope.params);
           // console.log($scope.parameters);// return
          //  console.log($rootScope.params.catID); return
            //Next view animate will display in back direction
            $ionicViewSwitcher.nextDirection('back');
            
        $state.go($rootScope.state, {catID : $rootScope.params.catID, selectedOpt: $rootScope.params.selectedOpt} );
    //}
    };

     $scope.showListBottomSheet = function ($event,buyer_details) {
        $mdBottomSheet.show({
            templateUrl: 'ui-list-bottom-sheet-template',
            targetEvent: $event,
            scope: $scope.$new(false),
        });
    };

    // For close list bottom sheet.
   // $scope.closeListBottomSheet = function () {
  //      $mdBottomSheet.hide();
  //  } // End of clos

})

appControllers.controller('supplier-contactConnectCtrl', function ($mdToast,$rootScope,$http, $scope, $timeout, $state,$stateParams, $ionicHistory, $ionicViewSwitcher, $ionicLoading,$ionicPopup,$localstorage) {

   console.log("in");
 $scope.company_data = JSON.parse($rootScope.buyer_details);
 $scope.company_name =  $scope.company_data.CompanyName;

 $scope.data = {}
 $scope.sendmessage = function(valid,data){

if(valid){
   
$scope.profile =  JSON.parse($localstorage.get("userdata"));

    $scope.postdata = {UID: $scope.profile.UID, PaidMember: $scope.profile.PaidMember,
                    Type : $scope.profile.Type, 
                    PolicyID : $scope.profile.PolicyID, 
                    userkey : $scope.profile.userkey, 
                    UNAME : $scope.profile.UNAME, 
                    cid : $scope.company_data.CompanyID,
                    subject:  data.subject,
                    message: data.message
    };
    console.log($scope.postdata); 
    
     $http({
    method: 'POST',
    url: base_url+'send_msg',
    data: $.param($scope.postdata),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
        console.log(data);
      
          
        $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 600,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: data.message
                        }
                    }
                });//End showing toast.

    }).error(function(er){

        
           

        $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 600,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: "something went wrong!"
                        }
                    }
                });//End showing toast.

    })
     
 }
 }
    
})




appControllers.controller('DashboardConnectCtrl', function ($http, $scope, $timeout, $state,$stateParams, $ionicHistory, $ionicViewSwitcher, $ionicLoading,$ionicPopup,$localstorage) {

$scope.navigateTo = function (stateName) {
        $timeout(function () {
            //$mdSidenav('left').close();
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });
                $state.go(stateName);
            }
        }, ($scope.isAndroid == false ? 300 : 0));
    };// End navigateTo.






})

appControllers.controller('postSellingLeadsConnectCtrl', function ($http, $scope, $timeout, $state,$stateParams, $ionicHistory, $ionicViewSwitcher, $ionicLoading,$ionicPopup,$localstorage,categoriesService,$mdBottomSheet, $cordovaImagePicker,$cordovaFileTransfer) {

$scope.navigateTo = function (stateName) {
        $timeout(function () {
            //$mdSidenav('left').close();
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });
                $state.go(stateName);
            }
        }, ($scope.isAndroid == false ? 300 : 0));
    };// End navigateTo.
  
categoriesService.async().then(function(d) {
        console.log(d.categories);
       $scope.cat_d = d.categories;
   
  });

// initialForm is the first activity in the controller. 
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {
        // $scope.imageList is for store image data.
        $scope.imageList = [];
        $scope.formdata = {};
        $scope.mydate = new Date();
    };// End initialForm.

    // selectImage is for select image from mobile gallery
    // Parameter :  
    // limit = limit number that can select images.
    $scope.selectImage = function (limit) {
        //hide BottomSheet.
       // $mdBottomSheet.hide();
        // Set options for select image from mobile gallery.
        var options = {
            maximumImagesCount: limit,
            width: 300,
            height: 300,
            quality: 100
        }; // End Set options.

        // select image by calling $cordovaImagePicker.getPictures(options)
        // Parameter :  
        // options = options of select image.
        $cordovaImagePicker.getPictures(options)

            .then(function (results) {
                // store image data to imageList.
                $scope.options = options;
                $scope.imageList = [];
                for (var i = 0; i < results.length; i++) {
                    $scope.imageList.push(results[i]);
                }
            }, function (error) {
                console.log(error);
            });
    };// End selectImage.

    // showListBottomSheet for show BottomSheet.
    $scope.showListBottomSheet = function ($event) {
        $mdBottomSheet.show({
            templateUrl: 'image-picker-actions-template',
            targetEvent: $event,
            scope: $scope.$new(false),
        });
    }; // End showListBottomSheet.

    $scope.setdate  = function(newdate){
        $scope.mydate = newdate;

    }

    $scope.formdata = {
 
        contact_info : "Y",
        offer_type : "Regular"
    };

   
$scope.profile = {};
var trustHosts = true
    var options = {};
$scope.profile =  JSON.parse($localstorage.get("userdata"));
console.log($scope.profile.UID);
    $scope.postdata = function(valid, data){

        if(valid){
 $ionicLoading.show();
        console.log(data);


         $scope.data =  {category: data.category,pro_name : data.product_name,pro_model:data.model_number, pro_price: data.price,pro_detail:data.details,offer_type:data.offer_type,contact_info:data.contact_info,pro_expiry_date:$scope.mydate, images:$scope.imageList,UID: $scope.profile.UID,
            PolicyID :  $scope.profile.PolicyID, PaidMember : $scope.profile.PaidMember


         }; 
console.log( $scope.data);

var server = base_url+'post_sellinglead';
if($scope.imageList[0]){

upload();
  $ionicLoading.hide();
  $state.go("app.sellingleads")
}else {

$http({
    method: 'POST',
    url: base_url+'post_sellinglead',
    data: $.param($scope.data),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(response){


          
      
$scope.response = response;
       console.log(response); 
      
       
        $ionicLoading.hide();
        if(response.status == '1'){

            //console.log(response.data);
            //$localstorage.setObject('userdata',response.data)
           // $scope.navigateTo("app.dashboard")
           $scope.showAlert("Information",response.message);
            $state.go("app.sellingleads")
        }else{

          $scope.showAlert("Information",response.message);
        }
     //   $scope.list = data.products;
     //   $scope.title = data.products[0].CatName;

       // $rootScope.loading = false;
        
    }).error(function (data){
        

        $ionicLoading.hide();
       //  $rootScope.loading = false;



    })
    }
    
    function upload() {
  //  var img = document.getElementById('image');
    var imageURI = $scope.imageList[0];
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    var params =  $scope.data;
    options.params = params;
    options.chunkedMode = false;
    var ft = new FileTransfer();
    ft.upload(imageURI, server, win, fail, options);
}
 
function win(r) {
    alert("Code = " + r.responseCode);
    alert("Response = " + r.response);
   alert("Sent = " + r.bytesSent);

      $scope.showAlert("Information",response.message);




}
 
function fail(error) {
    alert("An error has occurred: Code = " + error.code);
 alert("upload error source " + error.source);
   alert("upload error target " + error.target);

   $scope.showAlert("Information",response.message);
}

  //}, false);

//upload();
 

}
    }


    

       $scope.showAlert = function(title,message) {
   var alertPopup = $ionicPopup.alert({
     title: title,
     template: message
   })}
    $scope.initialForm();
})

appControllers.controller('postBuyingLeadsConnectCtrl', function ($http, $scope, $timeout, $state,$stateParams, $ionicHistory, $ionicViewSwitcher, $ionicLoading,$ionicPopup,$localstorage,categoriesService,$mdBottomSheet) {

$scope.navigateTo = function (stateName) {
        $timeout(function () {
            //$mdSidenav('left').close();
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });
                $state.go(stateName);
            }
        }, ($scope.isAndroid == false ? 300 : 0));
    };// End navigateTo.
  
categoriesService.async().then(function(d) {
        console.log(d.categories);
       $scope.cat_d = d.categories;
   
  });

// initialForm is the first activity in the controller. 
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {
        // $scope.imageList is for store image data.
       
        $scope.formdata = {};
        $scope.mydate = new Date();
    };// End initialForm.


    $scope.backtosupplier = function () {
       // if ($ionicHistory.currentStateName() != stateName) {
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });
           // $scope.parameters = JSON.parse($rootScope.params);
           // console.log($scope.parameters);// return
          //  console.log($rootScope.params.catID); return
            //Next view animate will display in back direction
            $ionicViewSwitcher.nextDirection('back');
            
        $state.go($rootScope.state, {catID : $rootScope.params.catID} );
    //}
    };

   

    $scope.setdate  = function(newdate){
        $scope.mydate = newdate;

    }
$scope.profile = {};
$scope.profile =  JSON.parse($localstorage.get("userdata"));
console.log($scope.profile.UID);
    $scope.postdata = function(valid, data){

        if(valid){
 $ionicLoading.show();
        console.log(data);


         $scope.data =  {category:data.category, pro_name : data.product_name, quantity: data.quantity,pro_details:data.details,purchase_type:data.purchase_type,pro_expiry_date:$scope.mydate,UID: $scope.profile.UID, PolicyID:$scope.profile.PolicyID, PaidMember:$scope.profile.PaidMember}; 
console.log( $scope.data);



     $http({
    method: 'POST',
    url: base_url+'post_buyingLead',
    data: $.param($scope.data),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(response){
       
      
$scope.response = response;
       console.log(response);  
      
       
        $ionicLoading.hide();
        if(response.status == '1'){

            //console.log(response.data);
            //$localstorage.setObject('userdata',response.data)
            // $scope.navigateTo("app.dashboard")
            $scope.showAlert("Information",response.message);
            $ionicLoading.hide();
            $state.go("app.buyingleads");

        }else{

          $scope.showAlert("Information",response.message);
        }
     //   $scope.list = data.products;
     //   $scope.title = data.products[0].CatName;

       // $rootScope.loading = false;
        
    }).error(function (data){
        

        $ionicLoading.hide();
       //  $rootScope.loading = false;
    })

}
    }

       $scope.showAlert = function(title,message) {
   var alertPopup = $ionicPopup.alert({
     title: title,
     template: message
   })}
    $scope.initialForm();
})

appControllers.controller('postProductConnectCtrl', function ($http, $scope, $timeout, $state,$stateParams, $ionicHistory, $ionicViewSwitcher, $ionicLoading,$ionicPopup,$localstorage,categoriesService,$mdBottomSheet, $cordovaImagePicker) {

$scope.isAnimated =  $stateParams.isAnimated;

    // navigateTo is for navigate to other page 
    // by using targetPage to be the destination state. 
    // Parameter :  
    // stateNames = target state to go.
    $scope.navigateTo = function (stateName,params) {
        $timeout(function () {
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });
                //$state.go(stateName);
                 $state.go(stateName, {slug: params.CatID});
            }
        }, ($scope.isAnimated  ? 300 : 0));
    }; // End of navigateTo.
  
categoriesService.async().then(function(d) {
        console.log(d.categories);
       $scope.cat_d = d.categories;
   
  });

// initialForm is the first activity in the controller. 
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {
        // $scope.imageList is for store image data.
        $scope.imageList = [];
        $scope.formdata = {};
        $scope.mydate = new Date();
    };// End initialForm.

    // selectImage is for select image from mobile gallery
    // Parameter :  
    // limit = limit number that can select images.
    $scope.selectImage = function (limit) {
        //hide BottomSheet.
        $mdBottomSheet.hide();
        // Set options for select image from mobile gallery.
        var options = {
            maximumImagesCount: limit,
            width: 300,
            height: 300,
            quality: 100
        }; // End Set options.

        // select image by calling $cordovaImagePicker.getPictures(options)
        // Parameter :  
        // options = options of select image.
        $cordovaImagePicker.getPictures(options)

            .then(function (results) {
                // store image data to imageList.
                $scope.imageList = [];
                for (var i = 0; i < results.length; i++) {
                    $scope.imageList.push(results[i]);
                }
            }, function (error) {
                console.log(error);
            });
    };// End selectImage.

    // showListBottomSheet for show BottomSheet.
    $scope.showListBottomSheet = function ($event) {
        $mdBottomSheet.show({
            templateUrl: 'image-picker-actions-template',
            targetEvent: $event,
            scope: $scope.$new(false),
        });
    }; // End showListBottomSheet.



   
$scope.profile = {};
$scope.profile =  JSON.parse($localstorage.get("userdata"));
console.log($scope.profile.UID);
    $scope.postdata = function(valid, data){

        if(valid){
 $ionicLoading.show();
        console.log(data);


         $scope.data =  {pro_name : data.product_name, pro_model: data.model_number,
            pro_detail:data.details, images:$scope.imageList,UID: $scope.profile.UID, PolicyID: $scope.profile.PolicyID,PaidMember: $scope.profile.PaidMember, category: data.category}; 
console.log( $scope.data);
if($scope.imageList[0]){

upload();
  $ionicLoading.hide();
    $scope.showAlert("Information",response.message);
 $state.go('app.list', {slug: data.category});
}else {


$http({
    method: 'POST',
    url: base_url+'AddProduct',
    data: $.param($scope.data),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(response){
       
      
$scope.response = response;
       console.log(response);  
      
       
        $ionicLoading.hide();
        if(response.status == '1'){

            //console.log(response.data);
            //$localstorage.setObject('userdata',response.data)
           // $scope.navigateTo("app.dashboard")
           $scope.showAlert("Information",response.message);
           $state.go('app.list', {slug: data.category});


        }else{

          $scope.showAlert("Information",response.message);
        }
     //   $scope.list = data.products;
     //   $scope.title = data.products[0].CatName;

       // $rootScope.loading = false;
        
    }).error(function (data){
        

        $ionicLoading.hide();
       //  $rootScope.loading = false;
    })

}

 function upload() {
  //  var img = document.getElementById('image');
    var imageURI = $scope.imageList[0];
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    var params =  $scope.data;
    options.params = params;
    options.chunkedMode = false;
    var ft = new FileTransfer();
    ft.upload(imageURI, server, win, fail, options);
}
 
function win(r) {
    alert("Code = " + r.responseCode);
    alert("Response = " + r.response);
   alert("Sent = " + r.bytesSent);

      $scope.showAlert("Information",response.message);




}
 
function fail(error) {
    alert("An error has occurred: Code = " + error.code);
 alert("upload error source " + error.source);
   alert("upload error target " + error.target);

   $scope.showAlert("Information",response.message);
}


     

}
    }

       $scope.showAlert = function(title,message) {
   var alertPopup = $ionicPopup.alert({
     title: title,
     template: message
   })}
    $scope.initialForm();
})


appControllers.controller('LoginConnectCtrl', function ($http, $scope, $timeout, $state,$stateParams, $ionicHistory, $ionicViewSwitcher, $ionicLoading,$ionicPopup,$localstorage) {

 $localstorage.clear('userdata');
 $scope.navigateTo = function (stateName) {
        $timeout(function () {
            //$mdSidenav('left').close();
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                   disableAnimate: false,
                    disableBack: true
                });
                $state.go(stateName);
            }
        }, ($scope.isAndroid == false ? 300 : 0));
    };// End navigateTo.



     $scope.submitttt = function(isValid,data) {

      if(isValid){
      $ionicLoading.show();
 //console.log(data); return;
       $scope.data = {comp_email : data.uEmail, password: data.password}; 
     $http({
    method: 'POST',
    url: base_url+'login',
    data: $.param($scope.data),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(response){
       
      
       
        $ionicLoading.hide();
        if(response.status == '1'){

            console.log(response.data);
            $localstorage.setObject('userdata',response.data)
            $scope.navigateTo("app.dashboard")

        }else{

          $scope.showAlert("Information",response.message);
        }
     //   $scope.list = data.products;
     //   $scope.title = data.products[0].CatName;

       // $rootScope.loading = false;
        
    }).error(function (data){
        

        $ionicLoading.hide();
       //  $rootScope.loading = false;
    })
 }
    }


    $scope.signup = function(){


      var a = cordova.InAppBrowser.open('http://www.pcexporters.com/user/UserSignUp', '_blank', 'location=yes');


    }


    $scope.showAlert = function(title,message) {
   var alertPopup = $ionicPopup.alert({
     title: title,
     template: message
   })}
})


appControllers.controller('sellingleadsConnectCtrl', function ($rootScope, MainPageService, $http, $scope, $timeout, $state,$stateParams, $ionicHistory, $ionicViewSwitcher, InfoService) {
  $scope.navigateTo = function (stateName,params) {
        $timeout(function () {
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });
                console.log(params);
                 $state.go(stateName, {slug: JSON.stringify(params)});
            }
        }, ($scope.isAnimated  ? 300 : 0));
    }; // End of navigateTo.


 $scope.backtolisting = function () {
       // if ($ionicHistory.currentStateName() != stateName) {
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });
           // $scope.parameters = JSON.parse($rootScope.params);
           // console.log($scope.parameters);// return
          //  console.log($rootScope.params.catID); return
            //Next view animate will display in back direction
            $ionicViewSwitcher.nextDirection('back');
            //console.log($stateParams); return;
        $state.go($rootScope.state, {slug :$stateParams.catID} );
    //}
    };

 $scope.list = [];
  $scope.moredata = false;
   var   limit = 0;

    $scope.doRefresh = function() {

        $scope.data = {last :$scope.maxid, page: 0, catID:$stateParams.catID}; 
     $http({
    method: 'POST',
    url: base_url+'ListSellingLeads',
    data: $.param($scope.data),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
      console.log(data.sellingleads); //return;
          $scope.title = data.title;
        console.log(limit);
        if(data.sellingleads.length > 0){

           for (var i = 0; i < data.sellingleads.length; i++){

            $scope.list.unshift({

         "ID" :  data.sellingleads[i].ID,
         "premium_post" :  data.sellingleads[i].premium_post,
         "CID":  data.sellingleads[i].CID,
         "CategoryID":  data.sellingleads[i].CategoryID,
         "Product_Keyword":  data.sellingleads[i].Product_Keyword,
         "sef_url":  data.sellingleads[i].sef_url,
         "ProductModel":  data.sellingleads[i].ProductModel,
         "ProductImage":  data.sellingleads[i].ProductImage,
         "Details":  data.sellingleads[i].Details,
         "PaymentMethod":  data.sellingleads[i].PaymentMethod,
         "Packaging" :  data.sellingleads[i].Packaging,
         "SellType" :  data.sellingleads[i].SellType,
         "ReSubmitted" :  data.sellingleads[i].ReSubmitted,
         "Counter":  data.sellingleads[i].Counter,
         "Quantity":  data.sellingleads[i].Quantity,
         "Price":  data.sellingleads[i].Price,
         "SubmissionDate":  data.sellingleads[i].SubmissionDate,
         "Expiry_Date":  data.sellingleads[i].Expiry_Date,
         "re_sbumission_date":  data.sellingleads[i].re_sbumission_date,
         "Status":  data.sellingleads[i].Status,
         "PriceMethod":  data.sellingleads[i].PriceMethod,
         "DeliveryLocation":  data.sellingleads[i].DeliveryLocation,
         "DeliveryDate":  data.sellingleads[i].DeliveryDate,
         "DeliveryLeadTime":  data.sellingleads[i].DeliveryLeadTime,
         "SendEmail":  data.sellingleads[i].SendEmail,
         "Promo":  data.sellingleads[i].Promo,
         "Approved":  data.sellingleads[i].Approved,
         "DeleteLead":  data.sellingleads[i].DeleteLead,
         "repost":  data.sellingleads[i].repost,
         "currency":  data.sellingleads[i].currency,
         "reason":  data.sellingleads[i].reason,
         "is_hide":  data.sellingleads[i].is_hide,
         "no_of_views":  data.sellingleads[i].no_of_views,
         "no_of_inquiry":  data.sellingleads[i].no_of_inquiry,
         "is_sold":  data.sellingleads[i].is_sold,
         "click_message":  data.sellingleads[i].click_message,
         "contact_info":  data.sellingleads[i].contact_info,
         "FirstName":  data.sellingleads[i].FirstName,
         "LastName":  data.sellingleads[i].LastName,
         "CompanyName":  data.sellingleads[i].CompanyName,
         "CompanyID":  data.sellingleads[i].CompanyID,
         "CompanyLogo":  data.sellingleads[i].CompanyLogo,
         "PaidMember":  data.sellingleads[i].PaidMember,
         "BusinessType":  data.sellingleads[i].BusinessType,
         "CountryID":  data.sellingleads[i].CountryID,
         "CatName":  data.sellingleads[i].CatName,
         "image_path":  data.sellingleads[i].image_path

          })

       
} 
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply()
        }else {
 
 $scope.$broadcast('scroll.refreshComplete');

        }
       // $scope.list.push();
      
       // $ionicLoading.hide();

       // $rootScope.loading = false;
        
    }).error(function (data){
         //$ionicLoading.hide();
       //  $rootScope.loading = false;
    })
    $scope.$broadcast('scroll.refreshComplete');
  };

  

$scope.loaddata = function(){


 //limit = limit == 0 ? 0 : limit;
$scope.data = {page: parseInt(limit * 1), catID:$stateParams.catID}; 
     $http({
    method: 'POST',
    url: base_url+'ListSellingLeads',
    data: $.param($scope.data),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
      console.log(data.sellingleads); //return;
        $scope.title = data.title;
        console.log(limit);
        if(data.sellingleads.length > 0){

            $scope.maxid = data.sellingleads[0].ID;
           for (var i = 0; i < data.sellingleads.length; i++){

            $scope.list.push({

         "ID" :  data.sellingleads[i].ID,
         "premium_post" :  data.sellingleads[i].premium_post,
         "CID":  data.sellingleads[i].CID,
         "CategoryID":  data.sellingleads[i].CategoryID,
         "Product_Keyword":  data.sellingleads[i].Product_Keyword,
         "sef_url":  data.sellingleads[i].sef_url,
         "ProductModel":  data.sellingleads[i].ProductModel,
         "ProductImage":  data.sellingleads[i].ProductImage,
         "Details":  data.sellingleads[i].Details,
         "PaymentMethod":  data.sellingleads[i].PaymentMethod,
         "Packaging" :  data.sellingleads[i].Packaging,
         "SellType" :  data.sellingleads[i].SellType,
         "ReSubmitted" :  data.sellingleads[i].ReSubmitted,
         "Counter":  data.sellingleads[i].Counter,
         "Quantity":  data.sellingleads[i].Quantity,
         "Price":  data.sellingleads[i].Price,
         "SubmissionDate":  data.sellingleads[i].SubmissionDate,
         "Expiry_Date":  data.sellingleads[i].Expiry_Date,
         "re_sbumission_date":  data.sellingleads[i].re_sbumission_date,
         "Status":  data.sellingleads[i].Status,
         "PriceMethod":  data.sellingleads[i].PriceMethod,
         "DeliveryLocation":  data.sellingleads[i].DeliveryLocation,
         "DeliveryDate":  data.sellingleads[i].DeliveryDate,
         "DeliveryLeadTime":  data.sellingleads[i].DeliveryLeadTime,
         "SendEmail":  data.sellingleads[i].SendEmail,
         "Promo":  data.sellingleads[i].Promo,
         "Approved":  data.sellingleads[i].Approved,
         "DeleteLead":  data.sellingleads[i].DeleteLead,
         "repost":  data.sellingleads[i].repost,
         "currency":  data.sellingleads[i].currency,
         "reason":  data.sellingleads[i].reason,
         "is_hide":  data.sellingleads[i].is_hide,
         "no_of_views":  data.sellingleads[i].no_of_views,
         "no_of_inquiry":  data.sellingleads[i].no_of_inquiry,
         "is_sold":  data.sellingleads[i].is_sold,
         "click_message":  data.sellingleads[i].click_message,
         "contact_info":  data.sellingleads[i].contact_info,
         "FirstName":  data.sellingleads[i].FirstName,
         "LastName":  data.sellingleads[i].LastName,
         "CompanyName":  data.sellingleads[i].CompanyName,
         "CompanyID":  data.sellingleads[i].CompanyID,
         "CompanyLogo":  data.sellingleads[i].CompanyLogo,
         "PaidMember":  data.sellingleads[i].PaidMember,
         "BusinessType":  data.sellingleads[i].BusinessType,
         "CountryID":  data.sellingleads[i].CountryID,
         "CatName":  data.sellingleads[i].CatName,
         "image_path":  data.sellingleads[i].image_path

          })

       
} limit = limit+10;
//console.log(10);
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }else {
 $scope.moredata = true;
 $scope.$broadcast('scroll.infiniteScrollComplete');

        }
       // $scope.list.push();
      
       // $ionicLoading.hide();

       // $rootScope.loading = false;
        
    }).error(function (data){
         //$ionicLoading.hide();
       //  $rootScope.loading = false;
    })
    }

})

appControllers.controller('buyingleadsConnectCtrl', function ($rootScope, MainPageService, $http, $scope, $timeout, $state,$stateParams, $ionicHistory, $ionicViewSwitcher, InfoService) {
$scope.navigateTo = function (stateName,params) {
        $timeout(function () {
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });
                console.log(params);
                 $state.go(stateName, {slug: JSON.stringify(params)});
            }
        }, ($scope.isAnimated  ? 300 : 0));
    }; // End of navigateTo.

 $scope.list = [];
  $scope.moredata = false;
   var   limit = 0;

   $scope.backtolisting = function () {
       // if ($ionicHistory.currentStateName() != stateName) {
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });
           // $scope.parameters = JSON.parse($rootScope.params);
           // console.log($scope.parameters);// return
          //  console.log($rootScope.params.catID); return
            //Next view animate will display in back direction
            $ionicViewSwitcher.nextDirection('back');
            //console.log($stateParams); return;
        $state.go($rootScope.state, {slug :$stateParams.catID} );
    //}
    };

    $scope.doRefresh = function() {

        $scope.data = {last :$scope.maxid, page: 0,catID:$stateParams.catID}; 
     $http({
    method: 'POST',
    url: base_url+'ListBuyingLeads',
    data: $.param($scope.data),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
      console.log(data.buyingleads); //return;
        $scope.title = data.title;
        console.log(limit);
        if(data.buyingleads.length > 0){

           for (var i = 0; i < data.buyingleads.length; i++){

            $scope.list.unshift({

         "ID" :  data.buyingleads[i].ID,
         "UserID" :  data.buyingleads[i].UserID,
         "CID":  data.buyingleads[i].CID,
         "CatID":  data.buyingleads[i].CatID,
         "product_description":  data.buyingleads[i].product_description,
         "additional_info":  data.buyingleads[i].additional_info,
         "CompanyName":  data.buyingleads[i].CompanyName,
         "CompanyLogo":  data.buyingleads[i].CompanyLogo,
         "PaidMember":  data.buyingleads[i].PaidMember,
          })

       
} 
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$apply()
        }else {
 
 $scope.$broadcast('scroll.refreshComplete');

        }
       // $scope.list.push();
      
       // $ionicLoading.hide();

       // $rootScope.loading = false;
        
    }).error(function (data){
         //$ionicLoading.hide();
       //  $rootScope.loading = false;
    })
    $scope.$broadcast('scroll.refreshComplete');
  };

  


  $scope.no_preview = "uploads/logo/No_image.jpg";

$scope.loaddata = function(){


 limit = limit == 0 ? 0 : limit;
$scope.data = {page: (limit * 1), catID:$stateParams.catID}; 
     $http({
    method: 'POST',
    url: base_url+'ListBuyingLeads',
    data: $.param($scope.data),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
      console.log(data); //return;
        //return;
        
        if(data.buyingleads.length > 0){
        $scope.title = data.title;
        $scope.maxid = data.buyingleads[0].ID;
        $scope.catID = data.buyingleads[0].CatID;
        //console.log('catID'+data.buyingleads[0].catID);
           for (var i = 0; i < data.buyingleads.length; i++){

            $scope.list.push({

         "ID" :  data.buyingleads[i].ID,
         "UserID" :  data.buyingleads[i].UserID,
         "CID":  data.buyingleads[i].CID,
         "CatID":  data.buyingleads[i].CatID,
         "product_description":  data.buyingleads[i].product_description,
         "additional_info":  data.buyingleads[i].additional_info,
         "CompanyName":  data.buyingleads[i].CompanyName,
         "CompanyLogo":  data.buyingleads[i].CompanyLogo,
         "PaidMember":  data.buyingleads[i].PaidMember,
         
          })

       
} limit = limit + 10;
console.log(limit);
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }else {
 $scope.moredata = true;
 $scope.$broadcast('scroll.infiniteScrollComplete');

        }
       // $scope.list.push();
      
       // $ionicLoading.hide();

       // $rootScope.loading = false;
        
    }).error(function (data){
         //$ionicLoading.hide();
       //  $rootScope.loading = false;
    })
    }
})




appControllers.controller('listConnectCtrl', function ($ionicModal,$mdMedia,$mdDialog,$http, $scope, $timeout, $state,$stateParams, $ionicHistory, $ionicViewSwitcher, InfoService, $ionicLoading,$mdDialog, $rootScope) {

//$scope.title = $stateParams.slug;
 // navigateTo is for navigate to other page
    // by using targetPage to be the destination state.
    // Parameter :
    // stateNames = target state to go.
    // objectData = Object data will send to destination state.
    $scope.navigateTo = function (stateName,objectData) {
        if ($ionicHistory.currentStateName() != stateName) {
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });

            //Next view animate will display in back direction
           // $ionicViewSwitcher.nextDirection('back');
           // console.log(objectData);
            $state.go(stateName, {
                slug: JSON.stringify(objectData)
            });
        }
    }; // End of navigateTo.



     $scope.list = [];
  $scope.moredata = false;
   var   limit = 0;
$scope.no_preview = "uploads/logo/No_image.jpg";
    
    

$scope.goto = function (slug) {
      

       //location.path("app/list/"+slug.sef_url);
         $state.go('app.list', {slug: slug.sef_url});
   }

     //console.log(":")

       $ionicModal.fromTemplateUrl('../templates/main/html/cat-option.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

   $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
$scope.openFromLeft = function(ev) {
    $rootScope.category_data = ev;
 //$scope.modal.show();
 // goToSetting is for navigate to Dashboard Setting page
        $state.go("app.cat-options");
  
  };
  

   $scope.navgoto = function(selection){
      $scope.modal.hide();
    $rootScope.selectdata = selection
  $state.go('app.listcatMembers', {catID: $scope.category_data.ProductCatID, selectedOpt:selection});
    
   }
    $scope.navgobuy = function(selection){
  $scope.modal.hide();
  
        //if ($ionicHistory.currentStateName() != stateName) {
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: false
            });

            //Next view animate will display in back direction
          //  $ionicViewSwitcher.nextDirection('back');
    $rootScope.selectdata = selection
  $state.go('app.buyingleads', {catID: $scope.category_data.ProductCatID});
  //  }
   }
   $scope.navgosell = function(selection){
  $scope.modal.hide();
  $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: false
            });
    $rootScope.selectdata = selection
  $state.go('app.sellingleads', {catID: $scope.category_data.ProductCatID});
    
   }

    // fetch category data 

    //  MainPageService.async().then(function(d) {


    $scope.doRefresh = function() {
    //$scope.todos.unshift({name: 'Incoming todo ' + Date.now()})
    $scope.data = {last : $scope.maxid, cat_id : $stateParams.slug, page: 0, categoryselection : $rootScope.selectdata}; 
    $http({
    method: 'POST',
    url: base_url+'CategoryListing',
    data: $.param($scope.data),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
      
         
         console.log(data.products);
        if(data.products.length > 0){

         //    $scope.title = data.products[0].CatName;
          $scope.maxid = data.products[0].ProductID;

           for (var i = 0; i < data.products.length; i++){

            $scope.list.unshift({

            "CatName"  : data.products[i].CatName,
            "CompanyName" : data.products[i].CompanyName,
            "FirstName": data.products[i].FirstName,
            "Keywords" : data.products[i].Keywords,
            "LastName": data.products[i].LastName,
            "NewArrival": data.products[i].NewArrival,
            "PEdit": data.products[i].PEdit,
            "ProductActive": data.products[i].ProductActive,
            "ProductCatID": data.products[i].ProductCatID,
            "ProductCompanyID": data.products[i].ProductCompanyID,
            "ProductDescription":  data.products[i].ProductDescription,
            "ProductID" :  data.products[i].ProductID,
            "ProductImage":  data.products[i].ProductImage,
            "ProductModel":  data.products[i].ProductModel,
            "ProductName":  data.products[i].ProductName,
            "ProductPrice":  data.products[i].ProductPrice,
            "ProductSubCat":  data.products[i].ProductSubCat,
            "QtyAvailable":  data.products[i].QtyAvailable,
            "ShowType" :  data.products[i].ShowType,
            "image_path" :  data.products[i].image_path,
            "reason" :  data.products[i].reason,
            "sef_url":  data.products[i].sef_url,
            })

            $scope.catData = $scope.list[0];

            //console.list[0];
         
}

    $scope.$broadcast('scroll.refreshComplete');
    //$scope.$apply()
        }else {
$scope.$broadcast('scroll.refreshComplete');
    

        }
       // $scope.list.push();
      
       // $ionicLoading.hide();

       // $rootScope.loading = false;
        
    }).error(function (data){
         //$ionicLoading.hide();
       //  $rootScope.loading = false;
       $scope.$broadcast('scroll.refreshComplete');
   
    })
    
  };


//console.log($stateParams.slug);

$scope.loaddata = function(){
  limit = limit == 0 ? 1 : limit;
  //$ionicLoading.show();
$scope.data = {cat_id : $stateParams.slug, page: limit, categoryselection : $rootScope.selectdata}; 
     $http({
    method: 'POST',
    url: base_url+'CategoryListing',
    data: $.param($scope.data),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
      //$ionicLoading.hide();
          $scope.title = data.products[0].CatName;
         console.log(data.products);
        if(data.products.length > 0){
 $scope.maxid = data.products[0].ProductID;
           for (var i = 0; i < data.products.length; i++){
       
            $scope.list.push({

            "CatName"  : data.products[i].CatName,
            "CompanyName" : data.products[i].CompanyName,
            "FirstName": data.products[i].FirstName,
            "Keywords" : data.products[i].Keywords,
            "LastName": data.products[i].LastName,
            "NewArrival": data.products[i].NewArrival,
            "PEdit": data.products[i].PEdit,
            "ProductActive": data.products[i].ProductActive,
            "ProductCatID": data.products[i].ProductCatID,
            "ProductCompanyID": data.products[i].ProductCompanyID,
            "ProductDescription":  data.products[i].ProductDescription,
            "ProductID" :  data.products[i].ProductID,
            "ProductImage":  data.products[i].ProductImage,
            "ProductModel":  data.products[i].ProductModel,
            "ProductName":  data.products[i].ProductName,
            "ProductPrice":  data.products[i].ProductPrice,
            "ProductSubCat":  data.products[i].ProductSubCat,
            "QtyAvailable":  data.products[i].QtyAvailable,
            "ShowType" :  data.products[i].ShowType,
            "image_path" :  data.products[i].image_path,
            "reason" :  data.products[i].reason,
            "sef_url":  data.products[i].sef_url,
            })



         
}
 $scope.catData = $scope.list[0];

 limit = limit * 10;
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }else {
 $scope.moredata = true;
 $scope.$broadcast('scroll.infiniteScrollComplete');

        }
       // $scope.list.push();
      
       // $ionicLoading.hide();

       // $rootScope.loading = false;
        
    }).error(function (data){
         //$ionicLoading.hide();
       //  $rootScope.loading = false;
       $scope.$broadcast('scroll.infiniteScrollComplete');
    })
    }
     
     $scope.backtosupplier = function (stateName) {
        if ($ionicHistory.currentStateName() != stateName) {
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });

            //Next view animate will display in back direction
            $ionicViewSwitcher.nextDirection('back');
        $state.go(stateName);
    }
    };

     
})

/*-------------list category memebers --------------------------*/

appControllers.controller('listcatMembersConnectCtrl', function ($rootScope,$http, $scope, $timeout, $state,$stateParams, $ionicHistory, $ionicViewSwitcher, $ionicLoading,$ionicPopup,$localstorage ) {

console.log($stateParams.catID);
//$scope.title = $stateParams.slug;
 // navigateTo is for navigate to other page
    // by using targetPage to be the destination state.
    // Parameter :
    // stateNames = target state to go.
    // objectData = Object data will send to destination state.
    $scope.navigateTo = function (stateName,objectData) {
        if ($ionicHistory.currentStateName() != stateName) {
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });

            //Next view animate will display in back direction
           // $ionicViewSwitcher.nextDirection('back');
           // console.log(objectData);
            $state.go(stateName, {
                slug: JSON.stringify(objectData)
            });
        }
    }; // End of navigateTo.



 $scope.backtosupplier = function (stateName) {
        if ($ionicHistory.currentStateName() != stateName) {
            $ionicHistory.nextViewOptions({
                disableAnimate: false,
                disableBack: true
            });

            //Next view animate will display in back direction
            $ionicViewSwitcher.nextDirection('back');
        $state.go(stateName, {slug : $stateParams.catID});
    }
    };


 $scope.list = [];
  $scope.moredata = false;
   var   limit = 0;

  $scope.doRefresh = function() {
    //$scope.todos.unshift({name: 'Incoming todo ' + Date.now()})
    $scope.data = {last : $scope.maxid,  page: 0,catID:$stateParams.catID, selectedOpt:$stateParams.selectedOpt}; 
     $http({
    method: 'POST',
    url: base_url+'listcatMembers',
    data: $.param($scope.data),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
      
         
        // console.log(data);
        if(data.users.length > 0){

          $scope.title = data.title;
          $scope.maxid = data.users[0].CompanyID;

           for (var i = 0; i < data.users.length; i++){

            $scope.list.unshift({

         
         "CompanyID" :  data.users[i].CompanyID,
         "CompanyName": data.users[i].CompanyName,
         "PersonTitle":  data.users[i].PersonTitle,
         "FirstName": data.users[i].FirstName,
         "LastName": data.users[i].LastName,
         "Position": data.users[i].Position,
         "ChFirstName": data.users[i].ChFirstName,
         "ChLastName": data.users[i].ChLastName,
         "BusinessType": data.users[i].BusinessType,
         "Address": data.users[i].Address,
         "Unit_Office": data.users[i].Unit_Office,
         "Road_Name": data.users[i].Road_Name,
         "Building_Name": data.users[i].Building_Name,
         "City": data.users[i].City,
         "Zip": data.users[i].Zip,
         "State": data.users[i].State,
         "CountryID": data.users[i].CountryID,
         "IPCountry": data.users[i].IPCountry,
         "Telephone": data.users[i].Telephone,
         "Fax": data.users[i].Fax,
         "Email": data.users[i].Email,
         "cc_email": data.users[i].cc_email,
         "official_email": data.users[i].official_email,
         "MSN": data.users[i].MSN,
         "Yahoo": data.users[i].Yahoo,
         "Skype": data.users[i].Skype,
         "ICQ": data.users[i].ICQ,
         "ShowMessengerID": data.users[i].ShowMessengerID,
         "URL": data.users[i].URL,
         "CompanyActive": data.users[i].CompanyActive,
         "Password": data.users[i].Password,
         "UserKey": data.users[i].UserKey,
         "Introduction": data.users[i].Introduction,
         "YearEstablished":data.users[i].YearEstablished,
         "CompanyType":data.users[i].CompanyType,
         "Employees":data.users[i].Employees,
         "LegalRpr":data.users[i].LegalRpr,
         "PlaceInc":data.users[i].PlaceInc,
         "AnnualTurnover":data.users[i].AnnualTurnover,
         "LastLoginDate":data.users[i].LastLoginDate,
         "LastLoginIP":data.users[i].LastLoginIP,
         "CompanyLogo":data.users[i].CompanyLogo,
         "CompanyCode":data.users[i].CompanyCode,
         "Priority":data.users[i].Priority,
         "SignUpDate":data.users[i].SignUpDate,
         "PaidMember":data.users[i].PaidMember,
         "TransactionID":data.users[i].TransactionID,
         "PolicyID":data.users[i].PolicyID,
         "SecurityQuestion":data.users[i].SecurityQuestion,
         "YourAnswer": data.users[i].YourAnswer,
         "FeaturedCompany":data.users[i].FeaturedCompany,
         "FlashLogo": data.users[i].FlashLogo,
         "Approved":data.users[i].Approved,
         "PaymentProcessed":data.users[i].PaymentProcessed,
         "VerificationCode":data.users[i].VerificationCode,
         "VoucherNo":data.users[i].VoucherNo,
         "Renewal_date":data.users[i].Renewal_date,
         "Expiry_date":data.users[i].Expiry_date,
         "PriceListComments":data.users[i].PriceListComments,
         "PriceListUpdationDate":data.users[i].PriceListUpdationDate,
         "Pricelistfile":data.users[i].Pricelistfile,
         "Verify_date":data.users[i].Verify_date,
         "shorturl":data.users[i].shorturl,
         "ReceiveLeads":data.users[i].ReceiveLeads,
         "BuyingLeadsEmail":data.users[i].BuyingLeadsEmail,
         "SellingLeadsEmail":data.users[i].SellingLeadsEmail,
         "signup_country":data.users[i].signup_country,
         "messenger_clicks":data.users[i].messenger_clicks,
         "skip_ids":data.users[i].skip_ids,
         "remind_at":data.users[i].remind_at,
         "verified":data.users[i].verified,
         "sef_url":data.users[i].sef_url,
         "profile_picture":data.users[i].profile_picture,
         "new_member_notification":data.users[i].new_member_notification,
         "mobile":data.users[i].mobile,
         "linkdin":data.users[i].linkdin,
         "CountryName":data.users[i].CountryName,
         "CountryImage":data.users[i].CountryImage,
         "CCode":data.users[i].CCode,
         "Gmtdiff":data.users[i].Gmtdiff,
         "buyer_featured":data.users[i].buyer_featured,

          })



         
}

    $scope.$broadcast('scroll.refreshComplete');
    //$scope.$apply()
        }else {
$scope.$broadcast('scroll.refreshComplete');
    

        }
       // $scope.list.push();
      
       // $ionicLoading.hide();

       // $rootScope.loading = false;
        
    }).error(function (data){
         //$ionicLoading.hide();
       //  $rootScope.loading = false;
       $scope.$broadcast('scroll.refreshComplete');
   
    })
    
  };

$scope.loaddata = function(){


limit = limit == 0 ? 0 : limit;
$scope.data = {page: (limit * 1), catID:$stateParams.catID, selectedOpt:$stateParams.selectedOpt}; 
     $http({
    method: 'POST',
    url: base_url+'listcatMembers',
    data: $.param($scope.data),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(data){
        //console.log(data.title);
      $scope.title = data.title;
          
        $scope.no_preview = "uploads/logo/No_image.jpg";
        if(data.users.length > 0){
 $scope.maxid = data.users[0].CompanyID;
           for (var i = 0; i < data.users.length; i++){

            $scope.list.push({

         "CompanyID" :  data.users[i].CompanyID,
         "CompanyName": data.users[i].CompanyName,
         "PersonTitle":  data.users[i].PersonTitle,
         "FirstName": data.users[i].FirstName,
         "LastName": data.users[i].LastName,
         "Position": data.users[i].Position,
         "ChFirstName": data.users[i].ChFirstName,
         "ChLastName": data.users[i].ChLastName,
         "BusinessType": data.users[i].BusinessType,
         "Address": data.users[i].Address,
         "Unit_Office": data.users[i].Unit_Office,
         "Road_Name": data.users[i].Road_Name,
         "Building_Name": data.users[i].Building_Name,
         "City": data.users[i].City,
         "Zip": data.users[i].Zip,
         "State": data.users[i].State,
         "CountryID": data.users[i].CountryID,
         "IPCountry": data.users[i].IPCountry,
         "Telephone": data.users[i].Telephone,
         "Fax": data.users[i].Fax,
         "Email": data.users[i].Email,
         "cc_email": data.users[i].cc_email,
         "official_email": data.users[i].official_email,
         "MSN": data.users[i].MSN,
         "Yahoo": data.users[i].Yahoo,
         "Skype": data.users[i].Skype,
         "ICQ": data.users[i].ICQ,
         "ShowMessengerID": data.users[i].ShowMessengerID,
         "URL": data.users[i].URL,
         "CompanyActive": data.users[i].CompanyActive,
         "Password": data.users[i].Password,
         "UserKey": data.users[i].UserKey,
         "Introduction": data.users[i].Introduction,
         "YearEstablished":data.users[i].YearEstablished,
         "CompanyType":data.users[i].CompanyType,
         "Employees":data.users[i].Employees,
         "LegalRpr":data.users[i].LegalRpr,
         "PlaceInc":data.users[i].PlaceInc,
         "AnnualTurnover":data.users[i].AnnualTurnover,
         "LastLoginDate":data.users[i].LastLoginDate,
         "LastLoginIP":data.users[i].LastLoginIP,
         "CompanyLogo":data.users[i].CompanyLogo,
         "CompanyCode":data.users[i].CompanyCode,
         "Priority":data.users[i].Priority,
         "SignUpDate":data.users[i].SignUpDate,
         "PaidMember":data.users[i].PaidMember,
         "TransactionID":data.users[i].TransactionID,
         "PolicyID":data.users[i].PolicyID,
         "SecurityQuestion":data.users[i].SecurityQuestion,
         "YourAnswer": data.users[i].YourAnswer,
         "FeaturedCompany":data.users[i].FeaturedCompany,
         "FlashLogo": data.users[i].FlashLogo,
         "Approved":data.users[i].Approved,
         "PaymentProcessed":data.users[i].PaymentProcessed,
         "VerificationCode":data.users[i].VerificationCode,
         "VoucherNo":data.users[i].VoucherNo,
         "Renewal_date":data.users[i].Renewal_date,
         "Expiry_date":data.users[i].Expiry_date,
         "PriceListComments":data.users[i].PriceListComments,
         "PriceListUpdationDate":data.users[i].PriceListUpdationDate,
         "Pricelistfile":data.users[i].Pricelistfile,
         "Verify_date":data.users[i].Verify_date,
         "shorturl":data.users[i].shorturl,
         "ReceiveLeads":data.users[i].ReceiveLeads,
         "BuyingLeadsEmail":data.users[i].BuyingLeadsEmail,
         "SellingLeadsEmail":data.users[i].SellingLeadsEmail,
         "signup_country":data.users[i].signup_country,
         "messenger_clicks":data.users[i].messenger_clicks,
         "skip_ids":data.users[i].skip_ids,
         "remind_at":data.users[i].remind_at,
         "verified":data.users[i].verified,
         "sef_url":data.users[i].sef_url,
         "profile_picture":data.users[i].profile_picture,
         "new_member_notification":data.users[i].new_member_notification,
         "mobile":data.users[i].mobile,
         "linkdin":data.users[i].linkdin,
         "CountryName":data.users[i].CountryName,
         "CountryImage":data.users[i].CountryImage,
         "CCode":data.users[i].CCode,
         "Gmtdiff":data.users[i].Gmtdiff,
         "buyer_featured":data.users[i].buyer_featured,

          })

       
} limit = limit + 10;
//console.log(limit);
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }else {
 $scope.moredata = true;
 $scope.$broadcast('scroll.infiniteScrollComplete');

        }
       // $scope.list.push();
      
       // $ionicLoading.hide();

       // $rootScope.loading = false;
        
    }).error(function (data){
         //$ionicLoading.hide();
       //  $rootScope.loading = false;
    })
    }



})

