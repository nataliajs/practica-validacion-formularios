
		    $("#formulario").validate({
		    	rules:{
		    		nombre:{
		    			required: true,
		    			minlength: 2
		    		},
		    		apellidos: "required",
		    		telefono: {
		    			required: true,
		    			minlength: 9,
		    			maxlength: 9,
		    			digits: true
		    		},
		    		email: {
		    			required: true,
		    			email: true,
		    			remote: 'http://nataliajimenez.infenlaces.com/dist/php/comprobar_mail.php'
		    		},
		    		email2:{
		    			required: true,
		    			equalTo: email
		    		},
		    		documentNumber: {
		    			/*required: true,
		    			remote: 'http://nataliajimenez.infenlaces.com/dist/php/comprobar_dni.php'*/
                        required: true,
                        nifES: function() {
                            if ($('#particular').is(":checked") ){
                                return true;
                            }
                        },
                        
                        remote: function() {
                            if ($('#particular').is(":checked") ) {
                                return 'http://nataliajimenez.infenlaces.com/dist/php/comprobar_dni.php';
                            }
                        },		   
                        cifES: function(){
                        	if($('#empresa').is(":checked")){
								return true;
							}
                        }			
		    		},
		    		nombreempresa: "required",
		    		direccion: "required",
		    		cp: {
		    			required: true,
		    			minlength: 4,
		    			maxlength: 5,
		    			digits: true
		    		},
		    		localidad: "required",
		    		provincia: "required",
		    		pais: "required",
		    		iban: {
		    			required: true,
		    			iban: true
		    		},
		    		usuario:{
		    			required: true,
		    			minlength: 4
		    		},
		    		contraseña: {
		    			required: true,
		    			minlength: 6
		    		}
		    	},
		    	messages:{
		    		email:{
		    			remote: jQuery.validator.format('{0} ya existe! Prueba con otro.')
		    		},
		    		documentNumber:{
		    			remote: jQuery.validator.format('El usuario con DNI: {0} ya existe.')
		    		},
		    		localidad:"No existe una localidad con el CP introducido. Introduce un CP correcto.",
		    		provincia:"No existe una provincia con el CP introducido. Introduce un CP correcto."
		    	},
		    	submitHandler: function(){
		    		var usuario=$("#usuario").val();
		    		var precio=$("option[name='pago']:checked").val();
		    		var confir=confirm("El usuario "+usuario+" va a ser dado de alta. Se le cobrara la primera cuota de "+precio+" euros.");
		    		if(confir){
		    			alert("Usuario dado de alta");
		    			window.location.reload();
		    		}else{
		    			alert("El usuario no ha sido dado de alta");
		    		}
		    	}
		    });

//cambio el label Nombre/Empresa y CIF/NIF en función de la opción seleccionada
$("#particular").change(function(){
	if($("#particular").is(":checked")){
		$("#nombreemp").html("Nombre");
		$("#cifnif").html("NIF");
		var completo = $("#nombre").val() + " " + $("#apellidos").val();
		$("#nombreempresa").val(completo);		
		$("#nombreempresa").prop("readonly" , true);
	}
});
$("#empresa").change(function(){
	if($("#empresa").is(":checked")){
		$("#nombreemp").html("Empresa");
		$("#cifnif").html("CIF");
		$("#nombreempresa").val("");
		$("#nombreempresa").prop("readonly" , false);
	}
})

//relleno el CP con ceros si no tiene 5 dígitos y busco municipio y provincia en la base de datos
$("#cp").focusout(function(){
	var dig= $("#cp").val();
	var n=dig.length;
	if(n==4){
		$("#cp").val("0" + dig);
	}
	var cp=null;
	cp= $("#cp").val();
	var promise = $.ajax({
		type: 'GET',
		url : "http://nataliajimenez.infenlaces.com/dist/php/postales.php",
		dataType: "json",
		data : {cp : cp}
	});
	promise.done(function(data){
			$("#localidad").attr("value" , data[0].municipio);
			$("#provincia").attr("value" , data[0].provincia);
			console.log("Localidad y municipio importados");
			$("#localidad").prop("readonly",true);
			$("#provincia").prop("readonly",true);
	});
	promise.fail(function(){
		console.log("Error al importar municipio y provincia");
	});
});

//cuando se completan los apellidos se rellena Nombre en los datos de facturación
$("#apellidos").focusout(function(){
	var completo = $("#nombre").val() + " " + $("#apellidos").val();
	$("#nombreempresa").val(completo);
	$("#nombreempresa").prop("readonly" , true);
});

//se rellena el nombre de usuario con el mail
$("#email").focusout(function(){
	var mail = $("#email").val();
	$("#usuario").val(mail);
	$("#usuario").prop("readonly" , true);
});

//establecer la password compleja
/*$("#password").focusin(function(){
	$("#password").complexify(options, callback(valid, complexity){
	//document.getElementById("PassValue").value = complexity;
	alert("Password complexity: " + complexity);
});
});*/
    $("#password").focusin(function () {
            $("#password").complexify({}, function (valid, complexity) {
                $("#complex").attr("value",complexity);
            });
        });
