import { Container, Box, TextField, Button, Typography, Paper, Snackbar, Alert, Backdrop, CircularProgress, SnackbarContent } from '@mui/material';
import axios from "axios";
import { useState } from 'react';
import { tokenUseStore } from '../BaseLayout/zustand';

export const GenerateSlide = () => {
  const { token } = tokenUseStore();
  const [name, setFileName] = useState('')
  const [information, setInfo] = useState('')
  const [showToast, setShowToast] = useState(false); // トースト表示状態
  const [loading, setLoading] = useState(false);
  const api = 'https://mhkkwfr9e9.execute-api.ap-northeast-1.amazonaws.com/api/slide_generator/generate_slide';
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true); // スピナー表示開始
    axios.post(api, {
      file_name: name,
      information,
    }, {
      headers: {
        token
      },
    }).then(function () {
      setFileName('');
      setInfo('');
      setLoading(false);   // スピナー消す
      setTimeout(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }, 2000);
    })
      .catch(function (error) {
        console.log(error);
        setLoading(false);   // スピナー消す
      });
  };

  return (
    <Container >
      <Paper elevation={3} className='left-0 right-0 h-300 p-20 mt-20 rounded-md'>
        <Typography variant="h5" align="center" gutterBottom>
          作成したいスライドのファイル名と要望を教えてください
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate >
          <TextField
            fullWidth
            required
            id="name"
            name="name"
            label="ファイル名（拡張子なし）"
            value={name}
            variant="outlined"
            margin="normal"
            onChange={(e) => setFileName(e.target.value)}
          />
          <TextField
            sx={{ "& .MuiInputBase-input": { height: 500 } }}
            fullWidth
            required
            id="info"
            name="info"
            label="要望内容"
            value={information}
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
          {/* ローディングオーバーレイ */}
          {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
              <CircularProgress size={80} className="text-white" />
            </div>
          )}

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

