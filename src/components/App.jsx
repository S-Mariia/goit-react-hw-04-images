import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { getImages } from 'servises/api';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    totalPages: null,
    isLoaded: true,
    error: null,
  };

  setQuery = query => {
    this.setState({
      query,
      images: [],
      page: 1,
      totalPages: null,
      error: null,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        if (query.trim() === "") {
          throw new Error("Please type something");
        }

        this.setState({ isLoaded: false });
        const images = await getImages(query, page);

        if (images.total === 0) {
          throw new Error('Sorry nothing is found. Please try to find something else😌');
        }
        const totalPages =
          images.totalHits % 12 === 0
            ? Math.floor(images.totalHits / 12)
            : Math.floor(images.totalHits / 12) + 1;
        this.setState(pS => ({
          images: [...pS.images, ...images.hits],
          totalPages,
        }));
      } catch(error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoaded: true });
      }
    }
  }

  render() {
    const { images, page, totalPages, isLoaded, error } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.setQuery} />
        {images.length > 0 && <ImageGallery images={images} /> }
        {!isLoaded && <Loader />}
        {error !== null &&
          toast.error(error)}
        {images.length > 0 && page < totalPages && (
          <Button onClick={this.loadMore} />
        )}
        <ToastContainer
          position="top-right"
          autoClose={3500}
        />
      </>
    );
  }
}
