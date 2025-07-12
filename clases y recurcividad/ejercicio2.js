const prompt = require("readline-sync");

// Simulación del Banco (datos en memoria)
const banco = {
    clientes: [
        {
            cedula: "1234",
            pin: "1234",
            cuentas: [
                { numero: "001", saldo: 1000000 },
                { numero: "002", saldo: 500000 }
            ]
        },
        {
            cedula: "5678",
            pin: "5678",
            cuentas: [
                { numero: "003", saldo: 2000000 }
            ]
        }
    ],
    // Valida si las credenciales (cedula y pin) coinciden con algún cliente.
    validarCredenciales: function(cedula, pin) {
        const cliente = this.clientes.find(c => c.cedula === cedula && c.pin === pin);
        return cliente || null;
    },
    // Simula la aprobación de un retiro por el banco y actualiza el saldo si es aprobado.
    aprobarRetiro: function(cuenta, monto) {
        const cuentaCliente = this.clientes.find(c => c.cuentas.some(cta => cta.numero === cuenta.numero));
        if (cuentaCliente) {
            const cuentaBanco = cuentaCliente.cuentas.find(cta => cta.numero === cuenta.numero);
            if (cuentaBanco && cuentaBanco.saldo >= monto) {
                cuentaBanco.saldo -= monto;
                return true;
            }
        }
        return false;
    },
    // Actualiza el saldo de una cuenta después de un depósito.
    actualizarSaldoDeposito: function(cuenta, monto) {
        const cliente = this.clientes.find(c => c.cuentas.some(cta => cta.numero === cuenta.numero));
        if (cliente) {
            const cuentaBanco = cliente.cuentas.find(cta => cta.numero === cuenta.numero);
            if (cuentaBanco) {
                cuentaBanco.saldo += monto;
                return true;
            }
        }
        return false;
    },
    // Realiza la transferencia de saldo entre dos cuentas.
    transferirSaldo: function(cuentaOrigen, cuentaDestino, monto) {
        const clienteOrigen = this.clientes.find(c => c.cuentas.some(cta => cta.numero === cuentaOrigen.numero));
        const clienteDestino = this.clientes.find(c => c.cuentas.some(cta => cta.numero === cuentaDestino.numero));

        if (clienteOrigen && clienteDestino) {
            const ctaOrigenBanco = clienteOrigen.cuentas.find(cta => cta.numero === cuentaOrigen.numero);
            const ctaDestinoBanco = clienteDestino.cuentas.find(cta => cta.numero === cuentaDestino.numero);

            if (ctaOrigenBanco && ctaDestinoBanco && ctaOrigenBanco.saldo >= monto) {
                ctaOrigenBanco.saldo -= monto;
                ctaDestinoBanco.saldo += monto;
                return true;
            }
        }
        return false;
    },
    // Busca y devuelve el saldo de una cuenta específica.
    consultarSaldo: function(numeroCuenta) {
        for (const cliente of this.clientes) {
            const cuenta = cliente.cuentas.find(c => c.numero === numeroCuenta);
            if (cuenta) {
                return cuenta.saldo;
            }
        }
        return undefined;
    }
};

// Clase para el Cajero Automático
class CajeroAutomatico {
    constructor() {
        this.encendido = false;
        this.clienteActual = null;
    }

    // Enciende el cajero automático.
    encender() {
        this.encendido = true;
        console.log("🏧 El cajero automático ha sido encendido.");
    }

    // Apaga el cajero automático y restablece el cliente actual.
    apagar() {
        this.encendido = false;
        console.log("🛑 El cajero automático ha sido apagado.");
        this.clienteActual = null;
    }

