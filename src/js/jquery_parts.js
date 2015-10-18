var $ = require('jquery');
require('jquery-ui/dialog');

$( '#dialog-ua-info' ).dialog({ autoOpen: false });

$( document ).ready(function() {
  console.info('document ready');
  bind_buttons();
});

function bind_buttons() {
  $( '#reload' ).click(function(){
    location.reload();
  });

  $( '#btn-ua-info' ).click(function() {
    var agent = navigator.userAgent;
    var $dialog = $( '#dialog-ua-info' );
    $dialog.first('#ua-info').text(agent);
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
