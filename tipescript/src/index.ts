let habitacion: number[]= [0,0,0,0,0];

let mostrarEstado =() => {
    let estado: string ="estado de las habitaciones \n";
    for (let i =0; i < habitacion.length; i++){
        estado +=`habitacion ${i+1}: ${habitacion[i]=== 0 ? "libre" : "ocupado"}\n`
    }
    alert(estado);
};

// funcion para reservar una habitacion

const reservarHabitacion = (num :any) => {
    if(num < 1 || num > 5){
        alert("el numero de habitacion es invalido usa 1-5");

    } else if(habitacion [num - 1]  === 1){
        alert("habitaccion ya ocupada")
    } else{
        habitacion[num - 1] = 1;
        alert (`habitacion${num} reservada con exito`)
    }
}