    // Inicia el proceso de atención al cliente, solicitando credenciales y mostrando el menú.
    atenderCliente() {
        if (!this.encendido) {
            console.log("El cajero automático está apagado. Por favor, enciéndalo.");
            return;
        }

        console.log("\nBienvenido al cajero automático.");
        let intentosPin = 0;
        let clienteAutenticado = null;

        while (intentosPin < 3 && !clienteAutenticado) {
            const cedula = prompt.question("Ingrese su documento de identidad: ");
            const pin = prompt.question("Ingrese su PIN de 4 dígitos: ", { hideEchoBack: true });

            clienteAutenticado = banco.validarCredenciales(cedula, pin);

            if (clienteAutenticado) {
                this.clienteActual = clienteAutenticado;
                console.log("✅ Credenciales validadas.");
                this.mostrarMenu();
            } else {
                intentosPin++;
                if (intentosPin < 3) {
                    console.log("❌ PIN incorrecto. Intente nuevamente.");
                } else {
                    console.log("❌ Demasiados intentos fallidos. La sesión ha terminado.");
                }
            }
        }
    }

    // Muestra el menú de transacciones disponibles para el cliente.
    mostrarMenu() {
        let continuar = true;
        while (continuar && this.clienteActual) {
            console.log("\nSeleccione una transacción:");
            console.log("1. Retirar efectivo");
            console.log("2. Depositar dinero");
            console.log("3. Transferir dinero");
            console.log("4. Consultar saldo");
            console.log("5. Salir");

            const opcion = prompt.question("Opción: ");

            switch (opcion) {
                case "1":
                    this.realizarRetiro();
                    break;
                case "2":
                    this.realizarDeposito();
                    break;
                case "3":
                    this.realizarTransferencia();
                    break;
                case "4":
                    this.consultarSaldoCliente();
                    break;
                case "5":
                    continuar = false;
                    console.log("Gracias por usar el cajero automático. ¡Hasta luego!");
                    this.clienteActual = null;
                    break;
                default:
                    console.log("Opción inválida. Por favor, intente nuevamente.");
            }
        }
    }

    // Permite al cliente realizar un retiro de efectivo.
    realizarRetiro() {
        if (!this.clienteActual) return;

        console.log("\nSeleccione la cuenta para retirar:");
        this.mostrarCuentasCliente();
        const numeroCuentaRetiro = prompt.question("Número de cuenta: ");
        const cuentaRetiro = this.clienteActual.cuentas.find(c => c.numero === numeroCuentaRetiro);

        if (cuentaRetiro) {
            const montoStr = prompt.question("Ingrese el monto a retirar (múltiplos de $50000): ");
            const montoRetiro = parseInt(montoStr);

            if (isNaN(montoRetiro) || montoRetiro <= 0 || montoRetiro % 50000 !== 0) {
                console.log("❌ El monto ingresado no es válido. Debe ser un múltiplo de $50000.");
                return;
            }

            if (banco.aprobarRetiro(cuentaRetiro, montoRetiro)) {
                console.log(`✅ Retiro exitoso de $${montoRetiro}. Puede tomar el dinero de la bandeja principal.`);
            } else {
                console.log("❌ El banco no aprobó el retiro. Fondos insuficientes o problema con la cuenta.");
            }
        } else {
            console.log("❌ Cuenta no encontrada.");
        }
    }

    // Permite al cliente realizar un depósito.
    realizarDeposito() {
        if (!this.clienteActual) return;

        console.log("\nSeleccione la cuenta para depositar:");
        this.mostrarCuentasCliente();
        const numeroCuentaDeposito = prompt.question("Número de cuenta: ");
        const cuentaDeposito = this.clienteActual.cuentas.find(c => c.numero === numeroCuentaDeposito);

        if (cuentaDeposito) {
            const montoStr = prompt.question("Ingrese el monto a depositar: ");
            const montoDeposito = parseInt(montoStr);

            if (isNaN(montoDeposito) || montoDeposito <= 0) {
                console.log("❌ El monto ingresado no es válido.");
                return;
            }

            const tipoDeposito = prompt.question("Ingrese el tipo de depósito (efectivo o cheque): ").toLowerCase();

            if (tipoDeposito === "efectivo" || tipoDeposito === "cheque") {
                if (banco.actualizarSaldoDeposito(cuentaDeposito, montoDeposito)) {
                    console.log(`✅ Depósito de $${montoDeposito} (${tipoDeposito}) realizado exitosamente en la cuenta ${numeroCuentaDeposito}.`);
                } else {
                    console.log("❌ Error al realizar el depósito. Por favor, intente nuevamente.");
                }
            } else {
                console.log("❌ Tipo de depósito no válido.");
            }
        } else {
            console.log("❌ Cuenta no encontrada.");
        }
    }

