Tickets = new Mongo.Collection('tickets');

Tickets.fields = ['_id', 'id', 'status', 'owner', 'user', 'title', 'description', 'comments', 'createdAt', 'updatedAt'];

Tickets.validateInsertParams = function(params){
  if(!params.title){
    throw 'Title is required.';
  }
  if(!params.description){
    throw "Description is required.";
  }
  
}


Tickets.validateUpdateParams = function(params, status){
  if(status != 'open'){
    'Ticket must be open to comment or close.';
  }
  if(!params.comment){
    throw 'Comment is required.';
  }
}


Tickets.validateStatusUpdateParams = function(params){
  if(!params.status){
    throw 'Status param missing.';
  }
  if(params.status != 'open' && params.status != 'closed'){
    throw 'Invalid status.';
  }
}