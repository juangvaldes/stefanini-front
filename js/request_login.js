$(document).ready(function() {
	
	$("#user-register").click(function() {
		$( "#frm-login" ).toggle( "slow");
		$( "#frm-register" ).toggle( "slow");
	});
	
	$("#user-login").click(function() {
		$( "#frm-register" ).toggle( "slow");
		$( "#frm-login" ).toggle( "slow");
	});
	
	$(".login").click(function() {
		
		var modelObject = {
			user_name: $("#exampleInputLoginUser").val(),
			user_password: $("#exampleInputLoginPassword").val()
		};
		
		$.ajax({
			url: "http://localhost:8081/login/start_user",
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
				if(dataofconfirm.length > 0) {
					localStorage.setItem("userData", JSON.stringify(dataofconfirm));
					alert("Inicio de sesión exitoso.");
					location.href="index.html";
				} else {
					$(".alert-danger").toggle("slow");
				}
			}
		});
	});
	
	$(".register").click(function() {
		
		var modelObject = {
			name: $("#exampleInputName").val(),
			last_name: $("#exampleInputLastName").val(),
			email: $("#exampleInputEmail").val(),
			user_name: $("#exampleInputUser").val(),
			user_password: $("#exampleInputPassword").val()
		};
		
		$.ajax({
			url: "http://localhost:8081/login/register",
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
				alert("Registro exitoso.");
				location.href="login.html";
			}, error: function() {
				alert("Todos los campos son obligatorios.");
			}
		});
	});
});