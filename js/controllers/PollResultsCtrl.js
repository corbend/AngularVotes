angular.module('PollManagerApp').controller('PollResultsCtrl', 
	['$scope', '$state', '$stateParams', 'FirebaseWrapper',
	 function($scope, $state, $stateParams, FBWrapper) {

		FBWrapper.setSession('Polls/' + $stateParams.id);
		$scope.observedQuiz = FBWrapper.boundAsObject();

		$scope.cancelSession = function() {
			$state.go('polls');
		}
	}
])