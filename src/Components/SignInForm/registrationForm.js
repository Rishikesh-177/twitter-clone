import React, { useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import CloseIcon from '@mui/icons-material/Close';
import style from './registrationForm.module.css'
import {useNavigate} from "react-router-dom";

const RegistrationContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  width: '70%',
});

const RegistrationForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  width: '80%',
  margin: 'auto',
});

const RegistrationButton = styled(Button)({
  marginTop: '20px',
});

export default function RegistrationPage() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');



  const navigate = useNavigate();

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    handleOpen();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(!name === ' '){
        alert('enter a valid name')
    }else if(phone.length <= 10){
        alert('Enter a valid Phone Number')
    }else if(!day && !month && !year === ''){
        alert('Enter a valid Date')
    }else{
        const inpVal = {
            name,
            phone,
            day,
            month,
            year
        }
        localStorage.setItem('inpval' ,JSON.stringify(inpVal) )
        navigate('/signin')
    }

  };

  return (
    <RegistrationContainer>
      <Modal
        open={open}
        aria-labelledby="registration-modal-title"
        aria-describedby="registration-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            minWidth: '30%',
            maxWidth: '35%',
            height: '80vh',
            borderRadius: '1rem',
            border:'none',
            outline:'none'
          }}
        >
        <div className={style.topcontent}>
        <CloseIcon onClick={handleClose}></CloseIcon>
        <h3>Step 1 of 5</h3>
        </div>
          <RegistrationForm onSubmit={handleSubmit}>
            <h1 className={style.headerContent}>Create your account</h1>
            <TextField placeholder="Name" value={name} onChange={handleNameChange} required 
                
            />
            <TextField
              placeholder="Phone"
              type="Phone"
              value={phone}
              onChange={handlePhoneChange}
              required
              sx={{
                marginTop:"1rem"
              }}
            />
            <p className={style.changeToEmail}>Use email instead</p>
            <h4>Date of birth</h4>
            <p className={style.textContent}>
              This will not be shown publicly. Confirm your own age, even if this account is for a
              business, a pet, or something else.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <FormControl>
                <InputLabel>Day</InputLabel>
                <Select value={day} onChange={handleDayChange} style={{ minWidth: '80px' }}>
                  {Array.from(Array(31), (_, i) => i + 1).map((day) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel>Month</InputLabel>
                <Select value={month} onChange={handleMonthChange} style={{ minWidth: '100px' }}>
                  {Array.from(Array(12), (_, i) => i + 1).map((month) => (
                    <MenuItem key={month} value={month}>
                      {new Date(0, month).toLocaleString('default', { month: 'long' })}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel>Year</InputLabel>
                <Select value={year} onChange={handleYearChange} style={{ minWidth: '80px' }}>
                  {Array.from(Array(121), (_, i) => 2023 - i).map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <RegistrationButton
              type="submit"
              variant="contained"
              onClick={handleSubmit}
              
              sx={{
                borderRadius: '2rem',
                padding: '0.7rem',
                fontSize: '1rem',
                fontWeight: '700',
                marginTop:'3rem',
                backgroundColor:'#33302f'
              }}
            >
              Next
            </RegistrationButton>
          </RegistrationForm>
        </Box>
      </Modal>
    </RegistrationContainer>
  );
}