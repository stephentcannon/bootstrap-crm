Template.ticketsSideBar.helpers({
  getStatus: function(){
    if(Session.get('bootstrap_crm_ticket_status'))
      return Session.get('bootstrap_crm_ticket_status');
  },
  getStartDate: function(){
    if(Session.get('bootstrap_crm_start_date_selected'))
     return moment( Session.get('bootstrap_crm_start_date_selected') ).format('YYYY-MM-DD')
  },
  getEndDate: function(){
    if(Session.get('bootstrap_crm_end_date_selected'))
     return moment( Session.get('bootstrap_crm_end_date_selected') ).format('YYYY-MM-DD')
  }
});

Template.ticketsSideBar.events({
  'click #menu-toggle, tap #menu-toggle, click #menu-close, tap #menu-close, click #li-item, tap #li-item': function(e, t){
    e.preventDefault();
    $("#tickets-sidebar-wrapper").toggleClass("active");
  },
  'submit': function(event, template){
    event.preventDefault();
    var params = $('#form').toJSON();
    // console.log(params);
    if(params.status)
      Session.set('bootstrap_crm_ticket_status', params.status);
    if(params.start_date)
      Session.set('bootstrap_crm_start_date_selected', params.start_date);
    if(params.end_date)
      Session.set('bootstrap_crm_end_date_selected', params.end_date);
  }
});