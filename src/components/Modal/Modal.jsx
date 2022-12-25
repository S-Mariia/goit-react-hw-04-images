import PropTypes from 'prop-types';
import { Component } from 'react';
import { Overlay, ModalWrap } from './Modal.styled';

export class Modal extends Component {
  static propTypes = {
image: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  }

    componentDidMount() {
    document.addEventListener('keydown', this.onEscapePress);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onEscapePress);
    }

    onEscapePress = (evt) => {
        if (evt.code !== "Escape") {
            return;
        }
        console.log('Press');
        this.props.closeModal();
    }

    handleClick = (evt) => {
        if (evt.target !== evt.currentTarget) {
            return;
        }
        console.log('Click');
        this.props.closeModal();

  };
  render() {
    const { largeImageURL, tags } = this.props.image;

    return (
      <Overlay onClick={this.handleClick}>
        <ModalWrap>
          <img src={largeImageURL} alt={tags} />
        </ModalWrap>
      </Overlay>
    );
  }
}
