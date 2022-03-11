import React from 'react';
import { connect } from 'react-redux';
import { delCard } from '../../redux/actions';
import { CurveWeather } from './curveWeather';
import HeaderCard from './headerCard';
import TemperatureCard from './temperatureCard';

import '../Styles.css'

class AddCards extends React.Component {
  state = {
    units: 'metric',
  }
  handleMetric = () => {
    this.setState({ units: 'metric' })
  }
  handleImperial = () => {
    this.setState({ units: 'imperial' })
  }
  render() {
    const { card } = this.props

    return (
      <div className="card-wrap" key={card.id}
        style={{ backgroundColor: card.main_temp > 0 ? "#fff1fe" : "#f1f2ff" }}
      >
        <HeaderCard {...this.props.card} />
        <CurveWeather width={300} height={50} id={card.id} time={card.graph} units={this.state.units} colorStopStart={card.color} />
        <TemperatureCard {...this.props.card} handleMetric={this.handleMetric} handleImperial={this.handleImperial} units={this.state.units} />
        <button
          className="del"
          onClick={(e) => {
            this.props.delCard(card.id)
          }}
        >
          &#10006;
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = {
  delCard,
}

export default connect(null, mapDispatchToProps)(AddCards)