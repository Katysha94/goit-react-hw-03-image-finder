import React, { Component } from "react";
import {fetchImages} from '../helpers/Api-service'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar'
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader}  from './Loader/Loader'
import { toast } from 'react-toastify';
import { Modal } from "./Modal/Modal";

export class App extends Component {

  state = {
    images: [],
    isLoading: false,
    isLoadMore: false,
    showModal: false,
    isModalVisible: false,
    error: null,
    modalImage:null,
    searchQuery: '',
    page: 1,
}
 
   componentDidUpdate(prevProps, prevState) {
     const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.fetchImages(searchQuery,  page)
    }
    
   }
  
  
  fetchImages = async (searchQuery, page) => {
    this.setState({
        isLoading: true,
      })
    try {
  
      const response = await fetchImages(searchQuery, page);
      if (response.length === 0) {
        this.setState({
          isLoadMore: false,
        }) 
        return toast.error("Sory, There are no images matching your request", { theme: "colored" })
        
  
      } else {
        this.setState(prevState => ({
        images: [...prevState.images, ...response],
        isLoadMore: response.length > 0,
        error: null,
      }))
      }

      
  
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({isLoading: false})
    }
   
    
  }

  
  handleSearch = (searchQuery) => {
    this.setState({searchQuery, page: 1, images: [] })

  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoading: true,
    }))

  }

  openModal = largeImageURL => {
    this.setState({showModal: true, modalImage: largeImageURL, isModalVisible: true})
  }

  closeModal = () => {
    this.setState({showModal: false, modalImage: null, isModalVisible: false})
  }
 
  render() {
    const { images, isLoading, isLoadMore, error, isModalVisible, modalImage } = this.state;
    return (
    <div
      style={{
        display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: '16px',
  paddingBottom: '24px',
      }}
    >
        <Searchbar
          onSubmit={this.handleSearch} />
        <ImageGallery
          images={images}
          handleClick={this.openModal} />
        {isLoading && < Loader />}
      {isLoadMore && (
  <Button onClick={this.handleLoadMore} />
        )}
         {error && toast.error(`${error.message}`)}
         {isModalVisible && (
          <Modal
            closeModal={this.closeModal}
            imageUrl={modalImage}
          />)}
        <ToastContainer
          autoClose={3000}
        />
    </div>
  );
  }
  
};
