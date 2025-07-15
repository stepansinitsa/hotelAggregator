// frontend/src/helpers/auth-storage.helpers.ts

export function getToken(): string | null {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(token) : null;
}

export function setToken(token: string): void {
  localStorage.setItem("token", JSON.stringify(token));
}

export function removeToken(): void {
  localStorage.removeItem("token");
}