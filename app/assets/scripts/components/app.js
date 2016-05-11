'use strict';
var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var InfoModal = require('./modals/info_modal');
var WelcomeModal = require('./modals/welcome_modal');
var MessageModal = require('./modals/message_modal');
var Header = require('./header');
var actions = require('../actions/actions');

var App = React.createClass({
  displayName: 'App',

  mixins: [ Router.State ],

  componentWillMount: function () {
    // Pull the search filter state from the URL.  Why is this here instead
    // of in the Filters component?  Because we want to ensure that we set
    // these filter parameters BEFORE the map component loads, since that is
    // where the map move action will get fired, triggering the first API load.
    //
    // TODO: this should be reviewed at some point.
    var params = this.getQuery();
    if (params.date) {
      actions.setDateFilter(params.date);
    }
    if (params.resolution) {
      actions.setResolutionFilter(params.resolution);
    }
    if (params.type) {
      actions.setDataTypeFilter(params.type);
    }
  },

  render: function () {
    // Only show the modal if there are no url params.
    // There can't be any other without map
    var showWelcomeModal = !this.getParams().map;

    return (
      <div>
        <Header />
        <main id='site-body' role='main'>
          <RouteHandler />
        </main>
        <WelcomeModal revealed={showWelcomeModal} />
        <InfoModal />
        <MessageModal />
      </div>
    );
  }
});

module.exports = App;
