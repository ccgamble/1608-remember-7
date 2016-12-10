import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    editReminder() {
      const reminder = this.getProperties(
        'id','title', 'date', 'notes');
			reminder.date = new Date(reminder.date);
      console.log(reminder.id)
      this.get('store').findRecord('reminder',  1).then((reminder) => {
        reminder.setProperties({ title: "hi", date: "12/17/2016", notes: "yoyo" });
      });
    }
  }
});
