import { useState } from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/system";
import { Paper, Typography, IconButton } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PropTypes from 'prop-types';

const StyledPaper = styled(Paper)({
  position: 'relative',
  width: 250,
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0 20px 25px rgb(0 0 0 / 25%)',
  },
});

const Image = styled('img')({
    width: '100%',
    marginBottom: '1rem',
});

const Buttons = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
});

function Card({ imagen, title, author }) {
  const [show, setShown] = useState(false);
  const [songProgress, setSongProgress] = useState(0);

  const handleSongProgressChange = (event, newValue) => {
    setSongProgress(newValue);
  };
  
  return (
    <StyledPaper
      elevation={show ? 8 : 2}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <Image src={imagen} alt="" />
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      <Typography variant="body1" component="h3">
        {author}
      </Typography>
      <Slider
        value={songProgress}
        onChange={handleSongProgressChange}
      />

      <Buttons>
        <IconButton aria-label="previous">
          <SkipPreviousIcon />
        </IconButton>
        <IconButton aria-label="play">
          <PlayArrowIcon />
        </IconButton>
        <IconButton aria-label="next">
          <SkipNextIcon />
        </IconButton>
      </Buttons>
    </StyledPaper>
  );
}

Card.propTypes = {
  imagen: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default Card;
