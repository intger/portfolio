import React from 'react';
import { errorStrings } from "../../../../shared/utility";

export const Input = ({ data, changed, invalid, touched }) => {
  let inputElement = null;

  const fieldName = data.id;
  const {type, required, placeholder, value, options} = data.fieldData;

  switch (type) {
    // Add more cases for other type of elements ( checkbox, etc)
    case "text":
        inputElement = (
            <input
            className=""
            id={fieldName}
            name={fieldName}
            type={type}
            onBlur={changed}
            placeholder={placeholder}
            required={required}
            />
        );
        break;
    case "email":
        inputElement = (
            <input
            className=""
            id={fieldName}
            name={fieldName}
            type={type}
            onBlur={changed}
            placeholder={placeholder}
            required={required}
            />
    );
        break;
    case "textarea":
        inputElement = (
            <textarea
            className=""
            id={fieldName}
            name={fieldName}
            onBlur={changed}
            placeholder={placeholder}
            required={required}
            />
        );
        break;
    case "select":
        inputElement = (
            <select name={fieldName} onBlur={changed} required={required}>
                <option hidden defaultValue value={value}>{placeholder}</option>
                {options.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                ))}
            </select>
        );
        break;
    default:
      inputElement = (
        <input
        className=""
        id={fieldName}
        name={fieldName}
        type={type}
        onBlur={changed}
        placeholder={placeholder}
        required={required}
        />
      );
  }

  const dynamicClass = type === 'textarea' ? 'col-xs-12 col-sm-12 form-el' : 'col-xs-12 col-sm-6 form-el';
  
  return (
    // needs dynamic class for fields
    <div className={`${dynamicClass} ${touched && invalid ? 'invalid' : ''}`}>
      {inputElement}
      {touched && invalid ? <span>{errorStrings(type)}</span> : null}
    </div>
  );
};