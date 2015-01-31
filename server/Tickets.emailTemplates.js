Tickets.emailTemplates = {
  from: 'No-Reply <no-reply@' + Meteor.absoluteUrl() + '>'
};

//// NEW TICKET ////

Tickets.emailTemplates.newTicket = {};

Tickets.emailTemplates.newTicket.__subject = function(ticket){
  if (typeof Tickets.emailTemplates.newTicket.subject === 'function'){
    return Tickets.emailTemplates.newTicket.subject(ticket);
  } else {
   return 'Support Ticket: ' + ticket.title;
  }
};


Tickets.emailTemplates.newTicket.__text = function(ticket) {
  if (typeof Tickets.emailTemplates.newTicket.text === 'function'){
    return Tickets.emailTemplates.newTicket.text(ticket);
  } else {
    var retVal = 'You have a new support ticket./n/n';
    retVal += 'ID: ' + ticket.id + '/n/n';
    retVal += 'Status: ' + ticket.status + '/n/n';
    retVal += 'Title: ' + ticket.title + '/n/n';
    retVal += 'Description: ' + ticket.description + '/n/n';
    retVal += 'Link: ' + Meteor.absoluteUrl() + 'ticket/view/' + ticket._id + '/n/n';
    return retVal;
  }
}

Tickets.emailTemplates.newTicket.__html = function(ticket) {
  if (typeof Tickets.emailTemplates.newTicket.html === 'function'){
    return Tickets.emailTemplates.newTicket.html(ticket);
  } else {
    var retVal = '<h1>You have a new support ticket.</h1>';
    retVal += '<b>ID: </b>' + ticket.id + '<br/>';
    retVal += '<b>Title: </b>' + ticket.title + '<br/>';
    retVal += '<b>Description: </b>' + ticket.description + '<br/>';
    retVal += '<a href="' + Meteor.absoluteUrl() + 'ticket/view/' + ticket._id + '">Click to View the Ticket</a>';
    return retVal;
  }
}

Tickets.emailNewTicket = function(ticket){
  
  var owner = Meteor.users.findOne({_id: ticket.owner});

  var options = {
    to: owner.emails[0].address,
    from: Tickets.emailTemplates.from,
    cc: Tickets.emailTemplates.from,
    replyTo: Tickets.emailTemplates.from,
    subject: Tickets.emailTemplates.newTicket.__subject(ticket),
    text: Tickets.emailTemplates.newTicket.__text(ticket),
    html: Tickets.emailTemplates.newTicket.__html(ticket)
  };
  
  Email.send(options);
  
}

//// NEW COMMENT ////

Tickets.emailTemplates.newComment = {};

Tickets.emailTemplates.newComment.__subject = function(ticket, comment){
  if (typeof Tickets.emailTemplates.newComment.subject === 'function'){
    return Tickets.emailTemplates.newComment.subject(ticket, comment);
  } else {
   return 'Support Ticket Comment: ' + ticket.title;
  }
};

Tickets.emailTemplates.newComment.__text = function(ticket, comment) {
  if (typeof Tickets.emailTemplates.newComment.text === 'function'){
    return Tickets.emailTemplates.newComment.text(ticket, comment);
  } else {
    var retVal = 'You have a new support ticket comment./n/n';
    retVal += 'ID: ' + ticket.id + '/n/n';
    retVal += 'Status: ' + ticket.status + '/n/n';
    retVal += 'Title: ' + ticket.title + '/n/n';
    retVal += 'Description: ' + ticket.description + '/n/n';
    retVal += 'New Comment';
    retVal += '===========/n/n';
    retVal += comment.by + ' on ' + moment(comment.createdAt).format("MMM DD, YYYY hh:mm:ss A") + ' wrote ' + comment.comment + '/n/n';
    retVal += 'Previous Comments /n/n';
    retVal += '=================/n/n';
    ticket.comments.forEach(function (comment) {
      retVal += comment.by + ' on ' + moment(comment.createdAt).format("MMM DD, YYYY hh:mm:ss A") + ' wrote ' + comment.comment + '/n/n';
    });
    retVal += 'Link: ' + Meteor.absoluteUrl() + 'ticket/view/' + ticket._id + '/n/n';
    return retVal;
  }
}

