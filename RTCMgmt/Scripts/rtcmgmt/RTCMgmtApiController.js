//var app = angular.module('app', []);

//app.controller('RegisterController', ['$rootScope', '$scope', '$http', '$timeout', '$ctrl', function ($rootScope, $scope, $http, $timeout, $ctrl) {

//    $scope.init = function (itemId) {
//        $scope.ItemId = itemId;

//        $http.get('api/RTCMgmtApi/RTCWorkItem', { id: itemId }).success(function (res) {
//            $.scope.wItem = res.Data;
//        })
//    }
//}])


function bindRTCMgmtApiPageEvent() {
    $(document).on('click', '#jqueryGetFunctionBtn', function () {
        JQueryGetApi();
    });
    $(document).on('click', '#jqueryGetFunctionBtnWithParameter', function () {
        JQueryGetApiWithParameter();
    });
    $(document).on('click', '#jqueryPostFunctionBtn', function () {
        JQueryPostApi();
    });
}

function JQueryGetApi() {
    $.ajax({
        url: "/api/RTCMgmtApi/RTCTest",
        type: "GET",
        success: function (data) {
            alert(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("JQueryGetApi error! status:" + XMLHttpRequest.status + " readyState:" + XMLHttpRequest.readyState + " textStatus:" + textStatus);
        }
    });

    //another simply style to call get function without parameter
    $.get("/api/RTCMgmtApi/RTCTest", function (data) {
        alert(data);
    });
}

function JQueryGetApiWithParameter() {
    var itemId = 1;
    $.ajax({
        url: "/api/RTCMgmtApi/RTCWorkItem/" + itemId,
        type: "GET",
        success: function (data) {
            alert(data);
            alert(data.ID + ' ' + data.Name + ' ' + data.Description);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("JQueryGetApiWithParameter error! status:" + XMLHttpRequest.status + " readyState:" + XMLHttpRequest.readyState + " textStatus:" + textStatus);
        }
    });
}

function JQueryPostApi() {
    var wItemObj = {
        ID: 111,
        Name: 'Test',
        Description: 'This is testing.'
    };

    $.ajax({
        url: "/api/RTCMgmtApi/UpdateRTCWorkItemForJQuery",
        data: JSON.stringify(wItemObj),
        type: "POST",
        contentType: "application/json", //the default type is application/x-www-form-urlencoded
        success: function (data) {
            alert(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("JQueryPostApi error! status:" + XMLHttpRequest.status + " readyState:" + XMLHttpRequest.readyState + " textStatus:" + textStatus);
        }
    });
}