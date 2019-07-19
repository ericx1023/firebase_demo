$(function() {
  var productsRef = firebase.database().ref("products");

  // https://firebase.google.com/docs/database/web/read-and-write#listen_for_value_events
  productsRef.on("value", function(snapshot) {
    var products = snapshot.val();

    var tmpl = $.templates('#product-item');
    var html = tmpl.render(products);

    $('#product-list').html(html);
  });
});
