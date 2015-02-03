var m = angular.module('PollManagerApp', ['ui.router', 'ngResource', 'firebase']);

m.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/polls");

	$stateProvider.state('polls', {
		url: '/polls',
		templateUrl: '/templates/list.html'
	}).state('polls_session', {
		url: '/:id/session',
		templateUrl: '/templates/session.html'
	}).state('polls_results', {
		url: '/:id/results',
		templateUrl: '/templates/results.html'
	}).state('polls_create', {
		url: '/create',
		templateUrl: '/templates/create.html'
	}).state('polls_edit', {
		url: '/:id/edit',
		templateUrl: '/templates/edit.html'
	})
})  