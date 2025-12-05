//WebSocket 관련 공통 기능

let socket = null;

export function connectWebSocket(classId) {
  socket = new WebSocket(`ws://localhost:8080/ws/${classId}`);
  return socket;
}

export function sendMessage(msg) {
  socket?.send(JSON.stringify(msg));
}

export function closeSocket() {
  socket?.close();
}
