import { LineaTicket, ResultadoLineaTicket, ResultadoTotalTicket, TicketFinal, TipoIVA, TotalPorTipoIva, calcularCuantiaPorTipoIva, calcularPrecioConIva, calcularTotalConIva, calcularTotalIva, calcularTotalSinIva, productos } from "./ticketDeCompra.helper"

export const calculaTicket = (lineasTicket: LineaTicket[]): ResultadoLineaTicket[] => {
  if(!lineasTicket) {
    throw "No se han proporcionado datos correctos";
  }
  let resultado: ResultadoLineaTicket[] = [];

  for (let i = 0; i < lineasTicket.length; i++) { 
    let nuevoResultadoLineaTicket = {
      nombre: lineasTicket[i].producto.nombre,
      cantidad: lineasTicket[i].cantidad,
      precioSinIva: lineasTicket[i].producto.precio,
      tipoIva: lineasTicket[i].producto.tipoIva,
      precioConIva: calcularPrecioConIva(
        lineasTicket[i].producto.precio,
        lineasTicket[i].producto.tipoIva
      ),
    }
    resultado.push(nuevoResultadoLineaTicket);
  }
  return resultado
};

export const calcularResultadoTotalTicket = (resultadoLineaTicket: ResultadoLineaTicket[]) : ResultadoTotalTicket => {
  if(!resultadoLineaTicket) {
    throw "No se han proporcionado datos correctos";
  }
  const resultado = {
    totalSinIva: Number(calcularTotalSinIva(resultadoLineaTicket).toFixed(2)),
    totalConIva: Number(calcularTotalConIva(resultadoLineaTicket).toFixed(2)),
    totalIva: Number(calcularTotalIva(resultadoLineaTicket).toFixed(2))
  }

  return resultado;
};

export const calcularTotalTipoIva = (resultadoLineaTicket :ResultadoLineaTicket[], tiposDeIva :TipoIVA[]) : TotalPorTipoIva[] => {
  if(!resultadoLineaTicket || !tiposDeIva) {
    throw "No se han proporcionado datos correctos";
  }
  let resultado : TotalPorTipoIva[] = []

  for(let i = 0; i < tiposDeIva.length; i++) {
    let nuevoObjetoPorTipoIva = {
      tipoIva: tiposDeIva[i],
      cuantia: Number(calcularCuantiaPorTipoIva(tiposDeIva[i], resultadoLineaTicket).toFixed(2))
    }
    
    resultado.push(nuevoObjetoPorTipoIva)
  }
  return resultado
}

export const crearTicketFinal = (resultadoLineaTicket :ResultadoLineaTicket[], tiposDeIva: TipoIVA[]) :TicketFinal => {
  if(!resultadoLineaTicket || !tiposDeIva) {
    throw "No se han proporcionado datos correctos";
  }
  let resultado :TicketFinal = {
    lineas: calculaTicket(productos),
    total: calcularResultadoTotalTicket(resultadoLineaTicket),
    desgloseIva: calcularTotalTipoIva(resultadoLineaTicket, tiposDeIva)
  }

  return resultado
}