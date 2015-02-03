angular.module('PollManagerApp').controller('PollEditCtrl', 
	['$scope', '$state', '$stateParams', 'FirebaseWrapper',
	 function($scope, $state, $stateParams, FBWrapper) {

		FBWrapper.setSession('Polls/' + $stateParams.id);

		$scope.editedQuiz = FBWrapper.boundAsObject();

		$scope.editedQuiz.$loaded().then(function(data) {
			$scope.editedQuiz.toDateFormatted = moment($scope.editedQuiz.toDate).format('MM-DD-YYYY hh:mm:ss');
			$scope.editedQuiz.fromDateFormatted = moment($scope.editedQuiz.fromDate).format('MM-DD-YYYY hh:mm:ss');
		})

		$scope.saveQuiz = function(quiz) {
			quiz.$save().then(function() {
				$state.go('polls');
			})
		}

		$scope.cancelEdit = function() {
			$state.go('polls');
		}

		$scope.addQuestion = function(newQuestion) {
			var cp = angular.copy(newQuestion);
			$scope.editedQuiz.questions.push(cp);
		}

		$scope.removeQuestion = function(index) {
			$scope.editedQuiz.questions.splice(index);
		}

	}
])