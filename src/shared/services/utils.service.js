const removeDiacritics = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const handlerHttpResponse = (status, data = null, error = 'Error') => {
  const isSuccess = status > 199 && status < 300;
  const message = isSuccess ? 'Ejecutado exitosamente' : error?.message ?? error;
  return { status, isSuccess, message, data };
}

const formatStringDate = (date) => { // receive 2024-11-17T13:27:27.649Z, return 2024-11-17 13:27:27
  if (!date || typeof (date) !== 'string')
    return date;
  const main = date.split('.')?.[0];
  return main.replace('T', ' ');
}

export {
  removeDiacritics,
  handlerHttpResponse,
  formatStringDate
}