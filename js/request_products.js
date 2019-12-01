$(document).ready(function() {
	
	getProducts();
	
	$(".confirm-cart").click(function() {
		var user = localStorage.getItem("userData");
		if(user != null) {
			addProductCart(user, $(this).attr("data-id"));
		} else {
			alert("Debe iniciar sesión.");
			location.href= "login.html";
		}
	});
	
});

function addCart(id) {
	$(".confirm-cart").attr("data-id", $(id).attr("data-id"));
}

function getProducts() {
	$.ajax({
        url: "http://localhost:8081/products/"
    }).then(function(data) {
       $.each(data, function(key, value) {
			if(key > 0) {
			   $('.post').first().clone().appendTo('.posts').end();
			}
			$('.post-title').last().text(value.product_name);
			$('.post-contenido').last().text(value.product_description);
			$('.post-fecha').last().text($.date(value.public_date));
			$('.post-price').last().text("$"+number_format(value.price, '.', ','));
			$('.img-thumbnail').last().attr('src', value.image);
			$('.add-cart').last().attr('data-id', value.id);
	   });
    });
}

function addProductCart(user, idProduct) {
	var userData = $.parseJSON(user);
	
	var modelObject = {
		id_user: userData[0].id,
		id_product: parseInt(idProduct)
	};
	
	$.ajax({
		url: "http://localhost:8081/product_cart/add_product",
		data: JSON.stringify(modelObject),
		headers: {
			"Content-Type":"application/json",
			"Accept":"application/json"
		},
		cache: false,
		processData: false,
		contentType: false,
		type: 'POST',
		success: function (dataofconfirm) {
			alert("Producto agregado correctamente.");
			$("body").removeAttr("class");
			$("body").removeAttr("style");
			$("#confirm-cart").attr("aria-hidden", "true");
			$("#confirm-cart").removeClass("in");
			$(".modal").hide();
			$(".modal-backdrop").remove();
		}
	});
}

number_format = function (number, dec_point, thousands_sep) {
	
	var nstr = number.toString();
	nstr += '';
	x = nstr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? dec_point + x[1] : '';
	var rgx = /(\d+)(\d{3})/;

	while (rgx.test(x1))
		x1 = x1.replace(rgx, '$1' + thousands_sep + '$2');

	return x1 + x2;
}

$.date = function(dateObject) {
    var d = new Date(dateObject);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var date = day + "/" + month + "/" + year;

    return date;
};