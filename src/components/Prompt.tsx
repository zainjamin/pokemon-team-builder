import React, { FC, useState } from 'react';

interface PromptProps {
  title?: string;
  helpText?: string;
  onSubmit: (input: string) => void;
  onCancel: () => void;
}
export const Prompt: FC<PromptProps> = (props) => {
  const { title, helpText, onSubmit, onCancel } = props;
  const [value, setValue] = useState('');
  return (
    <div className="w-full h-full bg-black bg-opacity-40 flex items-center justify-center absolute">
      <div className="w-2/5 h-2/5 bg-white flex flex-col items-center justify-center">
        <form
          onSubmit={(evt) => {
            evt.preventDefault();
            onSubmit(value);
          }}
          className="flex flex-col items-center justify-center gap-4"
        >
          {title && <label className="text-light-text-color text-2xl font-bold" htmlFor="text">{title}</label>}
          <input
            id="text"
            type="text"
            autoComplete='off'
            onChange={(event) => setValue(event.target.value)}
            className="border-2 border-light-text-color rounded-full p-2"
            placeholder={helpText && helpText}
          />
          <div>
            <button className="bg-light-accent-color rounded-full px-4 mr-2" type="submit">Submit</button>
            <button className="bg-light-accent-color rounded-full px-4" type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
