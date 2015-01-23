Template.ticketInsert.events({
  'submit': function(event, template){
    event.preventDefault();
    try{
      var params = $('#form').toJSON();
      // console.log(params);
      Tickets.validateInsertParams(params);
      Tickets.insert(params, function(error, _id){
        if(error){
          Alert.setMessage({title: 'Error', message: error, type: 'danger', offset: 'top', offsetAmount: 60, align: 'center'});
        } else {
          Alert.setMessage({title: 'Success', message: 'We have received your ticket and will respond shortly. ', type: 'success', offset: 'top', offsetAmount: 60, align: 'center'});
          Router.go('/tickets');
        }
      });
    }catch(error){
      Alert.setMessage({title: 'Error', message: error, type: 'danger', offset: 'top', offsetAmount: 60, align: 'center'});
    }
  }
});