// ----------------------
// IMPORTS

/* NPM */

// React
import React from 'react';
import PropTypes from 'prop-types';

/* Local */
import Carousel from './carousel';

// Styles
import sass from './styles.scss';

export default () => (
  <div>
    <div style={{width: '714px'}}>
      <Carousel slideWidth={200} slideGap={10}>
        <div className={sass.test_block}>Slide #1</div>
        <div className={sass.test_block}>Slide #2</div>
        <div className={sass.test_block}>Slide #3</div>
        <div className={sass.test_block}>Slide #4</div>
        <div className={sass.test_block}>Slide #5</div>
        <div className={sass.test_block}>Slide #6</div>
        <div className={sass.test_block}>Slide #7</div>
        <div className={sass.test_block}>Slide #8</div>
        <div className={sass.test_block}>Slide #9</div>
        <div className={sass.test_block}>Slide #10</div>
      </Carousel>
    </div>

    <div style={{width: '504px', marginTop: '15px'}}>
      <Carousel slideWidth={200} slideGap={10}>
        <div className={sass.test_block}>Slide #1</div>
        <div className={sass.test_block}>Slide #2</div>
        <div className={sass.test_block}>Slide #3</div>
        <div className={sass.test_block}>Slide #4</div>
      </Carousel>
    </div>
  </div>
)

