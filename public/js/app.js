// jQUERY animations and modals

$(".deleteButton").click(function(){
    // Fetch id of the Item
    const itemId = "#" + $(this).attr('id');
    $(itemId).fadeOut();
});


$("h4").click(function(){
    const itemId = $(this).attr('id');
    //console.log(itemId);

    // Pga jag inte vet hur jag skall få in ID just nu, finns säkert bättre sätt
    $( "#modalFormen" ).append( $('<input type="text" id="updateId" name="updateItemId">') );
    $("#updateId").css("display", "none");
    $("#updateId").attr("value", itemId);
    $("#myModal").modal('show');
});


// Close modal on button click
$(".btn-danger").click(function(){
    $("#myModal").modal('hide');
});


// dynamically adjust the alignment of the modal and 
// always keep it in the center of the page even if the user resizes the browser window.
function alignModal(){
    var modalDialog = $(this).find(".modal-dialog");
    
    // Applying the top margin on modal to align it vertically center
    modalDialog.css("margin-top", Math.max(0, ($(window).height() - modalDialog.height()) / 2));
}
// Align modal when it is displayed
$("#myModal").on("shown.bs.modal", alignModal);

// Align modal when user resize the window
$(window).on("resize", function(){
    $("#myModal:visible").each(alignModal);
});
