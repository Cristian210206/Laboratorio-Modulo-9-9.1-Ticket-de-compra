import { calculaTicket, calcularResultadoTotalTicket, calcularTotalTipoIva, crearTicketFinal } from "./ticketDeCompra"
import { TipoIVA, calcularPrecioConIva, LineaTicket, ResultadoLineaTicket, productos, calcularTotalSinIva, calcularTotalIva, calcularTotalConIva, ResultadoTotalTicket, calcularCuantiaPorTipoIva, TotalPorTipoIva, TicketFinal, tiposDeIva } from "./ticketDeCompra.helper"

describe("comprobarCalcularPrecioIva", () => {
    it("Deberia devolver 2.42 si el tipoIva es general y el precio es 2", () => {
        //Arrange
        const tipoIva:TipoIVA = "general"
        const precio:number = 2
        const resultadoEsperado = 2.42
        //Act
        const resultado = calcularPrecioConIva(precio, tipoIva)
        //Assert
        expect(resultado).toBe(resultadoEsperado)
    });

    it("Deberia devolver 5,25 si el tipoIva es superreducidoA y el precio es 5", () => {
        //Arrange
        const tipoIva:TipoIVA = "superreducidoA"
        const precio:number = 5
        const resultadoEsperado = 5.25
        //Act
        const resultado = calcularPrecioConIva(precio, tipoIva)
        //Assert
        expect(resultado).toBe(resultadoEsperado)
    })
})


describe("comprobarCalcularTicket", () => {
    it("Deberia devolver un thow si los datos proporcionados son nulos o undefined", () => {
        //Arrange
        const lineaTicket:any = undefined
        //Act
        const resultado = () => calculaTicket(lineaTicket)
        //Assert
        expect(resultado).toThrowError("No se han proporcionado datos correctos")
    });
    it("Deberia devolver el tipoIva, el precioSinIva, el nombre, la cantidad y el precioIva correcto", () => {
        //Arrange
        const productos :LineaTicket[] = [
            {
                producto: {
                    nombre: "Legumbres",
                    precio: 2,
                    tipoIva: "general",
                  },
                  cantidad: 2
            }
        ]
        const resultadoEsperado :ResultadoLineaTicket[] = [{
            nombre: "Legumbres",
            cantidad: 2,
            precioSinIva: 2,
            tipoIva: "general",
            precioConIva: 2.42
        }]
        //Act
        const resultado :ResultadoLineaTicket[] = calculaTicket(productos)
        //Assert
        expect(resultado).toEqual(resultadoEsperado)
    });

    it("Deberia devolver el tipoIva, el precioSinIva, el nombre, la cantidad y el precioIva correcto", () => {
        //Arrange
        const productos :LineaTicket[] = [
            {
                producto: {
                    nombre: "Leche",
                    precio: 1,
                    tipoIva: "superreducidoC",
                  },
                  cantidad: 6
            }
        ]
        const resultadoEsperado :ResultadoLineaTicket[] = [{
            nombre: "Leche",
            cantidad: 6,
            precioSinIva: 1,
            tipoIva: "superreducidoC",
            precioConIva: 1
        }]
        //Act
        const resultado :ResultadoLineaTicket[] = calculaTicket(productos)
        //Assert
        expect(resultado).toEqual(resultadoEsperado)
    })
})

describe("comprobarCalcularTotales", () => {
    it("Deberia devolver 28 ya que es el precio total sin IVA", () => {
        // Arrange
        const resultadoLineaTicket = calculaTicket(productos)
        const resultadoEsperado = 28
        //Act
        const resultado = calcularTotalSinIva(resultadoLineaTicket)
        //Assert
        expect(resultado).toBe(resultadoEsperado)
    })

    it("Deberia devolver 32,87 ya que es el precio total con IVA", () => {
        // Arrange
        const resultadoLineaTicket = calculaTicket(productos)
        const resultadoEsperado = 32.87
        //Act
        const resultado = calcularTotalConIva(resultadoLineaTicket)
        //Assert
        expect(resultado).toBe(resultadoEsperado)
    })

    it("Deberia devolver 4,87 ya que es el precio total del IVA", () => {
        // Arrange
        const resultadoLineaTicket = calculaTicket(productos)
        const resultadoEsperado:number = 4.87
        //Act
        const resultado:number = Number(calcularTotalIva(resultadoLineaTicket).toFixed(2))
        //Assert
        expect(resultado).toEqual(resultadoEsperado)
    })
})

