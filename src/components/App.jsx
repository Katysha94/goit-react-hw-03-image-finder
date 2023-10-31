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
      this.setState({ isLoading: true, page: 1 })
      this.fetchImages(searchQuery, 1)
    }
    
   }
  
  
  fetchImages = async (searchQuery, page) => {
    this.setState({
        isLoading: true,
      })
    try {
  
      const response = await fetchImages(searchQuery, page);
      if (response.total === 0) {
        this.setState({
          isLoadMore: false,
        }) 
        return toast.error("Sory, There are no images matching your request", { theme: "colored" })
  
      } else {
        this.setState(prevState => ({
        images: [...prevState.images, ...response],
          isLoadMore: true,
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
    this.setState({searchQuery, page: 1 })

  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      isLoading: true,
    }))
    this.fetchImages(this.state.searchQuery, this.state.page + 1)
  }

  openModal = largeImageURL => {
    this.setState({showModal: true, modalImage: largeImageURL, isModalVisible: true})
  }

  closeModal = () => {
    this.setState({showModal: false, modalImage: null, isModalVisible: false})
  }
 
  render() {
    return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
        <Searchbar
          onSubmit={this.handleSearch} />
        <ImageGallery
          images={this.state.images}
          handleClick={this.openModal} />
        {this.state.isLoading && < Loader />}
      {this.state.isLoadMore && (
  <Button onClick={this.handleLoadMore} />
        )}
         {this.state.error && toast.error(`${this.state.error.message}`)}
         {this.state.isModalVisible && (
          <Modal
            closeModal={this.closeModal}
            imageUrl={this.state.modalImage}
          />)}
        <ToastContainer
          autoClose={3000}
        />
    </div>
  );
  }
  
};
