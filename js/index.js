/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/


function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();

$(function(){

  $('select').material_select();



  $('.preloader-wrapper').hide();

  // Función para mostrar datos

  $('#mostrarTodos').click(function(){

    $('.preloader-wrapper').show();
    $('#info').hide();

    getData();

  });

  var totalData;

  assingSelect();

  $('#formulario').submit(function(e){
    e.preventDefault();
    var city = $('#ciudadesSelect').val();
    var tipo = $('#selectTipo').val();
    var precio = $('#rangoPrecio').val();

    var array = precio.split(";");
    var precioInicial = array[0];
    var precioFinal = array[1];


    console.log({
        'city': city,
        'tipo': tipo,
        'precio_inicial': precioInicial,
        'precio_final': precioFinal
    });

    var typeStatus = 0;

     if(city != "" && tipo == ""){
       console.log('solo ciudad');
       typeStatus = 1;
     }else if(city == "" && tipo != ""){
        console.log('solo tipo');
        typeStatus = 2;
     }else if(city != "" && tipo != ""){
        console.log('tipo y ciudad');
        typeStatus = 3
     }

     $('.preloader-wrapper').show();
     $('#info').hide();

    setTimeout(function(){

      $('.preloader-wrapper').hide();
      $('#info').show();
      var json = '';

    for(index in totalData){

      if(typeStatus == 1 && (totalData[index].Ciudad = city)){

        json+='<div class="col s12 m4">';
        json+='<div class="card">';
        json+='<div class="card-image">';
        json+='<img src="img/city.jpg">';
        json+='</div>';
        json+='<div class="card-content">';
        json+='<p><strong>Id:</strong> '+totalData[index].Id+'<br>';
        json+='<p><strong>Dirección:</strong> '+totalData[index].Direccion+'<br>';
        json+='<p><strong>Ciudad:</strong> '+totalData[index].Ciudad+'<br>';
        json+='<strong>Código postal:</strong>'+totalData[index].Codigo_Postal+'<br>';
        json+='<strong>Precio:</strong>'+totalData[index].Codigo_Postal+'<br>';
        json+='<strong>Telefono:</strong>'+totalData[index].Codigo_Postal+'<br>';
        json+='<strong>Tipo:</strong> '+totalData[index].Tipo+'</p>';
        json+='</div>';
        json+='<div class="card-action">';
        json+='</div>';
        json+='</div>';
        json+='</div>';

       }else if(typeStatus == 2 && (totalData[index].Tipo = tipo)){

        json+='<div class="col s12 m4">';
        json+='<div class="card">';
        json+='<div class="card-image">';
        json+='<img src="img/city.jpg">';
        json+='</div>';
        json+='<div class="card-content">';
        json+='<p><strong>Id:</strong> '+totalData[index].Id+'<br>';
        json+='<p><strong>Dirección:</strong> '+totalData[index].Direccion+'<br>';
        json+='<p><strong>Ciudad:</strong> '+totalData[index].Ciudad+'<br>';
        json+='<strong>Código postal:</strong>'+totalData[index].Codigo_Postal+'<br>';
        json+='<strong>Precio:</strong>'+totalData[index].Codigo_Postal+'<br>';
        json+='<strong>Telefono:</strong>'+totalData[index].Codigo_Postal+'<br>';
        json+='<strong>Tipo:</strong> '+totalData[index].Tipo+'</p>';
        json+='</div>';
        json+='<div class="card-action">';
        json+='</div>';
        json+='</div>';
        json+='</div>';

       }else if(typeStatus == 3 && (totalData[index].Tipo = tipo) && (totalData[index].Ciudad = city)){

        json+='<div class="col s12 m4">';
        json+='<div class="card">';
        json+='<div class="card-image">';
        json+='<img src="img/city.jpg">';
        json+='</div>';
        json+='<div class="card-content">';
        json+='<p><strong>Id:</strong> '+totalData[index].Id+'<br>';
        json+='<p><strong>Dirección:</strong> '+totalData[index].Direccion+'<br>';
        json+='<p><strong>Ciudad:</strong> '+totalData[index].Ciudad+'<br>';
        json+='<strong>Código postal:</strong>'+totalData[index].Codigo_Postal+'<br>';
        json+='<strong>Precio:</strong>'+totalData[index].Codigo_Postal+'<br>';
        json+='<strong>Telefono:</strong>'+totalData[index].Codigo_Postal+'<br>';
        json+='<strong>Tipo:</strong> '+totalData[index].Tipo+'</p>';
        json+='</div>';
        json+='<div class="card-action">';
        json+='</div>';
        json+='</div>';
        json+='</div>';

       }


      
     //W console.log(datos[city]);

    }

    $('#info').html(json);

    },2000);

     












  });

  function assingSelect(){

    var citys = [];
    var types = [];
    $.get('data-1.json', function(datos){

       totalData = datos;

      for(index in datos){

        citys.push(datos[index].Ciudad);
        types.push(datos[index].Tipo);
      }
      //console.log(citys);

      citys =  citys.filter( onlyUnique );
      types =  types.filter( onlyUnique );

      var htmlCitys = '<option value="">Selecciona una ciudad</option>';

      var htmlTypes = '<option value="">Selecciona un tipo</option>';

      for(optionCity in citys){
        htmlCitys+='<option value="'+citys[optionCity]+'">'+citys[optionCity]+'</option>';
      }

      for(optionTypes in types){
        htmlTypes+='<option value="'+types[optionTypes]+'">'+types[optionTypes]+'</option>';
      }

      $('#ciudadesSelect').html(htmlCitys);
      $('#selectTipo').html(htmlTypes);
      
        console.log(citys);
        console.log(types);
        $('select').material_select();
    });

  }

   function getData(){

    $.get('data-1.json', function(datos){

    var json = '';

    for(city in datos){

      json+='<div class="col s12 m4">';
      json+='<div class="card">';
      json+='<div class="card-image">';
      json+='<img src="img/city.jpg">';
      json+='</div>';
      json+='<div class="card-content">';
      json+='<p><strong>Id:</strong> '+datos[city].Id+'<br>';
      json+='<p><strong>Dirección:</strong> '+datos[city].Direccion+'<br>';
      json+='<p><strong>Ciudad:</strong> '+datos[city].Ciudad+'<br>';
      json+='<strong>Código postal:</strong>'+datos[city].Codigo_Postal+'<br>';
      json+='<strong>Precio:</strong>'+datos[city].Codigo_Postal+'<br>';
      json+='<strong>Telefono:</strong>'+datos[city].Codigo_Postal+'<br>';
      json+='<strong>Tipo:</strong> '+datos[city].Tipo+'</p>';
      json+='</div>';
      json+='<div class="card-action">';
      json+='</div>';
      json+='</div>';
      json+='</div>';
     //W console.log(datos[city]);

    }

    $('#info').html(json);
    $('.preloader-wrapper').hide();
    $('#info').show();

    });

   }

  function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
  }


});


