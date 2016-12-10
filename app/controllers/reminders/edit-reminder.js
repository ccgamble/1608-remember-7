import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    editReminder(model) {
      const reminder = this.getProperties('title', 'date', 'notes');
			reminder.date = new Date(reminder.date);
      this.get('store').findRecord('reminder',  model.id).then((record) => {
        record.setProperties({ title: reminder.title, date: reminder.date, notes: reminder.notes });
        record.save();
      });
    }
  }
});
