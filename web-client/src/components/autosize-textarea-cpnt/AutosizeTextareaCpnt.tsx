import React, { ChangeEvent, useEffect, useState } from 'react';
import { TextareaHTMLAttributes, useRef } from 'react';

const AutosizeTextareaCpnt = (
  props: TextareaHTMLAttributes<HTMLTextAreaElement>
): JSX.Element => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('');
  const [textareaHeight, setTextareaHeight] = useState('auto');

  useEffect(() => {
    setTextareaHeight(`${textareaRef.current?.scrollHeight}px`);
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaHeight('auto');
    setValue(e.target.value);

    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <textarea
      {...props}
      className="textarea"
      ref={textareaRef}
      rows={1}
      placeholder="Message à envoyer..."
      style={{ height: textareaHeight }}
      onChange={handleChange}
    />
  );
};

export default AutosizeTextareaCpnt;
