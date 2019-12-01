$(document).ready(function() {
	var user = localStorage.getItem("userData");
	var userData = $.parseJSON(user);
	getProductsUser(userData);
});

function getProductsUser(userData) {
	var total = 0;
	$.ajax({
        url: "http://localhost:8081/product_cart/get_products?idUser="+userData[0].id
    }).then(function(data) {
       $.each(data, function(key, value) {
			var priceProduct = 0;
			if(key > 0) {
			   $('.products-cart').children().first().clone().appendTo('.products-cart').end();
			}
			$(".id-product").last().text(value[0]);
			$(".name-product").last().text(value[1]);
			$(".price-product").last().text('$'+number_format(value[3], '.', ','));
			$(".count-product").last().text(value[4]);
			$(".delete-product").last().attr("data-product", value[0]);
			priceProduct = (value[3] * value[4]);
			total = total + priceProduct;
			$(".delete-product").last().attr("data-price", priceProduct);
	   });
	   $('.products-cart').children().first().clone().appendTo('.products-cart').end();
	   $(".price-product").last().text('$'+number_format(total, '.', ','));
	   $(".price-product").last().attr("data-total", total);
	   $(".id-product").last().text("");
	   $(".count-product").last().text("");
	   $(".name-product").last().text("Total a pagar");
	   $(".delete-product").last().remove();
    });
}

function deleteProductCart(product) {
	var idProduct = $(product).attr("data-product");
	var priceDelete = $(product).attr("data-price");
	$.ajax({
		url: "http://localhost:8081/product_cart/delete_product_cart?idProduct="+idProduct,
		headers: {
			"Content-Type":"application/json",
			"Accept":"application/json"
		},
		cache: false,
		processData: false,
		contentType: false,
		type: 'GET',
		success: function (dataofconfirm) {
			var priceTotal = $(".price-product").last().attr("data-total");
			$(".price-product").last().text('$'+number_format((parseInt(priceTotal) - parseInt(priceDelete)), '.', ','));
			$(product).parent().parent().remove();
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