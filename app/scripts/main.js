
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
		    			email: true
		    		},
		    		email2:{
		    			required: true,
		    			equalTo: email
		    		},
		    		cif: "required",
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
		    		contraseña: "required"
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

//relleno el CP con ceros si no tiene 5 dígitos
$("#cp").focusout(function(){
	var dig= $("#cp").val();
	if(dig.lenght()==4){
		$("#cp").val("0" + dig);
	}
	var cp= $("#cp").val();
	var promise = $.ajax({
		type: 'GET',
		"url" : "../php/postales.php",
		"dataType": "json",
		data : {cp : cp}
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
