import React, { ChangeEvent, useEffect, useState } from 'react';
import { TextareaHTMLAttributes, useRef } from 'react';

const AutosizeTextareaCpnt = ({
  value,
  onChange,
}: TextareaHTMLAttributes<HTMLTextAreaElement>): JSX.Element => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaHeight, setTextareaHeight] = useState('auto');

  useEffect(() => {
    setTextareaHeight(`${textareaRef.current?.scrollHeight}px`);
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaHeight('auto');

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <textarea
      className="textarea"
      ref={textareaRef}
      rows={1}
      placeholder="Message à envoyer..."
      style={{ height: textareaHeight }}
      defaultValue={value}
      value={value}
      onChange={handleChange}
    />
  );
};

export default AutosizeTextareaCpnt;
