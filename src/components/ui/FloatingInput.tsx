'use client'

import { FloatingInputProps } from '@/types/input';
import { useState } from 'react';

const FloatingInput: React.FC<FloatingInputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder = ' ',
  required,
  disabled,
}) => {

  const [showPassword, setShowPassword] = useState(false);


  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  const isPasswordType = type === 'password';
  const inputType = isPasswordType ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="floating-input-wrapper">
      <label htmlFor={inputId} className="floating-label">
        <input
          id={inputId}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className="floating-input"
          autoComplete="new-password"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          data-form-type="other"
        />
        <span className="label-text">{label}</span>
      </label>
      {isPasswordType && (
        <button
          type="button"
          className="password-toggle-btn"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? 'HIDE' : 'SHOW'}
        </button>
      )}
    </div>
  );
};

export default FloatingInput;
                                   