import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchData, createCard } from '../redux/actions';

import Form from './form';

class AddCards extends React.Component{
    constructor(props) {
        super(props)
    
        this.state = {
          data: ''
        }
      }
      
    render() {
        const newData = {
            title, id: Date.now().toString()
          }
        this.props.createCard(newData)
    
       
            return (
                <div >
                   
                </div>
            )
        }
}
const mapStateToProps = state => {
    return {
        weatherCard: state.cards.cards
    }
}
const mapDispatchToProps = {
    createCard,
    fetchData
  }

export default connect(mapStateToProps, mapDispatchToProps)(AddCards)