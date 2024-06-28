function FormatDate(fechaString) {
  const fecha = new Date(fechaString);
  const diaSemana = fecha.getDay();
  const diaMes = fecha.getDate();
  const mes = fecha.getMonth();
  const hora = fecha.getHours();
  const minutos = fecha.getMinutes();

  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const nombreDia = diasSemana[diaSemana];
  const nombreMes = meses[mes];

  const fechaFormateada = `${nombreDia} ${diaMes} de ${nombreMes} - ${hora}:${minutos == 0 ? "00" : minutos}hs`;
  return fechaFormateada;
}

export default FormatDate;
