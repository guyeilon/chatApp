import { Message, MessageType } from '../types/chat';

const normalizeResponses = (rawResponses: any[]): Message[] =>
  rawResponses.map((r, idx) => {
    // אם יש type אז השתמש בו
    if (r.type) {
      return {
        id: `${Date.now()}-${idx}`,
        role: 'bot',
        type: r.type,
        content: r.content,
      };
    }

    // אם אין type אבל זה אובייקט עם text => כפתור בודד
    if (typeof r === 'object' && typeof r.text === 'string') {
      return {
        id: `${Date.now()}-${idx}`,
        role: 'bot',
        type: 'buttons',
        content: [r], // עטוף כפתור יחיד בתוך מערך
      };
    }

    // ברירת מחדל
    return {
      id: `${Date.now()}-${idx}`,
      role: 'bot',
      type: 'text',
      content: r,
    };
  });

export default normalizeResponses;
