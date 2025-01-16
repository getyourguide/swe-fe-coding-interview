const F = window.fetch;

export const fetchWrapper: typeof window.fetch = async (...args: Parameters<typeof fetch>): Promise<Response> => {
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));

  const dieRoll = Math.random();
  const res = await F(...args);

  if (dieRoll > 0.1) {
    return res;
  }

  const mockResponse: Response = {
    ...res,
    type: "error",
    ok: false,
  };


  if (dieRoll > 0.07) {
    return {
      ...mockResponse,
      status: 500,
      statusText: "500 Internal Server Error",
    }
  }

  if (dieRoll > 0.04) {
    return {
      ...mockResponse,
      status: 403,
      statusText: "403 Forbidden",
    }
  }

  return {
    ...mockResponse,
    status: 404,
    statusText: "404 Not Found"
  }
};

window.fetch = fetchWrapper;