var logger = require('bragi-browser');
var $ = require('jquery');
require('jquery-ui/dialog');

$( '#dialog' ).dialog({ autoOpen: false });

$( document ).ready(function() {
  logger.log('debug', 'document ready');
  bind_buttons();
});


function bind_buttons() {
  $( '#reload' ).click(function(){
    location.reload();
  });

  $( '#info' ).click(function() {
    var agent = navigator.userAgent;
    var $dialog = $( '#dialog' );
    $dialog.first('#info').text(agent);
    $dialog.dialog({
      modal: true,
      buttons: {
        Ok: function() {
          $( this ).dialog( 'close' );
        }
      }
    });
  });
}
