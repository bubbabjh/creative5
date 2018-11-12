var app = window.angular.module('app', [])

app.factory('mainFact', mainFact)
app.controller('mainCtrl', mainCtrl)

function mainFact($http) {

    var API_ROOT = 'activity'
    return {
        get: function() {
            return $http
                .get(API_ROOT)
                .then(function(resp) {
                    return resp.data
                })
        },
        post: function(formData) {
            return $http
                .post(API_ROOT, formData)
                .then(function(resp) {
                    console.log("Post worked");
                })
        }
    }
}

function mainCtrl($scope, mainFact) {

    $scope.activities = []

    mainFact.get()
        .then(function(data) {
            $scope.activities = data
        })
    $scope.addPost = function() {
        var postData = { name: $scope.name, idea: $scope.idea };
        console.log(postData);
        mainFact.post(postData); // Send the data to the back end
        alert("Your post has been posted");
        location.reload();
    }
}
