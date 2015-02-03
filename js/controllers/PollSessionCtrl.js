angular.module('PollManagerApp').controller('PollSessionCtrl', 
	['$scope', '$state', '$stateParams', 'FirebaseWrapper', function($scope, $state, $stateParams, FBWrapper) {

		FBWrapper.setSession('Polls/' + $stateParams.id);

		$scope.sessionQuiz = FBWrapper.boundAsObject();

		$scope.onSelect = function(selectAnswerIndex) {
			$scope.sessionQuiz.questions.forEach(function(v, index) {
				if (selectAnswerIndex != index) {
					v.selected = false;
				}
			})
		}

		function calculatePercentage(poll) {

			//calculating results percentages
			var amounts = new Array(poll.questions.length);
			poll.answers.forEach(function(a, index) {
				if (!amounts[a.value]) {
					amounts[a.value] = 0;
				}
				amounts[a.value] += 1;
			})
			var sum = 0;
			amounts.forEach(function(a) {
				sum += a;
			})
			console.log("CALCULATE", amounts);

			amounts.forEach(function(a, index) {
				poll.questions[index].results = Math.floor((a/sum) * 100);
			})

			console.log(poll.questions);
		}

		$scope.vote = function() {
			debugger;
			var selectedAnswer;

			$scope.sessionQuiz.questions.forEach(function(v, index) {
				if (v.selected) {
					selectedAnswer = v;
					selectedAnswer.index = index;
				}
			})
			//TODO - paste user id
			if (!$scope.sessionQuiz.answers) {
				$scope.sessionQuiz.answers = [];
			}

			$scope.sessionQuiz.answers.push({
				value: selectedAnswer.index
			});
			//TODO - use transaction API
			$scope.sessionQuiz.polls = ($scope.sessionQuiz.polls || 0) + 1;
			$scope.sessionQuiz.questions[selectedAnswer.index].selected = false;

			calculatePercentage($scope.sessionQuiz);
			$scope.sessionQuiz.$save().then(function() {
				$state.go('polls_results', {id: $scope.sessionQuiz.$id});	
			});
		}

		$scope.cancelSession = function() {
			$state.go('polls');
		}
	}
])