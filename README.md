boostrap-crm
=============
a meteor bootstrap crm package

info
=====
A bootstrap 3 based simple support ticket management system.  Consists of a Tickets collection and screens for basic CRUD.

End users can only read, create, update the status and comment on their own tickets.

Users where the field admin is true (db.users.admin: true) can read, create, update the status and comment on any tickets.

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


