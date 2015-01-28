Template.ticketsFetch.rendered = function(){
  ReactiveTableHack.injectIntoTableFilter(this);
};

Template.ticketsFetch.events({
  'keyup .reactive-table-input': function(event, template){
    ReactiveTableHack.interceptEvents(event, template);
  },
  'blur #end_date': function(event, template){
    ReactiveTableHack.blurDateEvent(event, template, 'end_date_selected');
  },
  'blur #start_date': function(event, template){
    ReactiveTableHack.blurDateEvent(event, template, 'start_date_selected');
  },
});


Template.ticketsFetch.helpers({
  ticketsTableSettings: function () {
    return {
      //showFilter: true,
      collection: Tickets.find(),
      useFontAwesome: true,
      group: 'tickets',
      fields: [
        {
          key:'_id',
          label: 'ID',
          fn: function(_id, object){
            var html = '';
            html += '<a href="/ticket/view/'  + _id + '" data-toggle="tooltip" title="Click to view the support ticket.">' + object.id + '</a>';

            return new Spacebars.SafeString(html);
          }
        },
        {
          key:'_id',
          label: 'Title',
          fn: function(_id, object){
            var html = '';
            html += '<a href="/ticket/view/'  + _id + '" data-toggle="tooltip" title="Click to view the support ticket.">' + object.title + '</a>';

            return new Spacebars.SafeString(html);
          }
        },
        {
          key: 'status',
          label: 'Status'
        },
        {
          key:'createdAt',
          label: 'Created',
          fn: function(createdAt, object){
            return moment( createdAt ).format('MMM DD, YYYY hh:mm:ss');
          }
        },
        {
          key:'updatedAt',
          label: 'Last Updated',
          fn: function(updatedAt, object){
            return moment( updatedAt ).format('MMM DD, YYYY hh:mm:ss');
          }
        },
      ]
    };
  }
});
