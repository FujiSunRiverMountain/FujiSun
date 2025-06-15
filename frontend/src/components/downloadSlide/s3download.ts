
export const downloadByPresignedUrl = (presignedUrl: string, fileName: string) => {
  fetch(presignedUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('ダウンロード失敗');
      }
      return response.blob();
    })
    .then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); // 保存ファイル名指定
      document.body.appendChild(link);
      link.click();
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
      window.URL.revokeObjectURL(url); // メモリ解放
    })
    .catch(error => {
      console.error('エラー:', error);
    });
  }
