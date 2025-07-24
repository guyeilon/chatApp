export type MessageType = 'text' | 'images' | 'videos' | 'buttons';

export type Role = 'user' | 'bot';

export interface ButtonOption {
  text: string;
  color?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'bot';
  type: 'text' | 'streaming' | 'images' | 'videos' | 'buttons';
  content: string | string[] | ButtonOption[];
}

export interface ButtonContent {
  text: string;
  color?: string;
}
