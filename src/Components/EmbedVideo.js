import React from 'react';
import PropTypes from 'prop-types';
import './CSS/embedVideo.css';

// fonte: https://dev.to/bravemaster619/simplest-way-to-embed-a-youtube-video-in-your-react-app-3bk2

const EmbedVideo = ({ embedId }) => (
  <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      src={ `https://www.youtube.com/embed/${embedId[1]}` }
      frameBorder="0"
      allow="accelerometer;
       autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
      data-testid="video"
    />
  </div>
);

EmbedVideo.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default EmbedVideo;
