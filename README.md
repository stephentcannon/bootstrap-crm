boostrap-crm
=============
a meteor bootstrap crm package

info
=====
A bootstrap 3 based simple support ticket management system.  Consists of a Tickets collection and user and screens for basic CRUD.

End users can only read, create, update the status and comment on their own tickets.

Users where the field admin is true (db.users.admin: true aka Meteor.users.admin: true) can read, create, update the status and comment on any tickets.

installation
=============
meteor add steeve:boostrap-crm

baked in iron router routes
============================
* /tickets - a table of tickets
* /tickets/insert - create ticket
* /tickets/view/:_id - view ticket, comment on ticket and update ticket status

package session variables
==========================
* bootstrap_crm_start_date_selected - used for start date on ticket table view
* bootstrap_crm_end_date_selected - used for end date on ticket table view
* bootstrap_crm_ticket_status - used for ticket status table view. default is to show open tickets. options are open, closed or null for both.

Ticket Model
=============
````
"_id" : "boTFEkxv2Xi4wzgtr",
"comments" : [
        {
                "comment" : "this is a comment",
                "createdAt" : ISODate("2015-01-30T17:17:46.812Z"),
                "by" : "John Doe",
                "userId" : "vrHNJdqPTqhcTzXEZ"
        }
],
"createdAt" : ISODate("2015-01-30T17:15:24.007Z"),
"description" : "this is the ticket description",
"id" : 1422638124007,
"owner" : "vrHNJdqPTqhcTzXEZ", // users._id of creator - always an end user
"status" : "open",
"title" : "this is the ticket title",
"updatedAt" : ISODate("2015-01-30T17:17:46.812Z")
````

Tickets.emailTemplates (server only)
====================================
This is an Object with several fields that are used to generate text/html for the emails sent when a ticket is created and updated.  Override as you would normally.

# Tickets.emailTemplates.from
* default: 'No-Reply <no-reply@' + Meteor.absoluteUrl() + '>'
* used as the from, cc and replyTo on all email notifications listed below.

# Tickets.emailTemplates.newTicket.html(ticket) and .text(ticket)
* defaults to standard fields emailed
* supports override
* use ticket object to create a response

# Tickets.emailTemplates.newTicket.subject(ticket)
* defaults: Support Ticket: ticket.title
* supports override
* use ticket object to create a response

# Tickets.emailTemplates.newComment.html(ticket, comment) and .text(ticket, comment)
* defaults to standard fields emailed
* supports override
* use ticket object to create a response
*
# Tickets.emailTemplates.newComment.subject(ticket, comment)
* default: Support Ticket Comment: ticket.title
* supports override
* use ticket object to create a response

# Tickets.emailTemplates.ticketClosed.html(ticket) and .text(ticket)
* defaults to standard fields emailed notifying of closed
* supports override
* use ticket object to create a response

# Tickets.emailTemplates.ticketClosed.subject(ticket)
* default: 'Support Ticket Closed: ' + ticket.title
* supports override
* use ticket object to create a response


