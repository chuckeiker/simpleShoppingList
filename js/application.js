$(document).ready(function() {
  // Calculate and display subtotal of each item
  function updateSubtotal(itemRow) {
    var price = parseFloat(itemRow.find('.item-price').text().replace('$', ''));
    var quantity = parseInt(itemRow.find('.quantity').val()) || 0;
    var subtotal = price * quantity;
    itemRow.find('.item-subtotal').text('$' + subtotal.toFixed(2));
    updateTotal();
  }

  // Calculate and display total price
  function updateTotal() {
  var totalPrice = 0;
  $('.item').each(function() {
      var subtotal = parseFloat($(this).find('.item-subtotal').text().replace('$', ''));
      if (!isNaN(subtotal)) {
        totalPrice += subtotal;
      }
    });
    $('#total-price').text('$' + totalPrice.toFixed(2));
  }

  // Update subtotal when quantity is changed
  $('.quantity').on('input', function() {
    updateSubtotal($(this).closest('.item'));
  });

  // Add item to the list
  function resetForm() {
    $('#name').val('');
    $('#name').attr('placeholder', 'Item name');
    $('#cost').val('');
    $('#cost').attr('placeholder', '$.00');
  }

  $('#add').click(function() {
    var name = $('#name').val();
    var cost = $('#cost').val();
    var newItem = $('<div class="row item">' +
      '<div class="item-name col-xs-3">' + name + '</div>' +
      '<div class="item-price col-xs-3">$' + cost + '</div>' +
      '<div class="item-qty col-xs-3">' +
        '<label>QTY</label> ' +
        '<input class="quantity" type="number">' +
      '</div>' +
      '<div class="col-xs-1">' +
        '<button class="remove">Remove</button>' +
      '</div>' +
      '<div class="item-subtotal col-xs-2">$--.--</div>' +
    '</div>');
    $('#item-list').prepend(newItem);
    $('.quantity').off('input').on('input', function() {
      updateSubtotal($(this).closest('.item'));
    });
    resetForm(); // Reset text box placeholders
  });

  // Remove item from the list
  $(document).on('click', '.remove', function() {
    $(this).closest('.item').remove();
    updateTotal();
  });
});
