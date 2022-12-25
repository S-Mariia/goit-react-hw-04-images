import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import { Item, Image } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  static propTypes = {
    image: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  }
  
  state = {
    isModalOpen: false,
  };

  togleModal = () => {
    this.setState(({isModalOpen}) => ({ isModalOpen: !isModalOpen }));
  };

  render() {
    const { isModalOpen } = this.state;
    const { webformatURL, tags, largeImageURL } = this.props.image;
    return (
      <>
        <Item onClick={this.togleModal}>
          <Image src={webformatURL} alt={tags} />
        </Item>
        {isModalOpen && (
          <Modal image={{ largeImageURL, tags }} closeModal={this.togleModal} />
        )}
      </>
    );
  }
}
