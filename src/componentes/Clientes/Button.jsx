import { registerLocale } from 'react-datepicker';
import styled from 'styled-components';

import IconPlus from '../../assets/icon-plus.svg';

const colorButton = (mode) =>{
  if (mode == "delete"){
    return "#F24337"
  }
  else {
    return "#7C5DFA"
  }
}

const HovercolorButton = (mode) =>{
  if (mode == "delete"){
    return "rgba(242, 67, 55, 0.69)"
  }
  else {
    return "rgba(124, 93, 250, 0.69)"
  }
}

const TextButton = styled.button`
  display: inline-block;
  font-family: Spartan, sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: -0.25px;
  line-height: 1;
  border-radius: 6.25rem;
  border: none;
  cursor: pointer;
  user-select: none;
  color: white;
  background-color: ${({ mode }) => colorButton(mode)};
  &:hover {
    background-color: ${({ mode }) => HovercolorButton(mode)};
    color: white;
  }
  padding: 1rem 1.125rem;
`;

const IconButton = styled.button`
  display: inline-block;
  font-family: Spartan, sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: -0.25px;
  line-height: 1;
  border-radius: 6.25rem;
  border: none;
  cursor: pointer;
  user-select: none;
  color: white;
  background-color: blue;
  &:hover {
    background-color: green;
    color: white;
  }
  position: relative;
  padding: 1rem 1rem 1rem 3.5rem;
`;

const IconWrapper = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  background-color: #ffffff;
  border-radius: 50%;
`;

function Button({
  children,
  className,
  icon,
  onClick,
  type = 'button',
  variant = 'primary',
  mode,
  ...rest
}) {
  return icon ? (
    <IconButton className={className} onClick={onClick} type={type} variant={variant} {...rest}>
      <IconWrapper>
        <img src={IconPlus} alt="" />
      </IconWrapper>
      {children}
    </IconButton>
  ) : (
    <TextButton className={className} onClick={onClick} type={type} variant={variant} mode={mode} {...rest}>
      {children}
    </TextButton>
  );
}

export default Button;
