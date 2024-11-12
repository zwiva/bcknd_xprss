const removeDiacritics = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const handlerHttpResponse = (status, message, isSuccess, data = null) => {
  return { message, status, isSuccess, data };
}

export {
  removeDiacritics,
  handlerHttpResponse
}