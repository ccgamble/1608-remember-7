import Ember from 'ember';
export default Ember.Route.extend({
	model: function() {
		return this.get('store').findAll('reminder');
	},
	actions: {
		handleRemove(model) {
			console.log(model.id)
			this.get('store').findRecord('reminder',  model.id).then((record) => {
			 model.destroyRecord('reminder', model.id);
		 });
	 }
	}
});
