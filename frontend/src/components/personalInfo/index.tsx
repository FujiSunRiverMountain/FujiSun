import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material';
import axios from "axios";

export const PersonalInfo = () => {
  const api = 'https://mhkkwfr9e9.execute-api.ap-northeast-1.amazonaws.com/api/slide_generator/personal_info';
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const information = e.target.info.value;
    axios.post(api, {
      user_id: 'test123',
      information 
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
            variant="outlined"
            margin="normal"
            multiline
            rows={20}
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
