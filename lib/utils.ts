import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function excludeFields(entity: any, keys: string[]) {
  const clone = { ...entity };

  keys.forEach((key) => {
    if (clone[key]) {
      delete clone[key];
    }
  });

  return clone;
}

export async function fetcher(...args: any) {
  return fetch(args).then((res) => res.json());
}

export const FIELDS: { [key: string]: string } = {
  name: "Nombre",
  surname: "Apellidos",
  email: "Correo electrónico",
  username: "Usuario",
  phone: "Teléfono",
  password: "Contraseña",
  role: "Rol",
  actions: "Acciones",
};

export function calculateTimeAgo(time: number) {
  const dateFromAPI: Date = new Date(time * 1000);

  const now: Date = new Date();

  const differenceInMs: number = now.getTime() - dateFromAPI.getTime();

  const differenceInSeconds: number = Math.floor(differenceInMs / 1000);
  const differenceInMinutes: number = Math.floor(differenceInSeconds / 60);
  const differenceInHours: number = Math.floor(differenceInMinutes / 60);

  let timeAgoText: string;

  if (differenceInSeconds < 60) {
    timeAgoText = `hace ${differenceInSeconds} segundos`;
  } else if (differenceInMinutes < 60) {
    timeAgoText = `hace ${differenceInMinutes} minutos`;
  } else {
    timeAgoText = `hace ${differenceInHours} horas`;
  }

  return timeAgoText;
}
