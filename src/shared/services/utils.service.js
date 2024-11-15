const removeDiacritics = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const handlerHttpResponse = (status, errorObjectOrMessage, data = null) => {
  const isSuccess = status > 199 && status < 300;
  const message = isSuccess ? 'Ejecutado exitosamente' : typeof (errorObjectOrMessage) === 'object' ? errorObjectOrMessage?.message : 'Error';
  return { status, isSuccess, message, data };
}

export {
  removeDiacritics,
  handlerHttpResponse
}