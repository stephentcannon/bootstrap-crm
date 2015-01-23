
// TICKETS FETCH
Router.route('/tickets', {
  name: 'ticketsFetch',
  path: '/tickets',
  // TODO: will need to subscribe based on status (open, closed)
  waitOn: function () {
    //console.log('waitOn ran for upgrade');
    return Meteor.subscribe('tickets');
  },
  data: function () {
    if (this.ready()){
      return Tickets.find();
    }
  }
});

// TICKETS INSERT
Router.route('/tickets/insert', {
  name: 'ticketInsert',
  path: '/tickets/insert',
});

// TICKETS VIEW
Router.route('/ticket/view/:_id', {
  name: 'ticketView',
  path: '/ticket/view/:_id',
  waitOn: function () {
    return Meteor.subscribe('ticket', this.params._id);
  },
  data: function () {
    if (this.ready()){
      return Tickets.findOne({_id: this.params._id});
    }
  }
});