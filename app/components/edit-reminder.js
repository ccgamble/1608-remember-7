import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'section',
  classNames: ['edit-reminder'],

  title: '',
  date: '',
  notes: '',

  actions: {
    editReminder() {
      const reminder = this.getProperties('title', 'date', 'notes');
			reminder.date = new Date(reminder.date);
      this.get('store').findRecord('reminder',  reminder).save().then(() => {
        this.setProperties({ title: '', date: '', notes: '' });
      });
    }
  }
});
