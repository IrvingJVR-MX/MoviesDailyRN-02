
export function request<TResponse>(
    url: string,
  ): Promise<TResponse> {
    return fetch(url).then((response) => response.json()).then((data) => data.results as TResponse);
}

export function requestData<TResponse>(
  url: string,
): Promise<TResponse> {
  return fetch(url).then((response) => response.json()).then((data) => data as TResponse);
}