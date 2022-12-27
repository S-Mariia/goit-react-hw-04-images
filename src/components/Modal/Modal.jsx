import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWrap } from './Modal.styled';

export const Modal = ({ closeModal, image: {largeImageURL, tags} }) => {  
  useEffect(() => {
    const onEscapePress = evt => {
      if (evt.code !== 'Escape') {
        return;
      }
      console.log('Press');
      closeModal();
    };
    
    window.addEventListener('keydown', onEscapePress);

    return () => {
      window.removeEventListener('keydown', onEscapePress);
    }
  }, [closeModal]);

  const handleClick = evt => {
    if (evt.target !== evt.currentTarget) {
      return;
    }
    console.log('Click');
    closeModal();
  };

  return (
    <Overlay onClick={handleClick}>
      <ModalWrap>
        <img src={largeImageURL} alt={tags} />
      </ModalWrap>
    </Overlay>
  );
};

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
