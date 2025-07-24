import { Message } from '../types/chat';

export interface ChatServiceHandlers {
  onMessage: (message: Message) => void;
  onError?: (err: Error) => void;
}

export const createChatService = () => {
  let socket: WebSocket | null = null;
  let token: string | null = null;
  let streamBuffer = '';
  let streamMessageId: string | null = null;
  let handlers: ChatServiceHandlers | null = null;

  const connect = (opts: ChatServiceHandlers) => {
    handlers = opts;
    socket = new WebSocket('ws://159.89.16.15:65432');

    socket.onopen = () => {
      console.log('[WS] Connected');
      sendRaw({ command: 'init' });
      socket?.send(JSON.stringify({ command: 'init' }));
    };

    socket.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        console.log('[WS] Message:', data);

        if (data.status === 'ok' && data.token) {
          token = data.token;
        } else if (data.status === 'ok' && data.type) {
          handleTypedMessage(data);
        } else if (data.status === 'streaming') {
          handleStreaming(data);
        } else if (data.status === 'end') {
          finalizeStream();
        } else if (data.status === 'error') {
          handlers?.onError?.(new Error(data.message));
        }
      } catch {
        handlers?.onError?.(new Error('Failed to parse server message'));
      }
    };

    socket.onerror = () => {
      handlers?.onError?.(new Error('WebSocket error'));
    };

    socket.onclose = () => {
      console.warn('[ChatService] WebSocket closed');
    };
  };

  const sendMessage = (text: string) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;
    sendRaw({ command: 'chat', message: text });
  };

  const disconnect = () => {
    socket?.close();
    socket = null;
    token = null;
    streamBuffer = '';
    streamMessageId = null;
  };

  const sendRaw = (payload: any) => {
    socket?.send(JSON.stringify(payload));
  };

  const handleTypedMessage = (data: any) => {
    const message: Message = {
      id: `${Date.now()}-${Math.random()}`,
      role: 'bot',
      type: data.type,
      content: data.content,
    };
    handlers?.onMessage(message);
  };

  const handleStreaming = (data: any) => {
    if (!streamMessageId) {
      streamMessageId = `${Date.now()}-${Math.random()}`;
      streamBuffer = '';
    }
    streamBuffer += data.content;
    const message: Message = {
      id: streamMessageId,
      role: 'bot',
      type: 'text',
      content: streamBuffer,
      partial: true,
    };
    handlers?.onMessage(message);
  };

  const finalizeStream = () => {
    streamBuffer = '';
    streamMessageId = null;
  };

  return {
    connect,
    sendMessage,
    disconnect,
  };
};
