Template.ticketView.events({
  'click #btnComment': function(event, template){
    event.preventDefault();
    try{
      var params = $('#form').toJSON();
      params._id = this._id;
      console.log(params);
      Tickets.validateUpdateParams(params, this.status);
      Meteor.call('updateTicketComments', params, function (error) {
      // identify the error
        if (error) {
          console.log(error);
          Alert.setMessage({title: 'Error', message: error, type: 'danger', offset: 'top', offsetAmount: 60, align: 'center'});
        } else {
          Alert.setMessage({title: 'Success', message: 'We have received your ticket and will respond shortly.', type: 'success', offset: 'top', offsetAmount: 60, align: 'center'});
        }
      });

    }catch(error){
      console.log(error);
      Alert.setMessage({title: 'Error', message: error, type: 'danger', offset: 'top', offsetAmount: 60, align: 'center'});
    }
  },
  'click #btnCommentAndClose': function(event, template){
    event.preventDefault();
    try{
      var params = $('#form').toJSON();
      params.status = 'closed';
      console.log(params);
      Tickets.validateUpdateParams(params, this.status);
      Tickets.validateStatusUpdateParams(params);
      Tickets.update({_id: this._id}, {$set: params}, function(error, _id){
        if(error){
          Alert.setMessage({title: 'Error', message: error, type: 'danger', offset: 'top', offsetAmount: 60, align: 'center'});
        } else {
          Alert.setMessage({title: 'Success', message: 'We have received your ticket and will respond shortly. ', type: 'success', offset: 'top', offsetAmount: 60, align: 'center'});
        }
      });
    }catch(error){
      Alert.setMessage({title: 'Error', message: error, type: 'danger', offset: 'top', offsetAmount: 60, align: 'center'});
    }
  },
  'click #btnClose': function(event, template){
    event.preventDefault();
    try{
      var params = {
        status: 'closed'
      }
      Tickets.validateStatusUpdateParams(params);
      Tickets.update({_id: this._id}, {$set: params}, function(error, _id){
        if(error){
          Alert.setMessage({title: 'Error', message: error, type: 'danger', offset: 'top', offsetAmount: 60, align: 'center'});
        } else {
          Alert.setMessage({title: 'Success', message: 'We have received your ticket and will respond shortly. ', type: 'success', offset: 'top', offsetAmount: 60, align: 'center'});
        }
      });
    }catch(error){
      Alert.setMessage({title: 'Error', message: error, type: 'danger', offset: 'top', offsetAmount: 60, align: 'center'});
    }
  }
});