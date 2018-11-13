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
        },
        delete: function(formData) {
            return $http
                .delete(API_ROOT, formData)
        }
    }
}

function mainCtrl($scope, mainFact) {

    $scope.activities = []
    var totalPosts = 9;

    mainFact.get()
        .then(function(data) {
            $scope.activities = data
        })
    $scope.addPost = function() {
        var postData = { name: $scope.name, idea: $scope.idea };
        console.log(postData);
        mainFact.post(postData); // Send the data to the back end
        //alert("Your post has been posted");
        location.reload();
    }
    $scope.deletePost = function()
    {
        var postData = {name: $scope.toDelete};
        mainFact.delete(postData);
        location.reload();
    }
    $scope.setLimit = function()
    {
        return totalPosts;
    }
    $scope.loadMore = function()
    {
        totalPosts += 9;
        //location.reload();
    }
}
