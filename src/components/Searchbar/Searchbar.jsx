import css from './Searchbar.module.css'
import { Component } from 'react';
import { toast } from 'react-toastify';


export class Searchbar extends Component {

    state = {
        value: ''
    }
        
    handleSubmit = (evt) => {
        evt.preventDefault();
        if (this.state.value.trim() === '') {
           return toast.error("Please, enter your request!", {theme: "colored"});
            
        }
        this.props.onSubmit(this.state.value)
        this.setState({
            value: ''
        })
    }

    handleInputChange = (evt) => {
        this.setState({value: evt.target.value})
    }
        
    render() {
        return (
    <header className={css.searchbar}>
     <form
        className={css.searchbarForm}
        onSubmit={this.handleSubmit}>
    <button
        type="submit"
        className={css.searchBtn}>
      <span className={css.searchBtnLabel}>Search</span>
    </button>

    <input
        className={css.searchbarInput}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        value={this.state.value}
        onChange={this.handleInputChange}                
    />
  </form>
</header>
       )
   }

    
    
}



