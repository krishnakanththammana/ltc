app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('initial', {
      url: "/",
      templateUrl: 'pages/login.html',
      controller: 'loginCtrl'
    }).state('main', {
      url: "/main",
      templateUrl: 'pages/main.html',
      abstract:true,
      controller: 'mainCtrl'
    }).state('main.overview', {
      url: "/overview",
      templateUrl: 'pages/dashboard.html',
      controller: 'dashboardCtrl'
    }).state('main.symptoms', {
      url: "/symptoms",
      templateUrl: 'pages/symptoms.html',
      controller: 'symptomsCtrl'
    }).state('main.map', {
      url: "/map",
      templateUrl: 'pages/map.html',
      controller: 'mapCtrl'
    }).state('main.diet', {
      url: "/diet",
      templateUrl: 'pages/diet.html',
      controller: 'dietCtrl'
    }).state('main.prescription', {
      url: "/prescription",
      templateUrl: 'pages/prescription.html',
      controller: 'prescriptionCtrl'
    }).state('main.community', {
      url: "/community",
      templateUrl: 'pages/community.html',
      controller: 'communityCtrl'
    }).state('main.services', {
      url: "/services",
      templateUrl: 'pages/services.html',
      controller: 'servicesCtrl'
    }).state('main.goal', {
      url: "/goals",
      templateUrl: 'pages/goal.html',
      controller: 'goalCtrl'
    }).state('main.expense', {
      url: "/expense",
      templateUrl: 'pages/expense.html',
      controller: 'expenseCtrl'
    }).state('main.dev', {
      url: "/dev",
      templateUrl: 'pages/dev.html',
      controller: 'devCtrl'
    });
    $urlRouterProvider.otherwise("/");
});
