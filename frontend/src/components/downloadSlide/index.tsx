import { Box, Button, Container, Paper, Typography } from '@mui/material';
import axios from "axios";
import { useEffect, useState } from 'react';
import { tokenUseStore } from '../BaseLayout/zustand';
import DownloadIcon from '@mui/icons-material/Download';

export const DownloadSlide = () => {
  const { token } = tokenUseStore();
  const [storageInfo, setStorageInfo] = useState([{ storage_id: '', file_name: '' }])
  // const getInfoApi = 'https://mhkkwfr9e9.execute-api.ap-northeast-1.amazonaws.com/api/slide_generator/slides';
  const downloadApi = 'https://mhkkwfr9e9.execute-api.ap-northeast-1.amazonaws.com/api/slide_generator/download_slide';

  useEffect(() => {
    setStorageInfo([{ storage_id: 'test', file_name: 'test' }, { storage_id: 'test2', file_name: 'test2' },])
    // axios.get(getInfoApi, {
    //   headers: {
    //     token
    //   },
    // }).then(res => {
    //   setStorageInfo(res.data);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }, [token])

  const handleDownload = (e: React.MouseEvent<HTMLButtonElement>, storage_id: string) => {
    e.preventDefault();
    axios.post(downloadApi, {
      storage_id
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
    <Container>
      <Paper elevation={3} className="left-0 right-0 h-300 p-20 mt-20 rounded-md">
        <Typography variant="h5" align="center" gutterBottom>
          ダウンロードしたいファイル名をクリックしてください
        </Typography>
        <Box className="flex flex-row space-x-4 space-y-4 flex-wrap">
          {storageInfo.map((info) => (
            <Button
            key={info.storage_id}
            onClick={(e) => handleDownload(e, info.storage_id)}
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            className="normal-case text-white hover:bg-blue-700 hover:scale-105 transition-transform duration-300 rounded px-3 py-1.5 w-auto focus:outline-none focus:ring-0"
          >
            {info.file_name}
          </Button>
          ))}
        </Box>
      </Paper>
    </Container>
  );
}
