
// // las class y los atrubustos  dependen sel contexto
// una clase solo hace las funciones 
// class persona{
//     nombre 
//     correo
//     celular
//     registrar(){

//     }
//     actualizarDatos(){

//     }
//     //propiedades- atrivutos "variables "caracteristica 

//     // metodos-funciones -acciones 
//     // las propieddades se relacuionan con las caracteristicas
// }

class estudiante {
    id          //visibilidad -modificador de acceso:publico privado oun metodo tiene que ser publico para acceder a una privada 
    nombre      //get y set es el metodo para accedeer a un privado 
    apellido
    celular
    correo
    dir 


    constructor(){  // se convoca automaticamnete cuando se crea la instancia 
        
        console.log("esto es el cosnstructor")
         
    }

    registrar(){

    }

    actualizar(){

    }

}

class matricula{
    nuemroregistro
    fecha
    programa
    estudiante = []
}


const objeto=new estudiante() //instancia - crear objeto    abstraer y contexto
const estudiante2= new estudiante()

objeto.nombre="juan"  


// para nombrar si una propiedad es privado,  publico o protegido se utiliza #}




let estudiantes=[
    estudiantes.push(estudiante)
]