//Codigo para generar información de categorias y almacenarlas en un arreglo.
var categorias = [];
(()=>{
  //Este arreglo es para generar textos de prueba
  let textosDePrueba=[
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
      "Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
      "Quaerat quod qui molestiae sequi, sint aliquam omnis quos voluptas?",
      "Non impedit illum eligendi voluptas. Delectus nisi neque aspernatur asperiores.",
      "Ducimus, repellendus voluptate quo veritatis tempora recusandae dolorem optio illum."
  ]
  
  //Genera dinamicamente los JSON de prueba para esta evaluacion,
  //Primer ciclo para las categorias y segundo ciclo para las apps de cada categoria

  
  let contador = 1;
  for (let i=0;i<5;i++){//Generar 5 categorias
      let categoria = {
          nombreCategoria:"Categoria "+i,
          descripcion:textosDePrueba[Math.floor(Math.random() * (5 - 1))],
          aplicaciones:[]
      };
      for (let j=0;j<10;j++){//Generar 10 apps por categoria
          let aplicacion = {
              codigo:contador,
              Price:"$"+[Math.floor(Math.random() * (5 - 2)+2)] +"."+[Math.floor(Math.random() * (100 - 10))],
              nombre:"App "+contador,
              descripcion:textosDePrueba[Math.floor(Math.random() * (5 - 1))],
              icono:`img/app-icons/${contador}.webp`,
              instalada:contador%3==0?true:false,
              app:"app/demo.apk",
              calificacion:Math.floor(Math.random() * (5 - 1)) + 1,
              descargas:1000,
              desarrollador:`Desarrollador ${(i+1)*(j+1)}`,
              imagenes:["img/app-screenshots/1.webp","img/app-screenshots/2.webp","img/app-screenshots/3.webp"],
              comentarios:[
                  {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Juan"},
                  {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Pedro"},
                  {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Maria"},
              ]
          };
          contador++;
          categoria.aplicaciones.push(aplicacion);
      }
      categorias.push(categoria);
  }
  
  console.log(categorias);
})();

$(document).ready(function(){

    for(let i=0;i<categorias.length;i++){
        $("#select-css").append($(`
            <option  id="${categorias[i].nombreCategoria}ventanaModal" value="${i+1}">${categorias[i].nombreCategoria}</option>
        `));
    };
    obtenerDinmismo2();
    //crear localstorage
    var localStorage = window.localStorage;
    localStorage.clear();
    for(var i=0; i<categorias.length;i++){
        localStorage.setItem("Categoria"+localStorage.length,JSON.stringify(categorias[i]));
    }
    localStorage.setItem("AppStore",JSON.stringify(categorias));
    var storeAPP = JSON.parse(localStorage.getItem("AppStore"));
    storeAPPLocalDelete = JSON.parse(localStorage.getItem("AppStore"));
    ///////////console.log(storeAPP);
    //fin crear localstorage
    //llenar los select para eliminar
    for(var i=0; i<5;i++){
        $("#categoria").append($(`
            <option value="${i}">Categoria  ${i}</option>
        `));
    };
    for(var i=0; i<10;i++){
        $("#aplicacion").append($(`
            <option value="${i}">Posición App ${i}</option>
        `));
    };
    
})
function cargarAplicaciones(){
    if($("#select-css").val()==0){
        obtenerDinmismo2();
    }
    if($("#select-css").val()==1){
        $("#rowConfi1").html($(``));
        var r=0;
        obtenerDinmismo(r);
        //console.log("categoria0");
    }if($("#select-css").val()==2){
        $("#rowConfi1").html($(``));
        var r=1;
        obtenerDinmismo(r);
        //console.log("categoria1");
    }if($("#select-css").val()==3){
        $("#rowConfi1").html($(``));
        var r=2;
        obtenerDinmismo(r);
        //console.log("categoria2");
    }if($("#select-css").val()==4){
        $("#rowConfi1").html($(``));
        var r=3;
        obtenerDinmismo(r);
        //console.log("categoria3");
    }if($("#select-css").val()==5){
        $("#rowConfi1").html($(``));
        var r=4;
        obtenerDinmismo(r);  
        //console.log("categoria4");
    };
}
function obtenerDinmismo(valor){
    var CategoriaONE = JSON.parse(localStorage.getItem("Categoria"+(valor)));
    //console.log(CategoriaONE,categorias[valor]);
    for(var j=0;j<CategoriaONE.aplicaciones.length;j++){
        $("#rowConfi1").append($(`
            <div class="col-sm-6 col-md-3 col-lg-2 col-xl-2 col-6 " id="generarDinamicoLasApp">
                <div class="confiAppStyle">
                    <a data-toggle="modal" data-target="#NombreModal" onclick="ModalApp(${valor},${j})" >
                        <ul class="UlConfApp">
                            <li>
                                <img src="${CategoriaONE.aplicaciones[j].icono}" class="ImgApss" alt="">
                            </li>
                            <li>${CategoriaONE.aplicaciones[j].nombre}</li>
                            <li>${CategoriaONE.aplicaciones[j].desarrollador}</li>
                            <li>
                                <div id="ContenidoEstrellas${j}" style="windth:100%">
                                </div>
                            </li>
                            <li>${CategoriaONE.aplicaciones[j].Price}</li>
                        </ul>
                    </a>
                </div>
            </div>
        `));
        for(let k=0;k<5;k++){
            if(k<CategoriaONE.aplicaciones[j].calificacion){
                $("#ContenidoEstrellas"+j).append($(`
                    <img class="col-sm-2 col-md-2 col-lg-2 col-xl-2 col-2 ImgEstrelas" src="img/estrella llena.png" class="ImgApss" alt=""></button>
                `));
            }else{
                $("#ContenidoEstrellas"+j).append($(`
                    <img class="col-sm-2 col-md-2 col-lg-2 col-xl-2 col-2 ImgEstrelas" src="img/estrella vacia.png" class="ImgApss" alt=""></button>
                `));
            };
        };
    };
}
function obtenerDinmismo2(){
    $("#rowConfi1").html($(``));
    //var storeAPP = JSON.parse(localStorage.getItem("AppStore"));
    for(var valor=0;valor<5;valor++){
        for(var j=0;j<categorias[valor].aplicaciones.length;j++){
            $("#rowConfi1").append($(`
                <div class="col-sm-6 col-md-3 col-lg-2 col-xl-2 col-6 " id="generarDinamicoLasApp">
                    <div class="confiAppStyle">
                        <a data-toggle="modal" data-target="#NombreModal" onclick="ModalApp(${valor},${j})" >
                            <ul class="UlConfApp">
                                <li>
                                    <img src="${categorias[valor].aplicaciones[j].icono}" class="ImgApss" alt="">
                                </li>
                                <li>${categorias[valor].aplicaciones[j].nombre}</li>
                                <li>${categorias[valor].aplicaciones[j].desarrollador}</li>
                                <li>
                                    <div id="ContenidoEstrellas${valor}${j}" style="windth:100%">
                                    </div>
                                </li>
                                <li>${categorias[valor].aplicaciones[j].Price}</li>
                            </ul>
                        </a>
                    </div>
                </div>
            `));
            for(let k=0;k<5;k++){
                if(k<categorias[valor].aplicaciones[j].calificacion){
                    $("#ContenidoEstrellas"+valor+j).append($(`
                        <img class="col-sm-2 col-md-2 col-lg-2 col-xl-2 col-2 ImgEstrelas" src="img/estrella llena.png" class="ImgApss" alt=""></button>
                    `));
                }else{
                    $("#ContenidoEstrellas"+valor+j).append($(`
                        <img class="col-sm-2 col-md-2 col-lg-2 col-xl-2 col-2 ImgEstrelas" src="img/estrella vacia.png" class="ImgApss" alt=""></button>
                    `));
                };
            };
        };
    };
}
function pedir(valorx, valory){
    console.log("modalDinamismo");
    console.log(valorx,valory);
}
function ModalApp(x,y){
    var x1=x;
    var y1=y;
    $("#GenerarModal").html($(`
        <div class="modal fade" id="NombreModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document" >
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="container-fluid" >
                            <div class="row">
                                <div class="col-xl-12" id="ModalImagen">
                                    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                                        <div class="carousel-inner">
                                            <div class="carousel-item active">
                                                <img src="img/app-screenshots/1.webp" class="d-block w-100" alt="...">
                                            </div>
                                        <div class="carousel-item">
                                            <img src="img/app-screenshots/2.webp" class="d-block w-100" alt="...">
                                        </div>
                                        <div class="carousel-item">
                                            <img src="img/app-screenshots/3.webp" class="d-block w-100" alt="...">
                                        </div>
                                    </div>
                                        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="sr-only">Previous</span>
                                        </a>
                                        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="sr-only">Next</span>
                                        </a>
                                    </div>
                                </div>
                                <hr>
                                <div class="col-xl-4" class="ModalImagen">
                                    <img src="${categorias[x1].aplicaciones[y1].icono}" alt=""class="ImgApss">
                                </div>
                                <div class="col-xl-8">
                                    <div class="col-xl-12">
                                        <h1 style="font-size: 25px;" id="NombreModal">${categorias[x1].aplicaciones[y1].nombre}
                                        </h1>
                                    </div>
                                    <div class="col-xl-12">
                                        <h1 style="font-size: 10px;" id="desarrolladorModal">${categorias[x1].aplicaciones[y1].desarrollador}
                                        </h1>
                                    </div>
                                    <div class="col-xl-12">
                                        <h1 style="font-size: 12px;" id="InfoModal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe corrupti accusantium consectetur est error ex laboriosam sed, ab at ipsum? Quo odit atque doloribus deleniti.
                                        </h1>
                                    </div>
                                </div>
                                <hr>
                                <div id="ContenidoEstrellasModal${y1}" style="display: block;margin-left: auto;margin-right: auto;">
                                </div>
                                    
                                
                                <div id="AppendText" class="row">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `));
    for(let k=0;k<5;k++){
        if(k<categorias[x1].aplicaciones[y1].calificacion){
            $("#ContenidoEstrellasModal"+y1).append($(`
                <img class="col-sm-2 col-md-2 col-lg-2 col-xl-2 col-2 ImgEstrelas" style="width: 30px;" src="img/estrella llena verde.png" class="ImgApss" alt=""></button>
            `));
        }else{
            $("#ContenidoEstrellasModal"+y1).append($(`
                <img class="col-sm-2 col-md-2 col-lg-2 col-xl-2 col-2 ImgEstrelas" style="width: 30px;" src="img/estrella vacia verde.png" class="ImgApss" alt=""></button>
            `));
        };
    };
    $("#ContenidoEstrellasModal"+y1).append($(`
    <span class="col-sm-2 col-md-2 col-lg-2 col-xl-2 col-2" style="font-size: 20px;color: #ADE552;" id="desarrolladorModal">${categorias[x1].aplicaciones[y1].calificacion}.0</span>          
    `));
    
    for(let k=0;k<categorias[x1].aplicaciones[y1].comentarios.length;k++){
        $("#AppendText").append($(`
            <hr>
        `));
        $("#AppendText").append($(`
            <div class="col-3" class="ModalImagen">
                <img src="img/user.webp" alt=""class="ImgApss" style="border-radius: 100%;">
            </div>
            <div class="col-8">
                <div class="col-12">
                    <h1 style="font-size: 24px;" id="NombreModal" >${categorias[x1].aplicaciones[y1].comentarios[k].usuario}
                    </h1>
                </div>
                <div class="col-12">
                    <h1 style="font-size: 17px;" id="desarrolladorModal">${categorias[x1].aplicaciones[y1].comentarios[k].comentario}
                    </h1>
                </div>
            </div>
        `));
    }
    $("#AppendText").append($(`
        <hr>
    `));
    if(categorias[x1].aplicaciones[y1].instalada==true){
        $("#AppendText").append($(`
        <div style=" display: block; margin-left: auto; padding-right: 10px; ">
            <input type="button" class="btn btn-secondary" value="Cancel">
            <input type="button" class="btn btn-warning" value="Instalado">
        </div>
        `));
    }else{
        $("#AppendText").append($(`
        <div style=" display: block; margin-left: auto; padding-right: 10px; ">
            <input type="button" class="btn btn-secondary" value="Cancel">
            <input type="button" class="btn btn-success" value="Instalar">
        </div>
        `));
    };
}
//fin llenar los select para eliminar
function enviarInfoBorra(){
    storeAPPLocalDelete[$("#categoria").val()].aplicaciones.splice($("#aplicacion").val(),1);
    localStorage.clear();
    localStorage.setItem("AppStore",JSON.stringify(storeAPPLocalDelete));
    for(var i=0; i<categorias.length;i++){
        if(i==$("#categoria").val()){
            var categoriaOne = categorias[i];
            console.log("se elimino App");
            categoriaOne.aplicaciones.splice($("#aplicacion").val(),1);
            localStorage.setItem("Categoria"+i,JSON.stringify(categoriaOne));
        }else{
            localStorage.setItem("Categoria"+i,JSON.stringify(categorias[i]));
        }
    }
    
} 

    