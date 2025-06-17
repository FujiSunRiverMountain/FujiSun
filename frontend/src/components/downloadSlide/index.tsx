import { Box, Button, Container, Paper, Typography } from '@mui/material';
import axios from "axios";
import { useEffect, useState } from 'react';
import { tokenUseStore } from '../BaseLayout/zustand';
import DownloadIcon from '@mui/icons-material/Download';
import { downloadByPresignedUrl } from './s3download';

type StorageInfo = {
  storage_id: string;
  file_name: string;
};

export const DownloadSlide = () => {
  const { token } = tokenUseStore();
  const [storageInfo, setStorageInfo] = useState<StorageInfo[] | undefined>(undefined)
  const getInfoApi = 'https://mhkkwfr9e9.execute-api.ap-northeast-1.amazonaws.com/api/slide_generator/slides';
  const downloadApi = 'https://mhkkwfr9e9.execute-api.ap-northeast-1.amazonaws.com/api/slide_generator/download_slide';

  useEffect(() => {
    axios.get(getInfoApi, {
      headers: {
        token
      },
    }).then(res => {
      setStorageInfo(res.data);
    })
      .catch(function (error) {
        console.log(error);
      });
  }, [token])

  const handleDownload = (e: React.MouseEvent<HTMLButtonElement>, info: {storage_id: string, file_name: string}) => {
    e.preventDefault();
    axios.post(downloadApi, {
      storage_id: info.storage_id
    }, {
      headers: {
        token
      },
    }).then(function (response) {
      console.log(response.data.download_url);
      downloadByPresignedUrl(response.data.download_url, info.file_name)
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
      <Paper elevation={3} className="left-0 right-0 h-300 p-20 mt-20 rounded-md">
        <Typography variant="h5" align="center" gutterBottom>
          ダウンロードしたいファイル名をクリックしてください
        </Typography>
        <Box className="flex flex-row space-x-4 space-y-4 flex-wrap">
          {storageInfo && storageInfo.length > 0 ? (
            storageInfo.map((info) => (
              <Button
                key={info.storage_id}
                onClick={(e) => handleDownload(e, info)}
                variant="contained"
                color="primary"
                startIcon={<DownloadIcon />}
                className="normal-case text-white hover:bg-blue-700 hover:scale-105 transition-transform duration-300 rounded px-3 py-1.5 w-auto focus:outline-none focus:ring-0"
              >
                {info.file_name}
              </Button>
            ))
          ) : (
            <p className="text-gray-500">作成されたデータはありません</p>
          )}
      </Box>
    </Paper>
    </Container >
  );
}
