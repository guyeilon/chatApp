import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, LinearProgress, Typography } from '@mui/material';
import styled from 'styled-components';
import normalizeResponses from '../../../utils/response.utils';
import ChatMessage from '../../../components/ChatMessage/ChatMessage';
import InputBox from '../../../components/InputBox/InputBox';
import { Message } from '../../../types/chat';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      type: 'text',
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const normalized = normalizeResponses(data.responses);
      setMessages((prev) => [...prev, ...normalized]);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <ChatWrapper>
      <Typography variant="h6">AI Chat</Typography>

      <MessagesArea>
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </MessagesArea>
      {isLoading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}

      <InputContainer>
        <InputBox value={input} onChange={setInput} onSend={handleSend} />
      </InputContainer>
    </ChatWrapper>
  );
};

export default Chat;

const ChatWrapper = styled(Container)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 16px;
`;

const MessagesArea = styled(Box)`
  flex: 1;
  overflow-y: auto;
`;

const InputContainer = styled(Box)`
  padding: 8px 16px;
  background-color: #fff;
`;
