angular.module('PollManagerApp').controller('PollCreateCtrl', 
	['$scope', '$state', 'FirebaseWrapper', function($scope, $state, FBWrapper) {

		FBWrapper.setSession('Polls');

		$scope.newQuiz = {
			questions: []
		}

		$scope.createNewQuiz = function(newPoll) {
			newPoll.toDate = moment(newPoll.toDate)._d.getTime();
			newPoll.fromDate = moment(newPoll.fromDate)._d.getTime();
			FBWrapper.push(newPoll);
			$scope.newQuiz = "";
			$state.go('polls');
		}

		$scope.cancelCreate = function() {
			$state.go('polls');
		}

		$scope.addQuestion = function(newQuestion) {
			var cp = angular.copy(newQuestion);
			$scope.newQuiz.questions.push(cp);
		}

	}
])