Tickets.emailTemplates.newComment.__html = function(ticket, comment) {
  if (typeof Tickets.emailTemplates.newComment.html === 'function'){
    return Tickets.emailTemplates.newComment.html(ticket, comment);
  } else {
    var retVal = '<h1>You have a new support ticket comment.</h1>';
    retVal += '<b>ID: </b>' + ticket.id + '<br/>';
    retVal += '<b>Title: </b>' + ticket.title + '<br/>';
    retVal += '<b>Description: </b>' + ticket.description + '<br/>';
    retVal += '<center><b>New Comment</b></center><br/><hr/>';
    retVal += comment.by + ' on ' + moment(comment.createdAt).format("MMM DD, YYYY hh:mm:ss A") + '<br/>' + comment.comment + '<br/>';
    retVal += '<center><b>Previous Comments</b></center><br/><hr/>';
    ticket.comments.forEach(function (comment) {
      retVal += '<p>' + comment.by + ' on ' + moment(comment.createdAt).format("MMM DD, YYYY hh:mm:ss A") + '<br/>' + comment.comment + '</p>';
    });
    retVal += '<a href="' + Meteor.absoluteUrl() + 'ticket/view/' + ticket._id + '">Click to View the Ticket</a>';
    return retVal;
  }
}

Tickets.emailNewComment = function(ticket, comment){

  var owner = Meteor.users.findOne({_id: ticket.owner});

  var options = {
    to: owner.emails[0].address,
    from: Tickets.emailTemplates.from,
    cc: Tickets.emailTemplates.from,
    replyTo: Tickets.emailTemplates.from,
    subject: Tickets.emailTemplates.newComment.__subject(ticket, comment),
    text: Tickets.emailTemplates.newComment.__text(ticket, comment),
    html: Tickets.emailTemplates.newComment.__html(ticket, comment)
  };
  
  Email.send(options);
  
}


//// TICKET CLOSED ////

Tickets.emailTemplates.ticketClosed = {};

Tickets.emailTemplates.ticketClosed.__subject = function(ticket){
  if (typeof Tickets.emailTemplates.ticketClosed.subject === 'function'){
    return Tickets.emailTemplates.ticketClosed.subject(ticket);
  } else {
   return 'Support Ticket Closed: ' + ticket.title;
  }
};

Tickets.emailTemplates.ticketClosed.__text = function(ticket) {
  if (typeof Tickets.emailTemplates.ticketClosed.text === 'function'){
    return Tickets.emailTemplates.ticketClosed.text(ticket);
  } else {
    var retVal = 'Your support ticket has been closed./n/n';
    retVal += 'ID: ' + ticket.id + '/n/n';
    retVal += 'Status: ' + ticket.status + '/n/n';
    retVal += 'Title: ' + ticket.title + '/n/n';
    retVal += 'Description: ' + ticket.description + '/n/n';
    retVal += 'Comments /n/n';
    retVal += '=================/n/n';
    ticket.comments.forEach(function (comment) {
      retVal += comment.by + ' on ' + moment(comment.createdAt).format("MMM DD, YYYY hh:mm:ss A") + ' wrote ' + comment.comment + '/n/n';
    });
    retVal += 'Link: ' + Meteor.absoluteUrl() + 'ticket/view/' + ticket._id + '/n/n';
    return retVal;
  }
}

Tickets.emailTemplates.ticketClosed.__html = function(ticket) {
  if (typeof Tickets.emailTemplates.ticketClosed.html === 'function'){
    return Tickets.emailTemplates.ticketClosed.html(ticket, comment);
  } else {
    var retVal = '<h1>Your support ticket has been closed.</h1>';
    retVal += '<b>ID: </b>' + ticket.id + '<br/>';
    retVal += '<b>Title: </b>' + ticket.title + '<br/>';
    retVal += '<b>Description: </b>' + ticket.description + '<br/>';
    retVal += '<center><b>Comments</b></center><br/><hr/>';
    ticket.comments.forEach(function (comment) {
      retVal += '<p>' + comment.by + ' on ' + moment(comment.createdAt).format("MMM DD, YYYY hh:mm:ss A") + '<br/>' + comment.comment + '</p>';
    });
    retVal += '<a href="' + Meteor.absoluteUrl() + 'ticket/view/' + ticket._id + '">Click to View the Ticket</a>';
    return retVal;
  }
}

Tickets.emailTicketClosed = function(ticket){

  var owner = Meteor.users.findOne({_id: ticket.owner});

  var options = {
    to: owner.emails[0].address,
    from: Tickets.emailTemplates.from,
    cc: Tickets.emailTemplates.from,
    replyTo: Tickets.emailTemplates.from,
    subject: Tickets.emailTemplates.ticketClosed.__subject(ticket),
    text: Tickets.emailTemplates.ticketClosed.__text(ticket),
    html: Tickets.emailTemplates.ticketClosed.__html(ticket)
  };
  
  Email.send(options);
  
}