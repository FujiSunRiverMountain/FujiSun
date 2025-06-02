import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material';
import axios from "axios";
import { useState } from 'react';

export const PersonalInfo = () => {
  const [info, setInfo] = useState('')
  const api = 'https://mhkkwfr9e9.execute-api.ap-northeast-1.amazonaws.com/api/slide_generator/personal_info';
  axios.get(api, {
    headers: {
      token: ''
    },
  }).then(res => {
    setInfo(res.data);
  })
  .catch(function (error) {
    console.log(error);
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();;
    axios.post(api, {
      headers: {
        token: ''
      },
      info 
    }).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 4,}} className='w-300 h-300'>
        <Typography variant="h5" align="center" gutterBottom>
          お名前入力
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate >
          <TextField
            sx={{"& .MuiInputBase-input": { height: 500 } }}
            fullWidth
            required
            id="info"
            name="info"
            label="自己情報"
            defaultValue={info}
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
            sx={{ mt: 2 }}
          >
            送信
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
