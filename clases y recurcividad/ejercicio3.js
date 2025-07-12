class Hotel {
    constructor(nombre, habitacionesPorTipo = 3) {
      this.nombre = nombre;
      this.habitacionesDisponibles = {
        individual: Array(habitacionesPorTipo).fill(null),
        doble: Array(habitacionesPorTipo).fill(null),
        familiar: Array(habitacionesPorTipo).fill(null),
      };
      this.reservas = [];
      this.ocupacionActual = 0;
    }

    //metodo para reservar una habitacion segun las especificaciones

    reservarHabitacion(nombreCliente, paisOrigen, tipoHabitacion, esFumador, numPersonas, fechaInicio, fechaFin, tieneMascota = false) {
      tipoHabitacion = tipoHabitacion.toLowerCase(); //sirve para colocar todo un string en minusculas
  
      // Validaciones iniciales
      if (!['individual', 'doble', 'familiar'].includes(tipoHabitacion)) {
        return "Tipo de habitación no válido.";
      }
  
      if (numPersonas <= 0) {
        return "El número de personas debe ser mayor que cero.";
      }
  
      const maxPersonas = { individual: 2, doble: 4, familiar: 6 };
      if (numPersonas > maxPersonas[tipoHabitacion]) {
        return `El número máximo de personas para una habitación ${tipoHabitacion} es ${maxPersonas[tipoHabitacion]}.`;
      }
  
      if (tieneMascota && tipoHabitacion !== 'familiar') {
        return "Las mascotas solo se aceptan en habitaciones familiares.";
      }
  
      // Buscar una habitación disponible del tipo y preferencia
      const habitacionesDelTipo = this.habitacionesDisponibles[tipoHabitacion];
      const indiceDisponible = habitacionesDelTipo.findIndex(
        (habitacion) => habitacion === null || habitacion.esFumador === esFumador
      );
  
      if (indiceDisponible === -1) {
        return `No hay habitaciones ${tipoHabitacion} disponibles con la preferencia de fumador/no fumador.`;
      }
  
      // Realizar la reserva
      const numeroHabitacion = this._generarNumeroHabitacion(tipoHabitacion, indiceDisponible);
      this.habitacionesDisponibles[tipoHabitacion][indiceDisponible] = {
        nombreCliente,
        esFumador,
        numPersonas,
        fechaInicio,
        fechaFin,
        tieneMascota,
        numeroHabitacion
      };
  
      this.reservas.push({
        nombreCliente,
        paisOrigen,
        tipoHabitacion,
        numPersonas,
        fechaInicio,
        fechaFin,
        tieneMascota,
        numeroHabitacion
      });
  
      this.ocupacionActual += numPersonas;
  
      return `Reserva realizada con éxito. Número de habitación: ${numeroHabitacion}`;
    }
    // fin del metodo de reservar habitacion 
    // inicia el metodo para cancelar una reserva 
    cancelarReserva(numeroHabitacion) {
      for (const tipo in this.habitacionesDisponibles) {
        const indice = this.habitacionesDisponibles[tipo].findIndex(
          (habitacion) => habitacion && habitacion.numeroHabitacion === numeroHabitacion
        );
        if (indice !== -1) {
          const reservaCancelada = this.habitacionesDisponibles[tipo][indice];
          this.habitacionesDisponibles[tipo][indice] = null;
          this.ocupacionActual -= reservaCancelada.numPersonas;
  
          this.reservas = this.reservas.filter(reserva => reserva.numeroHabitacion !== numeroHabitacion);
  
          return `Reserva de la habitación ${numeroHabitacion} cancelada.`;
        }
      }
      return `No se encontró ninguna reserva con el número de habitación ${numeroHabitacion}.`;
    }
    // fin del metodo de cancelar una reserva
  
    obtenerEstadisticas() {
      const totalReservas = this.reservas.length;
      const huespedesActuales = this.ocupacionActual;
      const reservasDetalladas = this.reservas.map(reserva => ({
        Nombre: reserva.nombreCliente,
        País: reserva.paisOrigen,
        Personas: reserva.numPersonas,
        Estadía: `${reserva.fechaInicio} - ${reserva.fechaFin}`,
        Mascota: reserva.tieneMascota ? 'Sí' : 'No',
        Habitación: reserva.numeroHabitacion
      }));
  
      return {
        totalReservas,
        huespedesActuales,
        reservasDetalladas
      };
    }
  
    _generarNumeroHabitacion(tipo, indice) {
      let prefijo = '';
      switch (tipo) {
        case 'individual':
          prefijo = 'I';
          break;
        case 'doble':
          prefijo = 'D';
          break;
        case 'familiar':
          prefijo = 'F';
          break;
      }
      return `${prefijo}-${indice + 1}`;
    }
  }
  
  // Ejemplo de uso
  const miHotel = new Hotel("Hotel Paraíso");
  
  console.log(miHotel.reservarHabitacion("Ana Pérez", "Colombia", "doble", false, 2, "2025-06-10", "2025-06-15"));
  console.log(miHotel.reservarHabitacion("Juan Rodríguez", "Argentina", "individual", true, 1, "2025-06-12", "2025-06-18"));
  console.log(miHotel.reservarHabitacion("Familia Gómez", "México", "familiar", false, 4, "2025-06-15", "2025-06-20", true));
  console.log(miHotel.reservarHabitacion("Carlos López", "España", "individual", false, 2, "2025-06-20", "2025-06-25")); // No disponible
  
  console.log("\nEstado de las habitaciones después de las reservas:");
  console.log(miHotel.habitacionesDisponibles);
  
  console.log("\nEstadísticas del hotel:");
  console.log(miHotel.obtenerEstadisticas());
  
  console.log("\nCancelar una reserva:");
  console.log(miHotel.cancelarReserva("D-1"));
  
  console.log("\nEstadísticas después de la cancelación:");
  console.log(miHotel.obtenerEstadisticas());