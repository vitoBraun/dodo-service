import { Order } from "./models";
import { pick } from "./util";

type UserTypes = "admin" | "manager" | "engineer" | "operator";

export type UserInfo = {
  email: string;
  type: UserTypes;
};

export type UserInfoExtended = {
  isAuthenticated: boolean;
  userInfo?: UserInfo;
};

export function checkStatus() {
  return makeRequest<UserInfoExtended>("/check");
}

export const statusTexts: Record<number, string | undefined> = {
  400: "Некорректные данные",
  401: "Вы не авторизованы",
  403: "Отказано в доступе",
  404: "Не найдено",
  500: "Ошибка сервера",
};

export class ApiError extends Error {
  code: string;

  constructor(status: number, message?: string) {
    const msg = message ?? statusTexts[status] ?? "Неизвестная ошибка";
    super(msg);
    this.code = status.toString();
    this.name = this.constructor.name;
  }
}
type GenericResponse = { message: string };
export interface User {
  id: string;
  email: string;
  type: UserTypes;
}
async function makeRequest<T = GenericResponse>(
  url: string,
  opts?: RequestInit
): Promise<T> {
  const resp = await fetch(window.location.origin + url, {
    credentials: "include",
    ...opts,
  });
  if (resp.ok) {
    return resp.json();
  } else {
    const message = await resp.text();
    throw new ApiError(resp.status, message);
  }
}

export function uploadFileGetUrl(file: any) {
  let fileFormData = new FormData();
  fileFormData.append("file", file);
  return makeRequest<{ url: string }>("/api/upload", {
    method: "POST",
    body: fileFormData,
  });
}

export function login(username: string, password: string) {
  const credentialParams = Object.entries({ username, password })
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
  return makeRequest<UserInfo>("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: credentialParams,
  });
}

export function register(userData: { email: string; password: string }) {
  const credentialParams = Object.entries({
    username: userData.email,
    password: userData.password,
  })
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  return makeRequest<UserInfo>("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: credentialParams,
  });
}

export function logout() {
  return makeRequest("/logout");
}

export function isNotAuthorized(err: any) {
  return (
    typeof err === "object" && err.name === ApiError.name && err.code === "401"
  );
}

export function getUsers() {
  return makeRequest<User[]>(`/api/users`);
}

export function getUser(id: string) {
  return makeRequest<User>(`/api/users/${id}`);
}

export function createUser(userData: {
  email: string;
  password: string;
  type: string;
}) {
  return makeRequest<User>(`/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
}

export function updateUser(userData: { id: string; type?: string }) {
  return makeRequest<User>(`/api/users/${userData.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pick(userData, "type")),
  });
}

export function deleteUser(id: string) {
  return makeRequest<User>(`/api/users/${id}`, { method: "DELETE" });
}

export async function convertFileToUrl(file: any) {
  let result = await uploadFileGetUrl(file);
  return result.url;
}

export async function addOrder({
  branch,
  manager,
  faultIndex,
  description,
  files,
}: {
  branch: string;
  manager: string;
  faultIndex: number;
  description: string;
  files: string[];
}) {
  return makeRequest<{ id: string }>("/api/orders", {
    method: "POST",
    body: JSON.stringify({
      branch,
      manager,
      faultIndex,
      description,
      files,
    }),
    headers: { "Content-Type": "application/json" },
  });
}

export async function getOrders() {
  const url = `/api/orders`;
  return makeRequest<{ orders: Order[] }>(url);
}

export async function updateOrder(data: any) {
  const url = `/api/orders/${data.id}`;
  return makeRequest<{ order: Order }>(url, {
    method: "put",
    body: JSON.stringify({
      ...data,
    }),
    headers: { "Content-Type": "application/json" },
  });
}
