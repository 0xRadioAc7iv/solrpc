export async function handleRequest(endpoint: string, body: object) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const jsonResponse = await response.json();
  return jsonResponse;
}
