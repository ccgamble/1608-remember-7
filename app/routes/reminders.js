import Ember from 'ember';
export default Ember.Route.extend({
	model: function() {
		return this.get('store').findAll('reminder');
	},
	actions: {
		handleRemove(model) {
			let reminderToBeDeleted = this.get('store').peekRecord('reminder',  model.id);
			 reminderToBeDeleted.destroyRecord('reminder', model.id);
		 }
	 }
});
