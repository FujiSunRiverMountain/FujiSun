import { AppBar, Toolbar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { label: '自己情報入力', tab: 'personal-info', path: '/' },
  { label: 'スライド作成', tab: 'generate-slide', path: '/generate-slide' },
  { label: 'スライドダウンロード', tab: 'download-slide', path: '/download-slide' },
];

export const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" className="text-white shadow z-50 h-16 justify-center">
      <Toolbar className="max-w-7xl mx-auto w-full flex px-8">
        <Box className="text-2xl font-bold mr-auto">
          SlideGenerator
        </Box>
        <Box className="flex space-x-12 items-center">
          {navItems.map((item) => (
            <button
            onClick={() => navigate(item.path)}
            className="text-white bg-transparent border-none appearance-none focus:outline-none
                       transition-transform duration-300 ease-in-out transform
                       hover:scale-105"
          >
            {item.label}
          </button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
