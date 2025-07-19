import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Cards = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    <Box sx={{ px: 1, py: 2 }}>
     <Card
  sx={{
    maxWidth: 280,
    height: 350,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', 
    borderRadius: 2,
    boxShadow: 3,
    cursor: 'pointer',
  }}
  onClick={() => navigate(`/blog/${_id}`)}
>
  <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardMedia
      component="img"
      image={image}
      alt={title}
      sx={{ height: 160, width: '100%', objectFit: 'cover' }} 
    />
    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography
        sx={{
          border: '1px solid #1de9b6',
          color: '#1de9b6',
          fontSize: '0.75rem',
          alignSelf: 'flex-start',
          borderRadius: '999px',
          px: 1.5,
          py: 0.3,
        }}
      >
        {category}
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
        {title}
      </Typography>
      <p className='mb-3 text-xs text-gray-400' dangerouslySetInnerHTML={{"__html":description.slice(0, 80)}}></p>
    </CardContent>
  </CardActionArea>
</Card>

    </Box>
  );
};

export default Cards;
