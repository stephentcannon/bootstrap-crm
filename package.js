Package.describe({
  name: 'steeve:bootstrap-crm',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'a meteor boostrap crm package',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/stephentcannon/bootstrap-crm.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  
  api.use(['mongo', 'accounts-password']);
  
  api.use([
    'templating',
    'iron:router@1.0.5',
    'aslagle:reactive-table@0.7.8',
    'steeve:moment-dateformat@0.0.1',
    'steeve:iron-router-helpers@0.0.5',
    'steeve:bootstrap3-formfield-helpers@0.0.2',
    'steeve:template-logic-helpers@0.0.1',
    'steeve:jquery-form-helpers@0.0.7',
    ], 'client');
  
  api.addFiles([
    'lib/Tickets.js'
  ]);
    
  api.addFiles([
    'client/css/tickets.css',
    'client/lib/Router.js',
    'client/views/tickets/ticketsBreadCrumbs.html',
    'client/views/tickets/ticketsFetch.html',
    'client/views/tickets/ticketsFetch.js',
    'client/views/tickets/ticketInsert.html',
    'client/views/tickets/ticketInsert.js',
    'client/views/tickets/ticketView.html',
    'client/views/tickets/ticketView.js',
    'client/views/tickets/ticketsSideBar.html',
    'client/views/tickets/ticketsSideBar.js'
    ], 'client');
  
  api.addFiles([
    'server/tickets.js',
    'server/Tickets.emailTemplates.js'
    ], 'server');
  
  api.use([
    'steeve:kenny-loggins@0.0.5',
    ], 'server');
  
  api.export('Tickets');
  
});

