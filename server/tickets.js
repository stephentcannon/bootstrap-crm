Meteor.publish("tickets", function(options){
  // console.log('publishing tickets');
  // console.log('options');
  // console.log(options);
  
  if(this.userId){
    var user = Meteor.users.findOne({_id: this.userId});
    if(user){
      var query = {};
      //console.log( user );
      if(!user.admin){
        query.owner= this.userId
      }
      if(options.status){
        query.status = options.status
      }
      
      if(options.start_date && options.end_date){
        query.updatedAt = {
          $gte: new Date(moment(options.start_date)),
          $lt: new Date(moment(options.end_date).add(1440, 'minutes'))
        }
      }
  
      // console.log('the query');
      // console.log(query);
      return Tickets.find(query);
    }
  }
});

Meteor.publish("ticket", function(_id){
  if(this.userId){
    var user = Meteor.users.findOne({_id: this.userId});
    if(user){
      var query = {};
      if(!user.admin){
        query.owner= this.userId
      }
      query._id = _id;
      return Tickets.find(query);
    }
  }
});

Meteor.methods({
  updateTicketComments: function (params) {
    //params._id = tickets._id
    //params.comment = tickets.comments
    //params.stats = tickets.status * optional
    // console.log('/server/tickets.js updateTicketComments');
    // console.log(params);
    try{
      if(this.userId){
        var user = Meteor.users.findOne({_id: this.userId});
        if(user){
          var query = {_id: params._id};
          if(!user.admin){
            query.owner = this.userId;
          }
          var ticket = Tickets.findOne(query);
          if(ticket){
            if(ticket.status == 'open'){
              Tickets.validateUpdateParams(params, ticket.status);
              
              var userForDoc = '';
              if(user.profile){
                if(user.profile.firstname || user.profile.lastname){
                  if(user.profile.lastname){
                    userForDoc = user.profile.lastname;
                  }
                  if(user.profile.firstname){
                    userForDoc = user.profile.firstname + ' ' + userForDoc;
                  }
                } else if (user.profile.businessname){
                  userForDoc = user.profile.businessname;
                } else {
                  userForDoc = user.emails[0].address;
                }
              } else {
                userForDoc = user.emails[0].address;
              }
              
              var ts = new Date();
              var update = {};
               
              var comment = {
                comment: params.comment,
                createdAt: ts,
                by: userForDoc,
                userId: this.userId
              };
              
              update['$addToSet'] = {
                comments: comment
              };
              
              var setData = {};
              setData.updatedAt = ts;
     
              if(params.status){
                Tickets.validateStatusUpdateParams(params);
                setData.status = params.status;
              }
              update['$set'] = setData;
              
              //console.log(update);
              Tickets.update({_id: params._id}, update,function(error){
                if(!error && params.status == 'closed'){
                  var newTicket = Tickets.findOne({_id: params._id});
                  Tickets.emailTicketClosed(newTicket);
                }
              });
              
              Tickets.emailNewComment(ticket, comment);
              
            } else {
              throw("Comment not accepted.  Support ticket is closed.")
            }
            
          } else {
            throw ("Invalid support ticket.");
          }
        } else {
          throw ('User not found.');
        }
      } else {
        throw ("Invalid user.");
      }
    }catch(error){
      //console.log(error);
      throw new Meteor.Error(500, error);
    }
  },
  closeTicket: function(params){
    //params._id = tickets._id
    try{
      if(this.userId){
        var user = Meteor.users.findOne({_id: this.userId});
        if(user){
          var query = {_id: params._id};
          if(!user.admin){
            query.owner = this.userId;
          }
          var ticket = Tickets.findOne(query);
        
          if(ticket){
            if(ticket.status == 'open'){
              Tickets.update({_id: params._id}, {$set: {status: 'closed'}}, function(error){
                if(!error)
                  Tickets.emailTicketClosed(ticket);
              });
              
            }else {
              throw 'Invalid ticket status.  Must be open to close.';
            }
          } else {
            throw ("Invalid support ticket.");
          }
        } else {
          throw 'User not found.';
        }
      } else {
        throw ("Invalid user.");
      }
    }catch(error){
      //console.log(error);
      throw new Meteor.Error(500, error);
    }
  }
});

Tickets.deny({
  insert: function (userId, doc) {
    // console.log('**********etherpos-mcp /server/tickets deny insert *************');
    // console.log(doc);
    // console.log(userId);
    try{
      if(userId){
        var ts = new Date();
        doc.id = new Date().valueOf();
        doc.createdAt = ts;
        doc.updatedAt = ts;
        doc.owner = userId;
        var user = Meteor.users.findOne({_id: userId});
        var userForDoc = '';
        if(user.profile){
          if(user.profile.firstname || user.profile.lastname){
            if(user.profile.lastname){
              userForDoc = user.profile.lastname;
            }
            if(user.profile.firstname){
              userForDoc = user.profile.firstname + ' ' + userForDoc;
            }
          } else if (user.profile.businessname){
            userForDoc = user.profile.businessname;
          } else {
            userForDoc = user.emails[0].address;
          }
        } else {
          userForDoc = user.emails[0].address;
        }
        doc.user = userForDoc
        doc.status = 'open';
        doc.comments = [];
        _.each(doc, function(value, key, list){
          if(Tickets.fields.indexOf(key) == -1 ){
            delete doc[key];
          }
        });
        
        return false;
      } else {
        throw new Meteor.Error(500, 'You must be logged in.');
        return true;
      }
    }catch(error){
      throw new Meteor.Error(500, 'Server error: ' + error);
      return true;
    }
  },
  update: function(userId, doc, fields, modifier){
    return true;
  },
  remove: function(userId, doc){
    return true;
  }
});

Tickets.allow({
  insert: function(userId, doc){
    // console.log('**********etherpos-mcp/server/tickets allow insert *************');
    // console.log(userId);
    // console.log(doc);
    try{
      
      Tickets.validateInsertParams(doc);
      
      Tickets.emailNewTicket(doc)
    
      return true;
    }catch(error){
      throw new Meteor.Error(500, 'Server error: ' + error);
      return false;
    }
  },
  transform: function (doc) { return doc; }
});