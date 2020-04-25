export const fetchJSON = async ({ url, method, payload }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = window.localStorage.getItem('jwt');

  const headers = new Headers();

  headers.append('Content-Type', 'application/json');

  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }

  const baseUrl = `${apiUrl}/${url}${url.includes('?') ? '&' : '?'}`;

  const res = await fetch(
    baseUrl,
    {
      method,
      headers,
      body: JSON.stringify(payload),
    },
  );

  return res.json();
};

export default fetchJSON;
