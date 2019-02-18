const fetchData = async (arg, method, headers, body) => {
  const url = `http://4ba87e19.ngrok.io/${arg}`;
  // const url = `http://localhost:3000/${arg}`;
  return await fetch(url, {
    method: method,
    headers: headers,
    body: body
  })
    .then(res => res.json())
    .then(data => data)
    .catch(err => err);
};

export default fetchData;
