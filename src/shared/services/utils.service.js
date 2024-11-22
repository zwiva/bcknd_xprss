const handlerHttpResponse = (status, data = null, error = 'Error desconocido.') => { // Modelo de respuesta de la API
  const isSuccess = status > 199 && status < 300;
  const message = isSuccess ? 'Ejecutado exitosamente.' : error?.message || error;
  return { status, isSuccess, message, data };
}

const removeDiacritics = (str) => { // recibe: árbol, retorna: cancion
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const formatStringDate = (date) => { // recibe: 2024-11-17T13:27:27.649Z, retorna: 2024-11-17 13:27:27
  if (!date || typeof (date) !== 'string')
    return date;
  const main = date.split('.')?.[0];
  return main.replace('T', ' ');
}

const formatRut = (rut) => { // recibe: 123456789, retorna: 12345678-9
  if (typeof (rut) !== 'string' || !rut)
    return rut;
  return `${rut.slice(0, -1)}-${rut[rut.length - 1]}`;
}

const isPaidSubscription = (user) => {
  if (!user) {
    return false;
  }
  return user.id_role === 3 ? false : true;
}

export {
  handlerHttpResponse,
  removeDiacritics,
  formatStringDate,
  formatRut,
  isPaidSubscription
}