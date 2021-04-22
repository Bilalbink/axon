import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Input from '../elements/Input';

const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool
}

const defaultProps = {
  ...SectionProps.defaults,
  split: false
}

const Cta = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  split,
  ...props
}) => {

  const outerClasses = classNames(
    'cta section center-content-mobile reveal-from-bottom',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'cta-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider',
    split && 'cta-split'
  );

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses} style={{borderRadius: 20}}>
          <div className="cta-slogan">
            <h3 className="m-0">
              Enter a URL to shorten!
              </h3>
          </div>
          <div className="cta-action">
            <Input style={{borderRadius: 5}} id="newsletter" type="email" label="Subscribe" labelHidden placeholder="Enter your URL" />
            <br />
            <p style={{ color: 'white' }}>
              Make a custom URL
            </p>
            <div style={{ display: 'flex', flexDirection: 'row' , justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ flex: 1, backgroundColor: '#ECEDED', borderRight: '2px solid #5E6D79', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                <label style={{ color: '#242424', fontSize: 16}}>
                  www.axon.com/
              </label>
              </div>
              <div style={{ flex: 2 }}>
                <Input style={{borderRadius: 5}} id="newsletter" type="email" label="Subscribe" labelHidden placeholder="Custom Link" />
              </div>
            </div>
            <div style={{marginTop: 30, borderRadius: 5}} className="button button-primary button-wide-mobile button-sm" >Generate</div>
          </div>
        </div>
      </div>
    </section>
  );
}

Cta.propTypes = propTypes;
Cta.defaultProps = defaultProps;

export default Cta;