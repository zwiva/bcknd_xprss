const removeDiacritics = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const handlerHttpResponse = (status, data = null, error = 'Error') => {
  const isSuccess = status > 199 && status < 300;
  const message = isSuccess ? 'Ejecutado exitosamente' : typeof (error) === 'object' ? error?.message : 'Error';
  return { status, isSuccess, message, data };
}

export {
  removeDiacritics,
  handlerHttpResponse
}