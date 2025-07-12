// Clase que representa a un usuario que será atendido
class Usuario {
    constructor(id, segmento) {
      this.id = id; // Identificador único del usuario
      this.segmento = segmento; // Puede ser "Estudiante" o "Docente"
    }
  }
  
  // Clase que representa un módulo de atención: Terminal o Oficina
  class ModuloAtencion {
    constructor(nombre) {
      this.nombre = nombre; // Nombre del módulo
      this.atendidos = []; // Lista de atenciones realizadas en el módulo
    }
  
    // Registra una atención en el módulo
    atender(usuario, fecha) {
      this.atendidos.push({ usuario, fecha });
    }
  
    // Obtiene estadísticas de atención por día y por segmento
    getEstadisticasPorDia(fecha) {
      // Filtra los usuarios atendidos ese día
      const usuariosDelDia = this.atendidos.filter(a => a.fecha === fecha);
  
      // Cuenta cuántos son estudiantes y cuántos docentes
      const estudiantes = usuariosDelDia.filter(a => a.usuario.segmento === 'Estudiante').length;
      const docentes = usuariosDelDia.filter(a => a.usuario.segmento === 'Docente').length;
  
      return {
        modulo: this.nombre,
        fecha,
        total: usuariosDelDia.length,
        estudiantes,
        docentes
      };
    }
  
    // Retorna la cantidad total de usuarios atendidos en este módulo
    getTotalAtendidos() {
      return this.atendidos.length;
    }
  
    // Función recursiva para contar usuarios de un segmento específico
    contarPorSegmento(segmento, index = 0, total = 0) {
      // Caso base: si ya recorrió toda la lista
      if (index >= this.atendidos.length) {
        return total;
      }
  
      // Si el usuario actual pertenece al segmento, suma 1
      if (this.atendidos[index].usuario.segmento === segmento) {
        total++;
      }
  
      // Llamada recursiva al siguiente elemento
      return this.contarPorSegmento(segmento, index + 1, total);
    }
  }
  
  // Clase principal del sistema de atención
  class SistemaAtencion {
    constructor() {
      // Se inicializan dos módulos: Terminal y Oficina
      this.modulos = {
        Terminal: new ModuloAtencion('Terminal'),
        Oficina: new ModuloAtencion('Oficina')
      };
      this.transferencias = []; // Lista de transferencias entre módulos
    }
  
    // Atiende a un usuario en un módulo específico en una fecha dada
    atenderEn(moduloNombre, usuario, fecha) {
      this.modulos[moduloNombre].atender(usuario, fecha);
    }
  
    // Transfiere un usuario de un módulo a otro, registrando la acción
    transferir(usuario, deModulo, aModulo, fecha) {
      this.transferencias.push({ usuario, de: deModulo, a: aModulo, fecha });
      this.modulos[aModulo].atender(usuario, fecha);
    }
  
    // Devuelve un resumen global de estadísticas para una fecha específica
    getEstadisticasGlobales(fecha) {
      // Suma total de atenciones en todos los módulos
      const total = Object.values(this.modulos).reduce(
        (sum, mod) => sum + mod.getTotalAtendidos(),
        0
      );
  
      return {
        fecha,
        totalAtendidos: total,
        transferencias: this.transferencias.filter(t => t.fecha === fecha).length,
        modulos: Object.values(this.modulos).map(mod => mod.getEstadisticasPorDia(fecha))
      };
    }
  }
  
  // Ejemplo de uso:
  const sistema = new SistemaAtencion();
  
  const usuario1 = new Usuario(1, 'Estudiante');
  const usuario2 = new Usuario(2, 'Docente');
  const usuario3 = new Usuario(3, 'Estudiante');
  const usuario4 = new Usuario(4, 'Estudiante');
  const usuario5 = new Usuario(5, 'Docente');
  
  const fechaHoy = '2025-05-25';
  const fechaAyer = '2025-05-24';
  
  sistema.atenderEn('Terminal', usuario1, fechaHoy);
  sistema.atenderEn('Oficina', usuario2, fechaHoy);
  sistema.atenderEn('Terminal', usuario3, fechaHoy);
  sistema.atenderEn('Oficina', usuario4, fechaAyer);
  sistema.transferir(usuario5, 'Terminal', 'Oficina', fechaHoy);
  
  console.log('Estadísticas por día - Terminal:', sistema.modulos.Terminal.getEstadisticasPorDia(fechaHoy));
  console.log('Estadísticas por día - Oficina:', sistema.modulos.Oficina.getEstadisticasPorDia(fechaHoy));
  console.log('Total atendidos en Terminal:', sistema.modulos.Terminal.getTotalAtendidos());
  console.log('Total estudiantes en Terminal:', sistema.modulos.Terminal.contarPorSegmento('Estudiante'));
  console.log('Estadísticas globales hoy:', sistema.getEstadisticasGlobales(fechaHoy));
  console.log('Estadísticas globales ayer:', sistema.getEstadisticasGlobales(fechaAyer));