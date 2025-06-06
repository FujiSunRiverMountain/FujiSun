import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material';
import axios from "axios";
import { useEffect, useState } from 'react';
import { tokenUseStore } from '../BaseLayout/zustand';

export const PersonalInfo = () => {
  const { token } = tokenUseStore();
  const [information, setInfo] = useState('')
  const api = 'https://mhkkwfr9e9.execute-api.ap-northeast-1.amazonaws.com/api/slide_generator/personal_info';
  useEffect(() => {
    axios.get(api, {
      headers: {
        token
      },
    }).then(res => {
      setInfo(res.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [token])
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    axios.post(api, {
      information
    }, {
      headers: {
        token
      },
    }).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <Container >
      <Paper elevation={3} className='left-0 right-0 h-300 p-20 mt-20 rounded-md'>
        <Typography variant="h5" align="center" gutterBottom>
          自己情報入力
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate >
          <TextField
            sx={{"& .MuiInputBase-input": { height: 500 } }}
            fullWidth
            required
            id="info"
            name="info"
            defaultValue={information}
            variant="outlined"
            margin="normal"
            multiline
            rows={20}
            onChange={(e) => setInfo(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className='mt-4'
          >
            送信
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
