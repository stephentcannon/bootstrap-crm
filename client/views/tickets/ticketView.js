Template.ticketView.events({
  'click #btnComment': function(event, template){
    event.preventDefault();
    try{
      var params = $('#form').toJSON();
      params._id = this._id;
      //console.log(params);
      Tickets.validateUpdateParams(params, this.status);
      Meteor.call('updateTicketComments', params, function (error) {
      // identify the error
        if (error) {
          Alert.setMessage({title: 'Error', message: error, type: 'danger', offset: 'top', offsetAmount: 60, align: 'center'});
        } else {
          $("#form").reset();
          Alert.setMessage({title: 'Success', message: 'Thank you for your comment. ', type: 'success', offset: 'top', offsetAmount: 60, align: 'center'});
        }
      });

    }catch(error){
      //console.log(error);
      Alert.setMessage({title: 'Error', message: error, type: 'danger', offset: 'top', offsetAmount: 60, align: 'center'});
    }
  },
  'click #btnCommentAndClose': function(event, template){
    event.preventDefault();
    try{
      var params = $('#form').toJSON();
      params._id = this._id;
      params.status = 'closed';
      //console.log(params);
      Tickets.validateUpdateParams(params, this.status);
      Tickets.validateStatusUpdateParams(params);
      Meteor.call('updateTicketComments', params, function (error) {
      // identify the error
        if (error) {
          Alert.setMessage({title: 'Error', message: error, type: 'danger', offset: 'top', offsetAmount: 60, align: 'center'});
        } else {
          $("#form").reset();
          Alert.setMessage({title: 'Success', message: 'Thank you for your comment. ', type: 'success', offset: 'top', offsetAmount: 60, align: 'center'});
        }
      });
    }catch(error){
      Alert.setMessage({title: 'Error', message: error, type: 'danger', offset: 'top', offsetAmount: 60, align: 'center'});
    }
  },
  'click #btnClose': function(event, template){
    event.preventDefault();
    try{
      var params = {};
      params._id = this._id;
      Meteor.call('closeTicket', params, function (error) {
      // identify the error
        if (error) {
          console.log(error);
          Alert.setMessage({title: 'Error', message: error, type: 'danger', offset: 'top', offsetAmount: 60, align: 'center'});
        } else {
          $("#form").reset();
          Alert.setMessage({title: 'Success', message: 'Your ticket has been closed. ', type: 'success', offset: 'top', offsetAmount: 60, align: 'center'});
        }
      });
    }catch(error){
      console.log(error);
      Alert.setMessage({title: 'Error', message: error, type: 'danger', offset: 'top', offsetAmount: 60, align: 'center'});
    }
  }
});