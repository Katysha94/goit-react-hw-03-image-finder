import { Component } from 'react';
import css from './Modal.module.css'

export class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

      handleKeyDown = evt => {
        if (evt.key === 'Escape') {
            this.props.closeModal();
        }
    }

    handleOverayClick = evt => {
        if (evt.target === evt.currentTarget) {
            this.props.closeModal();
        }
    }


    render() {
        const { imageUrl, children } = this.props;
    return (
      <div onClick={this.handleOverayClick} className={css.overlay}>
        <div className={css.modal}>
          <img src={imageUrl} alt="Modal" />
          {children}
        </div>
      </div>
        )
    }

}