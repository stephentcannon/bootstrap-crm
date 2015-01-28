Router.onRun(function() {
  Session.set('bootstrap_crm_start_date_selected', moment().subtract(7, 'd').format("MM/DD/YYYY") );
  Session.set('bootstrap_crm_end_date_selected',   moment().add(1, 'd').format("MM/DD/YYYY") );
  Session.set('bootstrap_crm_ticket_status', 'open');
  this.next();
});

// TICKETS FETCH
Router.route('/tickets', {
  name: 'ticketsFetch',
  path: '/tickets',
  // TODO: will need to subscribe based on status (open, closed)
  waitOn: function () {
    //console.log('waitOn ran for upgrade');
    return Meteor.subscribe('tickets', {
      start_date: Session.get('bootstrap_crm_start_date_selected'),
      end_date: Session.get('bootstrap_crm_end_date_selected'),
      status: Session.get('bootstrap_crm_ticket_status') }
      );
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