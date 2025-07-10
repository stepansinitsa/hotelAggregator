export function getAuthToken(): string | null {
  const token = localStorage.getItem("authToken");
  return token ? JSON.parse(token) : null;
}

export function setAuthToken(token: string): void {
  localStorage.setItem("authToken", JSON.stringify(token));
}

export function removeAuthToken(): void {
  localStorage.removeItem("authToken");
}