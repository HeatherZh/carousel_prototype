import React, { Component, Children } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliding: false,
      offset: 0
    }
    this.events = {
      onTransitionEnd: this.onTransitionEnd.bind(this)
    }
  }

  componentDidMount() {
    const sliderNode = ReactDOM.findDOMNode(this.refs.slider)
    this.setState({
      sliderWidth: sliderNode.getBoundingClientRect().width
    })
  }

  onTransitionEnd() {
    this.setState({
      sliding: false
    })
  }

  changeSlide(slideUnit) {
    this.setState({
      sliding: true,
      offset: this.state.offset + slideUnit
    })
  }

  render() {
    const {children, slideWidth, slideGap, className, transitionDuration, transitionTimingFunction} = this.props
    const {sliding, offset} = this.state
    let totalSlidesCanBeHeld = 0
    if (this.state.sliderWidth > 0 && (slideWidth + slideGap > 0)) {
      totalSlidesCanBeHeld = Math.floor(this.state.sliderWidth/(slideWidth + slideGap))
    }

    const slides = Children.map(children, (child) => React.cloneElement(child, {key: child.key + '_clone'}))
    const count = Children.count(children)
    const prevSlide = this.changeSlide.bind(this, 1)
    const nextSlide = this.changeSlide.bind(this, -1)
    const showPrevBtn = (offset < 0)
    const showNextBtn = (count + offset >= totalSlidesCanBeHeld)
    const slideStyle = {
      flexShrink: 0
    }

    return (
      <div ref='slider' style={{
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'flex-start',
      }}>

        <button style={{
          visibility: showPrevBtn ? 'visible': 'hidden',
          flexShrink: 0,
          marginRight: '10px'}}
          disabled={!showPrevBtn || this.state.sliding}
          onClick={prevSlide}>prev</button>

        <div style={{
          flex: '1 100%',
          position: 'relative',
          overflowX: 'hidden',
          touchAction: 'pan-y pinch-zoom',
          willChange: 'transform',
        }}>
          <ul style={{
            display: 'flex',
            listStyleType: 'none',
            padding: '0px',
            margin: '0px',
            transitionProperty: sliding ? 'transform': 'none',
            transform: (offset !== 0)
              ? 'translateX(' + offset * (slideWidth + slideGap) + 'px)'
              : null,
            transitionDuration,
            transitionTimingFunction}} {...this.events}>
            {count > 0
               ? Children.map(slides, (item, index) => <li style={slideStyle}>{item}</li>)
               : <li>{children}</li>
            }
          </ul>
        </div>

        <button style=
          {{flexShrink: 0,
            visibility: showNextBtn ? 'visible' : 'hidden',
            marginLeft: '10px'}}
          disabled={!showNextBtn || this.state.sliding}
          onClick={nextSlide}>next</button>
      </div>
    )
  }
}

Carousel.propTypes = {
  className: PropTypes.string,
  slideWidth: PropTypes.number,
  slideGap: PropTypes.number,
  transitionDuration: PropTypes.string,
  transitionTimingFunction: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

Carousel.defaultProps = {
  transitionDuration: '.8s',
  transitionTimingFunction: 'ease-in-out',
};

export default Carousel;
