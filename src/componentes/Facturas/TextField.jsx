import { useField } from 'formik';
import styled from 'styled-components';

const InputLabel = styled.label`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  font-family: Spartan, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ error }) =>
    error ? "#EC5757" : "#7e88c3"};
  line-height: 1;
  margin-bottom: 0.625rem;
  span {
    font-size: 0.625rem;
    margin-left: auto;
  }
`;

const TextInput = styled.input`
  width: 100%;
  height: 3rem;
  border-width: 1px;
  border-style: solid;
  background-color: #FFFFFF;
  border-color: ${({ error }) =>
    error ? "#EC5757" : "#DFE3FA"};
  border-radius: 0.25rem;
  padding: 0.9375rem 1.25rem;
  font-family: Spartan, sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: #0C0E16;
  letter-spacing: -0.25px;
  &:focus {
    outline: none;
    border-color: ${({ error }) =>
    error ? "#EC5757" : "#9277ff"};
  }
  &:placeholder {
    color: rgba(12, 14, 22, 0.4);
  }
  &:disabled {
    background-color: #f0f0f0;
  }
`;

function TextField({ label, type = 'text', ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <InputLabel htmlFor={props.id} error={meta.touched && meta.error ? meta.error : ''}>
        {label}
        {meta.touched && meta.error ? <span>{meta.error}</span> : null}
      </InputLabel>
      <TextInput
        type={type}
        {...field}
        {...props}
        error={meta.touched && meta.error ? meta.error : ''}
      />
    </>
  );
}

export default TextField;
