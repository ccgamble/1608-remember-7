import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),


  actions: {
    handleFormSubmit(model) {
	    model.date = model.date || new Date();
			model.save();
			this.sendAction();
	},
	rollback(model){
		if(model.get('hasDirtyAttributes')){
			model.rollbackAttributes();
			}
		}
  }
});
