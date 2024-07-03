import styled, { createGlobalStyle } from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import IconCalendar from '../../assets/icon-calendar.svg';
import IconArrowLeft from '../../assets/icon-arrow-left.svg';
import IconArrowRight from '../../assets/icon-arrow-right.svg';

const DatePickerStyling = createGlobalStyle`
  .react-datepicker {
      font-family:Spartan, sans-serif;
      font-weight:700;
      font-size:0.75rem;
      letter-spacing:-0.25px;
      color: #0C0E16;
      border-radius:0.5rem;
      border:none;
      background-color: #FFF;
  }
  .react-datepicker__header--custom {
      padding:0;
      border:none;
      background-color: #FFF;
  }

  .react-datepicker__header--custom .react-datepicker__day-names {
      display:none;
  }

  .react-datepicker__month {
      padding:0 1.375rem 1.375rem 1.375rem;
      margin:0;
  }

  .react-datepicker__day {
      &:hover {
          background-color:transparent;
          color:#7C5DFA;
      }
  }

  .react-datepicker__day--keyboard-selected,
  .react-datepicker__day--selected {
      background-color: #7C5DFA;
      color:#ffffff;
  }

  .react-datepicker__day--disabled {
      color: #0C0E16;
      opacity:0.3;
  }

  .react-datepicker__day--outside-month {
      color: #0C0E16;
      opacity:0.08;
  }
`;

const InputLabel = styled.label`
  display: block;
  font-family: Spartan, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: #7e88c3;
  line-height: 1;
  margin-bottom: 0.625rem;
  & + span {
    display: block;
    font-size: 0.625rem;
    color: #EC5757;
  }
`;

const DatePickerInput = styled(DatePicker)`
  width: 100%;
  height: 3rem;
  background: #FFF url(${IconCalendar}) no-repeat calc(100% - 16px)
    center;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ error }) =>
    error ? "#EC5757" : "#DFE3FA"};
  border-radius: 0.25rem;
  padding: 0.9375rem 2.625rem 0.9375rem 1.25rem;
  font-family: Spartan, sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: #0C0E16;
  letter-spacing: -0.25px;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: #9277ff;
  }
  &:disabled {
    opacity: 0.6;
    cursor: auto;
  }
`;

const CustomHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5625rem;
`;

const ArrowButton = styled.button`
  width: auto;
  height: 0.625rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

function DatePickerField({
  id,
  label,
  name,
  value,
  error,
  onChange,
  dateFormatCalendar = 'LLLL',
  dateFormat = 'd MMM yyyy',
  ...rest
}) {
  return (
    <>
      <DatePickerStyling />
      <InputLabel htmlFor={id}>{label}</InputLabel>
      {error && <span>{error}</span>}
      <DatePickerInput
        id={id}
        name={name}
        value={value}
        selected={value}
        onChange={(val) => onChange(name, val)}
        dateFormat={dateFormat}
        dateFormatCalendar={dateFormatCalendar}
        showPopperArrow={false}
        error={error}
        renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => {
          return (
            <CustomHeader>
              <ArrowButton type="button" aria-label="Previous month" onClick={decreaseMonth}>
                <img src={IconArrowLeft} alt="" />
              </ArrowButton>
              <span>
                {monthDate.toLocaleString('en-US', {
                  month: 'short',
                  year: 'numeric'
                })}
              </span>
              <ArrowButton aria-label="Next month" type="button" onClick={increaseMonth}>
                <img src={IconArrowRight} alt="" />
              </ArrowButton>
            </CustomHeader>
          );
        }}
        {...rest}
      />
    </>
  );
}

export default DatePickerField;
