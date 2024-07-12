"use client";

import { io } from "socket.io-client";

export const socket = io(`${process.env.NEXT_PUBLIC_CHAT_SOCKET_URL}`, {
  autoConnect: true,
  reconnection: true,
});
