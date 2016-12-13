import Ember from 'ember';
export default Ember.Route.extend({
	model: function(params) {
		return this.get('store').find('reminder', params.reminder_id);
	},
	actions: {
		handleFormSubmit() {
			this.transitionTo('reminders');
		}
	}
});
