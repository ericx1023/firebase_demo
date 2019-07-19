$(function() {
  $("#createProduct").on("submit", function(e) {
    e.preventDefault();

    //get product key
    var key = createProductKey();

    var picture = $("#picture").get(0).files[0];
    var productImageRef = firebase
      .storage()
      .ref("productImages/" + key)
      .child(picture.name);
      
      
      //put: Uploads data to this reference's location.
    productImageRef.put(picture).then(snapshot => {
      //Fetches a long lived download URL for this object.
      snapshot.ref.getDownloadURL().then(url => {
        var product = {
          title: $("#title").val(),
          price: +$("#price").val(),
          count: +$("#count").val(),
          description: $("#description").val(),
          url: url
        };

        console.log(product);
        createProduct(key, product);
      });
    });
  });
});

function createProductKey() {
  //get database instance
  var database = firebase.database();
  
  //Returns a Reference to the Query's location. 
  //Get product reference
  var productRef = database.ref("products");
  //Generates a new child location using a unique key and returns its Reference.
  //https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#push
  var key = productRef.push().key;

  return key;
}

function createProduct(key, product) {
  var database = firebase.database();
  var productRef = database.ref("products");
  //child(path: string): Reference
  //Gets a Reference for the location at the specified relative path.
  productRef.child(key).set(product);
}