describe("comprobarCalcularResultadoTotalTickets", () => {
    it("Deberia devolver un thow si los datos proporcionados son nulos o undefined", () => {
        //Arrange
        const resultadoLineaTicket:any = undefined
        //Act
        const resultado = () => calcularResultadoTotalTicket(resultadoLineaTicket)
        //Assert
        expect(resultado).toThrowError("No se han proporcionado datos correctos")
    });
    it("Deberia devolver 28 como total sin Iva, 32,87 como total con Iva y 4,87 como total de Iva",() => {
        // Arrange
        const resultadoLineaTicket = calculaTicket(productos)
        const resultadoEsperado: ResultadoTotalTicket = {
            totalSinIva: 28,
            totalConIva: 32.87,
            totalIva: 4.87
        }
        //Act
        const resultado: ResultadoTotalTicket = calcularResultadoTotalTicket(resultadoLineaTicket)
        //Assert
        expect(resultado).toEqual(resultadoEsperado)
    })
})

describe("comprobarCalcularCuantiaPorTipoIva", () => {
    it("Deberia darme 26,62 ya que es el total de cuantia por tipo iva general", () => {
        //Arrange
        const tipoIva: TipoIVA = "general"
        const resultadoLineaTicket: ResultadoLineaTicket[] = calculaTicket(productos)
        const resultadoEsperado: number = 26.62 
        //Act
        const resultado: number = Number(calcularCuantiaPorTipoIva(tipoIva, resultadoLineaTicket).toFixed(2))
        //Assert
        expect(resultado).toBe(resultadoEsperado)
    })

    it("Deberia darme 1 ya que es el total de cuantia por tipo iva superreducidoC", () => {
        //Arrange
        const tipoIva: TipoIVA = "superreducidoC"
        const resultadoLineaTicket: ResultadoLineaTicket[] = calculaTicket(productos)
        const resultadoEsperado: number = 1
        //Act
        const resultado: number = Number(calcularCuantiaPorTipoIva(tipoIva, resultadoLineaTicket).toFixed(2))
        //Assert
        expect(resultado).toBe(resultadoEsperado)
    })
})

describe("comprobarCalcularTotalPorIva", () => {
    it("Deberia devolver un thow si los datos proporcionados son nulos o undefined", () => {
        //Arrange
        const tiposDeIva : any = undefined
        const resultadoLineaTicket:any = undefined
        //Act
        const resultado = () => calcularTotalTipoIva(resultadoLineaTicket, tiposDeIva)
        //Assert
        expect(resultado).toThrowError("No se han proporcionado datos correctos")
    });
    it("Deberia devolver la cuantia correspondiente a cada tipo de iva", () => {
        //Arrange
        const tiposDeIva: TipoIVA[] = ["general", "reducido", "superreducidoA"]
        const resultadoLineaTicket: ResultadoLineaTicket[] = calculaTicket(productos)
        const resultadoEsperado :TotalPorTipoIva[] = [
            {
                tipoIva: "general",
                cuantia: 26.62
            },
            {
                tipoIva: "reducido",
                cuantia: 0
            },
            {
                tipoIva: "superreducidoA",
                cuantia: 5.25
            }
        ]
        //Act
        const resultado: TotalPorTipoIva[] = calcularTotalTipoIva(resultadoLineaTicket, tiposDeIva)
        //Assert
        expect(resultado).toEqual(resultadoEsperado)
    })
})

describe("comprobarCalcularTicketFinal", () => {
    it("Deberia devolver un thow si los datos proporcionados son nulos o undefined", () => {
        //Arrange
        const tiposDeIva:any = undefined
        const resultadoLineaTicket:any = undefined
        //Act
        const resultado = () => crearTicketFinal(resultadoLineaTicket, tiposDeIva)
        //Assert
        expect(resultado).toThrowError("No se han proporcionado datos correctos")
    });
    it("Deberia darnos los datos correspondientes a los productos, precios y tipos", () => {
        //Arrange
        const resultadoLineaTicket: ResultadoLineaTicket[] = calculaTicket(productos)
        const resultadoEsperado:TicketFinal = {
            lineas: resultadoLineaTicket,
            total: calcularResultadoTotalTicket(resultadoLineaTicket),
            desgloseIva: calcularTotalTipoIva(resultadoLineaTicket, tiposDeIva)
        }
        //Act
        const resultado: TicketFinal = crearTicketFinal(resultadoLineaTicket, tiposDeIva)
        //Assert
        expect(resultado).toEqual(resultadoEsperado)
    })
})