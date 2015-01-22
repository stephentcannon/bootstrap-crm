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
  api.versionsFrom('1.0.3.1');
  api.use([
    'templating',
    'iron:router',
    'aslagle:reactive-table',
    'steeve:iron-router-helpers',
    'steeve:bootstrap3-formfield-helpers',
    'steeve:template-logic-helpers'
    ], 'client');
    
  api.addFiles([
    'client/lib/Router.js',
    'client/views/tickets/ticketsBreadCrumbs.html',
    'client/views/tickets/ticketsFetch.html',
    'client/views/tickets/ticketInsert.html',
    'client/views/tickets/ticketUpdate.html',
    'client/views/tickets/ticketView.html'
    ], 'client');
});

