import React from 'react';

export interface HighlightTextProps {
  text: string;
  query?: string;
  className?: string;
  highlightClassName?: string;
}

export const HighlightText: React.FC<HighlightTextProps> = ({
  text,
  query,
  className,
  highlightClassName = 'bg-blue-100 text-smartdoc-blue-dark font-semibold rounded-sm px-0.5',
}) => {
  if (!query || !query.trim() || !text) {
    return <span className={className}>{text}</span>;
  }

  const trimmedQuery = query.trim();
  // Escape regex special characters
  const escapedQuery = trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index} className={highlightClassName}>
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
};
