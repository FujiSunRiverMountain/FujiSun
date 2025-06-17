import { Container, Box, TextField, Button, Typography, Paper, Snackbar, SnackbarContent } from '@mui/material';
import axios from "axios";
import { useEffect, useState } from 'react';
import { tokenUseStore } from '../BaseLayout/zustand';

export const PersonalInfo = () => {
  const { token } = tokenUseStore();
  const [information, setInfo] = useState('')
  const [showToast, setShowToast] = useState(false); // トースト表示状態
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
    }).then(function () {
      setTimeout(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }, 2000);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <Container  sx={{
      maxHeight: '100vh',
      overflowY: 'auto',
    }}>
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
          <Snackbar
            open={showToast}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <SnackbarContent
              className="bg-green-600 text-white px-6 py-3 rounded-md shadow-lg text-lg font-semibold"
              message="送信が完了しました！"
            />
          </Snackbar>
        </Box>
      </Paper>
    </Container>
  );
}
