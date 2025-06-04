import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material';
import axios from "axios";
import { useEffect, useState } from 'react';
import { tokenUseStore } from '../BaseLayout/zustand';

export const PersonalInfo = () => {
  const { token } = tokenUseStore();
  const [information, setInfo] = useState({information: ''})
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
  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios.post(api, {
      information: information.information
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
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 4,}} className='w-300 h-300'>
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
            label="自己情報"
            defaultValue={information?.information ?? ''}
            variant="outlined"
            margin="normal"
            multiline
            rows={20}
            onChange={(e) => setInfo({ information: e.target.value })}
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
