import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    editReminder(model) {
      const edit = this.getProperties('title', 'date', 'notes');
      this.get('store').findRecord('reminder',  model.id).then((record) => {
        record.setProperties({ title: edit.title, date: edit.date, notes: edit.notes });
        record.save();
      });
    }
  }
});
