var messageDelay = 2000;  // How long to display status messages (in milliseconds)

// Initialize the form
$(document).ready(function(){
    
  $('#contactForm').submit( submitForm );
    
  return false;
});

// Submit the form via Ajax
function submitForm() {
  var contactForm = $(this);

  // Are all the fields filled in?
  if ( !$('#senderName').val() || !$('#senderEmail').val() || !$('#message').val() ) {

    // If no, display a warning message and return to the form
    $('#incompleteMessage').fadeIn().delay(messageDelay).fadeOut();
    contactForm.fadeOut().delay(messageDelay).fadeIn();

  } else {

    // Yes, submit the form to the PHP script via Ajax
    $('#sendingMessage').fadeIn();
    contactForm.fadeOut();

    $.ajax( {
      url: contactForm.attr( 'action' ) + "?ajax=true",
      type: contactForm.attr( 'method' ),
      data: contactForm.serialize(),
      success: submitFinished
    } );
  }

  // Prevent the default form submission occurring
  return false;
}

// Handle the Ajax response
function submitFinished( response ) {
  response = $.trim( response );
  $('#sendingMessage').fadeOut();

  if ( response == "success" ) {

    // Form submitted successfully:
    // 1. Display the success message
    // 2. Clear the form fields
    // 3. Fade the content back in
    $('#successMessage').fadeIn().delay(messageDelay).fadeOut();
    $('#senderName').val( "" );
    $('#senderEmail').val( "" );
    $('#message').val( "" );
    $('#contactForm').fadeTo();

  } else {

    // Form submission failed: Display the failure message,
    // then redisplay the form
    $('#failureMessage').fadeIn().delay(messageDelay).fadeOut();
    $('#contactForm').delay(messageDelay+500).fadeIn();
  }
}
