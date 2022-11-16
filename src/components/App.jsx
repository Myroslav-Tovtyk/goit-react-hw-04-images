import { Container } from './Container/Container.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { PixabaySearch } from './PixabaySearch/PixabaySearch';
import { PixabayPictures } from 'services/api';
import { Pictures } from './Pictures/Pictures';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { BtnLoadMore } from './BtnLoadMore/BtnLoadMore';

export const App = () => {
  const [q, setQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState('');
  const [modalActive, setModalActive] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    fetchData();
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await PixabayPictures(q, page);
        setTotalHits(response.totalHits);

        if (response.hits.length === 0) {
          return toast.error('No match');
        }
        setPictures(prev => [...prev, response.hits]);
        console.log(response.hits);
      } catch (error) {
        return toast.error('Something goes wrong...');
      } finally {
        setIsLoading(false);
      }
    }
  }, [q, page]);

  const getPics = async values => {
    if (values.query === '') {
      return toast.warning('Please, enter Your search query');
    }
    try {
      setQuery(values.query);
      console.log(values.query);
      setPictures([]);
      setIsLoading(true);
      setPage(1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = () => {
    setModalActive(prev => !prev);
  };

  const showModal = image => {
    setLargeImage(image);
    toggleModal();
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <Container>
      <PixabaySearch onSubmit={getPics} />
      <Pictures items={pictures} onClick={showModal} />
      {isLoading && <Loader dots={true} />}
      {modalActive && <Modal bigImage={largeImage} onClose={toggleModal} />}
      {pictures.length !== 0 && pictures.length < totalHits && (
        <BtnLoadMore onClick={loadMore} />
      )}
      <ToastContainer />
    </Container>
  );
};

//   state = {
//     q: '',
//     pictures: [],
//     isLoading: false,
//     page: 1,
//     largeImage: '',
//     modalActive: false,
//     totalHits: 0,
//   };

//   getPics = async values => {
//     if (values.query === '') {
//       return toast.warning('Please, enter Your search query');
//     }
//     try {
//       this.setState({
//         q: values.query,
//         pictures: [],
//         isLoading: true,
//         page: 1,
//       });
//     } catch (error) {
//       console.log(error);
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   async componentDidUpdate(_, prevState) {
//     const { page, q } = this.state;

//     if (prevState.page !== page || prevState.q !== q) {
//       this.setState({ isLoading: true });

//       try {
//         const response = await PixabayPictures(q, page);
//         this.setState({ totalHits: response.totalHits });

//         if (response.hits.length === 0) {
//           return toast.error('No match. Type new query');
//         }

//         this.setState(prevState => ({
//           pictures: [...prevState.pictures, ...response.hits],
//         }));
//       } catch (error) {
//         return toast.error('Something goes wrong...');
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }
//   }

//   showModal = image => {
//     this.setState({ largeImage: image });
//     this.toggleModal();
//   };

//   toggleModal = () => {
//     this.setState(({ modalActive }) => ({
//       modalActive: !modalActive,
//     }));
//   };

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     const { pictures, isLoading, modalActive, largeImage, totalHits } =
//       this.state;

//   }
// }
