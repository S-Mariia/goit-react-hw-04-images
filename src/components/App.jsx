import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { getImages } from 'servises/api';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState(null);

  const firstRender = useRef(true);

  const updateQuery = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setTotalPages(null);
    setError(null);
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    
    const fetchImages = async () => {
      try {
        setIsLoaded(false);

        if (query.trim() === '') {
          throw new Error('Please type something');
        }

        const receivedImages = await getImages(query, page);

        if (receivedImages.total === 0) {
          throw new Error(
            'Sorry nothing is found. Please try to find something else😌'
          );
        }

        const totalPages =
          receivedImages.totalHits % 12 === 0
            ? Math.floor(receivedImages.totalHits / 12)
            : Math.floor(receivedImages.totalHits / 12) + 1;
        
        setImages(prevImages => [...prevImages, ...receivedImages.hits]);
        setTotalPages(totalPages);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchImages();
  }, [page, query]);

  return (
    <>
      <SearchBar onSubmit={updateQuery} />
      {images.length > 0 && <ImageGallery images={images} />}
      {!isLoaded && <Loader />}
      {error !== null && toast.error(error)}
      {images.length > 0 && page < totalPages && (
        <Button onClick={() => setPage(prevPage => prevPage + 1)} />
      )}
      <ToastContainer position="top-right" autoClose={3500} />
    </>
  );
};

