export type TipoIVA =
  | "general"
  | "reducido"
  | "superreducidoA"
  | "superreducidoB"
  | "superreducidoC"
  | "sinIva";

  export interface Producto {
  nombre: string;
  precio: number;
  tipoIva: TipoIVA;
}

export const tiposDeIva :TipoIVA[] = ["general", "reducido", "sinIva", "superreducidoA", "superreducidoB", "superreducidoC"]

export interface LineaTicket {
    producto: Producto;
    cantidad: number;
  }

  export interface ResultadoLineaTicket {
    nombre: string;
    cantidad: number;
    precioSinIva: number;
    tipoIva: TipoIVA;
    precioConIva: number;
  }

  export const productos: LineaTicket[] = [
    {
      producto: {
        nombre: "Legumbres",
        precio: 2,
        tipoIva: "general",
      },
      cantidad: 2,
    },
    {
      producto: {
        nombre: "Perfume",
        precio: 20,
        tipoIva: "general",
      },
      cantidad: 3,
    },
    {
      producto: {
        nombre: "Leche",
        precio: 1,
        tipoIva: "superreducidoC",
      },
      cantidad: 6,
    },
    {
      producto: {
        nombre: "Lasaña",
        precio: 5,
        tipoIva: "superreducidoA",
      },
      cantidad: 1,
    },
  ];

  export interface ResultadoTotalTicket {
    totalSinIva: number;
    totalConIva: number;
    totalIva: number;
  }
  
  export interface TotalPorTipoIva {
    tipoIva: TipoIVA;
    cuantia : number;
  }
  
  export interface TicketFinal {
    lineas: ResultadoLineaTicket[];
    total: ResultadoTotalTicket;
    desgloseIva: TotalPorTipoIva[];
  }

  export const calcularPrecioConIva = (precioSinIva: number, tipoIva: TipoIVA) => {
    if(tipoIva === "general") {
      return precioSinIva+precioSinIva*21/100
    }
    if(tipoIva === "reducido") {
      return precioSinIva+precioSinIva*10/100
    }
    if(tipoIva === "superreducidoA") {
      return precioSinIva+precioSinIva*5/100
    }
    if(tipoIva === "superreducidoB") {
      return precioSinIva+precioSinIva*4/100
    } else /* Casos sinIva y superreducidoC*/{
      return precioSinIva
    }
  }

  export const calcularTotalSinIva = (resultadoLineaTicket: ResultadoLineaTicket[]) => {
    return resultadoLineaTicket.reduce((acc, lineaTicket) => acc + lineaTicket.precioSinIva, 0)
  }

  export const calcularTotalConIva = (resultadoLineaTicket: ResultadoLineaTicket[]) => {
    return resultadoLineaTicket.reduce((acc, lineaTicket) => acc + lineaTicket.precioConIva, 0)
  }

  export const calcularTotalIva = (resultadoLineaTicket: ResultadoLineaTicket[]): number => {
    const totalSinIva :number = Number(calcularTotalSinIva(resultadoLineaTicket).toFixed(2))
    const totalConIva :number = Number(calcularTotalConIva(resultadoLineaTicket).toFixed(2))

    return totalConIva - totalSinIva
  }

  export const calcularCuantiaPorTipoIva = (tipoIva :TipoIVA, resultadoLineaTicket : ResultadoLineaTicket[]) :number => {
    let totalDeCuantia: number = 0
    for(let i = 0; i < resultadoLineaTicket.length; i++) {
      if(resultadoLineaTicket[i].tipoIva === tipoIva) {
        totalDeCuantia = totalDeCuantia+resultadoLineaTicket[i].precioConIva
      }
    }

    return totalDeCuantia
  }