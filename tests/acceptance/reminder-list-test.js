/* globals server */

import { test } from 'qunit';
import moduleForAcceptance from 'remember/tests/helpers/module-for-acceptance';

import Ember from 'ember';

moduleForAcceptance('Acceptance | reminders list');

test('viewing the homepage will redirect the user to "/reminders"', function(assert) {
  server.createList('reminder', 5);

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/reminders');
    assert.equal(Ember.$('.spec-reminder-item').length, 5);
  });
});

test('clicking on an individual item', function(assert) {
	visit('/reminders/new');
	fillIn('.input-title', 'hello');
	fillIn('.input-date', '12/08/2016');
	fillIn('.input-notes', 'these are notes');
	click('.add-reminder-submit');

	click('.spec-reminder-item:first');

  andThen(function() {
    assert.equal(currentURL(), '/reminders/1');
    assert.equal(Ember.$('.spec-reminder-item').text().trim(), 'hello');
  });
});

test("clicking on the 'Add new reminder' will redirect to the /new path", function(assert) {
	visit('/');
	click('.add-btn');

	andThen(function() {
		assert.equal(currentURL(), '/reminders/new');
	});
});

test("clicking the 'Add new reminder' renders input fields", function(assert) {
	visit('/');
	click('.add-btn');

	andThen(function() {
		assert.equal(find('.new-input').length, 3, 'should show three input fields');
	});
});

test("should add a reminder on submit with valid input", function(assert) {
	visit('/reminders/new');

	fillIn('.input-title', 'hello');
	fillIn('.input-date', '12/08/2016');
	fillIn('.input-notes', 'these are notes');

	click('.add-reminder-submit');

	andThen(function() {
		assert.equal(currentURL(), '/reminders');
		assert.equal(find('.reminder').length, 1, 'should show 1 reminder');
		assert.equal(Ember.$('.spec-reminder-item').text().trim(), 'hello');
	});
});

test('viewing the homepage will reroute to /reminders and display a welcome page when there are zero reminders', function(assert) {
	visit('/');

	andThen(function() {
		assert.equal(currentURL(), '/reminders');
		assert.equal(Ember.$('.spec-reminder-item').length, 0);
		assert.equal(find('.welcome-default').length, 1);
	});
});

test('clicking the edit button will reroute to /edit and display edit form', function(assert) {
	visit('/reminders/new');

	fillIn('.input-title', 'hello');
	fillIn('.input-date', '12/08/2016');
	fillIn('.input-notes', 'these are notes');

	click('.add-reminder-submit');
	visit('/reminders');
	click('.edit-button');

	andThen(function() {
		assert.equal(currentURL(), '/reminders/edit/1');
		assert.equal(find('.new-input').length, 3);
	});
});

test('edits save on submit', function(assert) {
	visit('/reminders/new');

	fillIn('.input-title', 'hello');
	fillIn('.input-date', '12/08/2016');
	fillIn('.input-notes', 'these are notes');

	click('.add-reminder-submit');
	visit('/reminders');
	click('.edit-button');

	fillIn('.input-title', 'hi');
	click('.add-reminder-submit');

	andThen(function() {
		assert.equal(currentURL(), '/reminders');
		assert.equal(Ember.$('.spec-reminder-title').text().trim(), 'hi');
	});
});

test('can revert unsaved reminder when editing', function(assert) {
	visit('/reminders/new');

	fillIn('.input-title', 'hello');
	fillIn('.input-date', '12/08/2016');
	fillIn('.input-notes', 'these are notes');

	click('.add-reminder-submit');
	visit('/reminders');
	click('.edit-button');

	fillIn('.input-title', 'hi');
	click('.revert-input');

	andThen(function() {
		assert.equal(currentURL(), '/reminders/edit/1');
		assert.equal(Ember.$('.spec-reminder-title').text().trim(), 'hello');
	});
});

test('it renders visual cue when reminder is unsaved', function(assert) {
	visit('/reminders/new');

	fillIn('.input-title', 'hello');
	fillIn('.input-date', '12/08/2016');
	fillIn('.input-notes', 'these are notes');

	andThen(function() {
		assert.equal(find('.unsaved').length, 1);
		assert.equal(Ember.$('.unsaved').text().trim(), "Reminder is not saved!!!");
	});
});

test('it can delete a reminder with the individual-delete-button and routes back to /reminders', function(assert) {
  visit('/reminders/new');

	fillIn('.input-title', 'hello');
	fillIn('.input-date', '12/08/2016');
	fillIn('.input-notes', 'these are notes');

  click('.add-reminder-submit');
  click('.delete-button');

  andThen(function() {
    assert.equal(currentURL(), '/reminders');
    assert.equal(find('.reminder').length, 0);
  });
});

test('it can delete a reminder with the delete-button and routes back to /reminders', function(assert) {
  visit('/reminders/new');

	fillIn('.input-title', 'hello');
	fillIn('.input-date', '12/08/2016');
	fillIn('.input-notes', 'these are notes');

  click('.add-reminder-submit');
  click('.spec-reminder-title');
  click('.delete-button');

  andThen(function() {
    assert.equal(currentURL(), '/reminders');
    assert.equal(find('.reminder').length, 0);
  });
});
