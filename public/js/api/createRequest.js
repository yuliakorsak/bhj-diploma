/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const data = options.method === 'GET' ? null : formData(options.data);
  const url = options.method === 'GET' ? `${options.url}?${new URLSearchParams(options.data).toString()}` : options.url;

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.onload = () => {
    options.callback(null, xhr.response);
  }
  try {
    xhr.open(options.method, url);
    xhr.send(data);
  } catch (e) {
    options.callback(e, null);
  }
};

function formData(object) {
  if (!object) {
    return null;
  }
  const data = new FormData();
  Object.keys(object).forEach(key => {
    data.append(key, object[key]);
  });
  return data;
}
