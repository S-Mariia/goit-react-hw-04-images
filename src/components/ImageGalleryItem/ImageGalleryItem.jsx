import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image: { webformatURL, tags, largeImageURL }}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Item onClick={() => setIsModalOpen(prevState => !prevState)}>
        <Image src={webformatURL} alt={tags} />
      </Item>
      {isModalOpen && (
        <Modal
          image={{ largeImageURL, tags }}
          closeModal={() => setIsModalOpen(prevState => !prevState)}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
