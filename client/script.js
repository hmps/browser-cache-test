console.log('running');

// window.onpageshow = function (event) {
//   if (event.persisted) {
//     window.location.reload()
//   }
// };

angular.module('ngDemo', ['ng'])
  .controller('testController', ['$http', function testController($http) {
    const vm = {
      users: [],
      fetchUsers,
      login,
      logOut,
      status: false,
    };

    checkStatus();
    fetchUsers();

    return vm;

    function checkStatus() {
      $http.get('http://localhost:4728/status')
        .then(res => {
          vm.status = res.data;
        });
    }

    function fetchUsers() {
      $http.get('http://localhost:4728/users')
        .then(res => {
          vm.users = res.data;
        });
    }

    function logOut() {
      $http.get('http://localhost:4728/logout')
        .then(res => {
          location.href = 'http://apsis.com';
        });
    }

    function login() {
      $http.get('http://localhost:4728/login')
        .then(res => {
          vm.status = true;
        });
    }
  }]);