    // Permite al cliente realizar una transferencia de dinero entre sus cuentas.
    realizarTransferencia() {
        if (!this.clienteActual) return;

        console.log("\nSeleccione la cuenta de origen:");
        this.mostrarCuentasCliente();
        const numeroCuentaOrigen = prompt.question("Número de cuenta de origen: ");
        const cuentaOrigen = this.clienteActual.cuentas.find(c => c.numero === numeroCuentaOrigen);

        if (cuentaOrigen) {
            console.log("\nSeleccione la cuenta de destino:");
            this.mostrarCuentasCliente();
            const numeroCuentaDestino = prompt.question("Número de cuenta de destino: ");
            const cuentaDestino = this.clienteActual.cuentas.find(c => c.numero === numeroCuentaDestino);

            if (cuentaDestino) {
                if (cuentaOrigen === cuentaDestino) {
                    console.log("❌ La cuenta de origen y destino no pueden ser la misma.");
                    return;
                }

                const montoStr = prompt.question("Ingrese el monto a transferir: ");
                const montoTransferencia = parseInt(montoStr);

                if (isNaN(montoTransferencia) || montoTransferencia <= 0) {
                    console.log("❌ El monto ingresado no es válido.");
                    return;
                }

                if (banco.transferirSaldo(cuentaOrigen, cuentaDestino, montoTransferencia)) {
                    console.log(`✅ Transferencia de $${montoTransferencia} de la cuenta ${numeroCuentaOrigen} a la cuenta ${numeroCuentaDestino} realizada exitosamente.`);
                } else {
                    console.log("❌ No se pudo realizar la transferencia. Verifique los fondos o las cuentas.");
                }
            } else {
                console.log("❌ Cuenta de destino no encontrada.");
            }
        } else {
            console.log("❌ Cuenta de origen no encontrada.");
        }
    }

    // Permite al cliente consultar el saldo de una de sus cuentas.
    consultarSaldoCliente() {
        if (!this.clienteActual) return;

        console.log("\nSeleccione la cuenta para consultar el saldo:");
        this.mostrarCuentasCliente();
        const numeroCuentaConsulta = prompt.question("Número de cuenta: ");
        const saldo = banco.consultarSaldo(numeroCuentaConsulta);

        if (saldo !== undefined) {
            console.log(`💰 El saldo de la cuenta ${numeroCuentaConsulta} es: $${saldo}`);
        } else {
            console.log("❌ Cuenta no encontrada.");
        }
    }

    // Muestra la lista de cuentas vinculadas al cliente actual.
    mostrarCuentasCliente() {
        if (this.clienteActual && this.clienteActual.cuentas.length > 0) {
            this.clienteActual.cuentas.forEach(cuenta => console.log(`- ${cuenta.numero}`));
        } else {
            console.log("No hay cuentas vinculadas a este cliente.");
        }
    }
}

// Panel del Operador
function panelOperador(cajero) {
    while (true) {
        console.log("\nPanel del Operador:");
        console.log("1. Encender cajero");
        console.log("2. Apagar cajero");
        console.log("3. Salir del panel");

        const opcion = prompt.question("Opción: ");

        switch (opcion) {
            case "1":
                cajero.encender(); // Llama al método para encender el cajero.
                break;
            case "2":
                cajero.apagar(); // Llama al método para apagar el cajero.
                break;
            case "3":
                return; // Sale del panel del operador.
            default:
                console.log("Opción inválida.");
        }
    }
}

// Simulación principal
const atm = new CajeroAutomatico();

// Iniciar el panel del operador
panelOperador(atm);

// Si el cajero está encendido después de la configuración del operador, permitir la atención al cliente
if (atm.encendido) {
    atm.atenderCliente(); // Llama al método para iniciar la atención al cliente.
}