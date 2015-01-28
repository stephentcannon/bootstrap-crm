Template.ticketsFetch.helpers({
  ticketsTableSettings: function () {
    return {
      showFilter: false,
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
          key: 'comments',
          label: 'Comments',
          fn: function(comments, object){
            return comments.length;
          }
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
          sort: 'descending',
          fn: function(updatedAt, object){
            return moment( updatedAt ).format('MMM DD, YYYY hh:mm:ss');
          }
        },
      ]
    };
  }
});
