import React from 'react';

import { Box, Typography, Button } from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';
import { ButtonOption, Message } from '../../types/chat';

interface Props {
  message: Message;
}

const renderVideo = (url: string) => {
  const embedUrl = url.replace('watch?v=', 'embed/');
  return (
    <iframe
      key={url}
      width="300"
      height="200"
      src={embedUrl}
      title="YouTube video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ margin: '8px 0', borderRadius: 8 }}
    />
  );
};

const ChatMessage: React.FC<Props> = ({ message }) => {
  const renderContent = () => {
    switch (message.type) {
      case 'text':
        return <Typography>{message.content as string}</Typography>;

      case 'images':
        return (message.content as string[]).map((url, i) => (
          <img
            key={url}
            src={url}
            alt={`img-${i}`}
            width="200"
            style={{ margin: 8 }}
          />
        ));

      case 'videos': {
        const content = message.content as string | string[];
        const videoUrls = Array.isArray(content) ? content : [content];
        return videoUrls.map((url) => renderVideo(url));
      }

      case 'buttons':
        if (!Array.isArray(message.content)) return null;

        return (message.content as ButtonOption[]).map(
          (btn: ButtonOption, i: number) => (
            <Button
              key={nanoid()}
              variant="contained"
              style={{ margin: 8, backgroundColor: btn.color }}
            >
              {btn.text}
            </Button>
          ),
        );
      default:
        return null;
    }
  };

  return (
    <Box
      m={1}
      p={1}
      bgcolor={message.role === 'user' ? '#e0f7fa' : '#f1f8e9'}
      borderRadius={2}
    >
      {renderContent()}
    </Box>
  );
};

export default ChatMessage;
