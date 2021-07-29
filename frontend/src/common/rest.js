const fetchDataGET = async (URL) => {
  const response = await fetch(URL, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

const fetchDataPOST = async (URL, body = {}) => {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

const fetchDataPUT = async (URL, body = {}) => {
  const response = await fetch(URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

const fetchDataDELETE = async (URL, body = {}) => {
  const response = await fetch(URL, {
    method: "DELETE",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  return data;
};

const rest = {
  get: fetchDataGET,
  post: fetchDataPOST,
  put: fetchDataPUT,
  delete: fetchDataDELETE,
};
export default rest;
