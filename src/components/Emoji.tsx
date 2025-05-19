
import React from 'react';

type EmojiProps = {
  symbol: string;
  label?: string;
};

export const Emoji: React.FC<EmojiProps> = ({ symbol, label }) => (
  <span
    className="emoji"
    role="img"
    aria-label={label || ""}
    aria-hidden={!label}
  >
    {symbol}
  </span>
);
