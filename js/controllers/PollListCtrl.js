angular.module('PollManagerApp').controller('PollListCtrl', 
	['$scope', '$state', 'FirebaseWrapper', function($scope, $state, FBWrapper) {

		FBWrapper.setSession('Polls');

		$scope.polls = FBWrapper.boundAsArray();

		var initiateTimers = function() {

			$scope.polls.forEach(function(v, index) {
				var poll = $scope.polls[index];
				poll.toDateFormatted = moment(Number(poll.toDate)).format("DD-MM-YYYY hh:mm:ss");
				poll.fromDateFormatted = moment(Number(poll.fromDate)).format("DD-MM-YYYY hh:mm:ss");

				if (new Date().getTime() > poll.toDate) {
					poll.ended = true;
				}
				setInterval(function() {
					var startTime = moment();
					var endTime = moment(Number(poll.toDate));

					$scope.$apply(function() {
						if (new Date().getTime() > poll.toDate) {
							poll.ended = true;
						}
						poll.timeRemainingAll = endTime.from(startTime);
					})
				}, 1000);
			})
		}

		$scope.polls.$loaded().then(function() {
			initiateTimers();
		})

		$scope.createQuiz = function() {
			$state.go('polls_create');
		}

		$scope.editQuiz = function(selectedQuiz) {
			$state.go('polls_edit', {id: selectedQuiz.$id});
		}

		$scope.removeQuiz = function(idOfQuiz) {
			debugger;
			FBWrapper.remove(idOfQuiz);
		}

		$scope.startSession = function(selectedQuiz) {
			$state.go('polls_session', {id: selectedQuiz.$id});
		}
	}
])