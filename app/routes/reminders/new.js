import Ember from 'ember';
export default Ember.Route.extend({
	model() {
		return this.get('store').createRecord('reminder');
	},
	actions: {
		handleFormSubmit() {
			this.transitionTo('reminders');
		}
	}
});
