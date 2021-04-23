import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Input from '../elements/Input';

import axios from 'axios';

const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool
}

const defaultProps = {
  ...SectionProps.defaults,
  split: false
}

const AdminModal = ({
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

  const [originalUrl, setOriginalUrl] = useState('');
  const [urlFound, setUrlFound] = useState(false);
  const [customText, setCustomText] = useState('');
  const [errorFound, setErrorFound] = useState(false);
  const [invalidCustom, setInvalidCustom] = useState(false);

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

  const sanitizeCustomUrl = (target) => {
    let clean = target.replace(' ', '');
    setCustomText(clean);
  }

  const setUrlText = (url) => {
    url = url.replace("www.", "");
		if(!url.startsWith("http")){
			url += "http://" + url
		}
    setOriginalUrl(url);
  }

  const reset = () => {
    setOriginalUrl('');
    setCustomText('');
    setUrlFound(!urlFound);
    setErrorFound(false);
    setInvalidCustom(false);
  }

  const shortenUrl = () => {
    var data = new FormData();
    if (customText === '' && originalUrl !== '') {
      data.append('url', originalUrl);

      axios.post('http://axonn.xyz/api/short/', data)
        .then((res) => {
          console.log(res);
          setCustomText(res.data);
          setUrlFound(!urlFound);
          setInvalidCustom(false);
          setErrorFound(false);
        })
        .catch((error) => {
          console.warn(JSON.stringify(error));
        });
    }
    else if (originalUrl !== '') {
      data.append('url', originalUrl);
      data.append('name', customText);

      axios.post('http://axonn.xyz/api/customShort/', data)
        .then((res) => {
          console.log(res);
          setUrlFound(!urlFound);
          setInvalidCustom(false);
          setErrorFound(false);
        })
        .catch((error) => {
          // console.warn(JSON.stringify(error));
  
          setInvalidCustom(true);
        });
    }
    else {
      setErrorFound(true);
    }
  }

  return (
      <div className="container" style={{zIndex: 2}}>
        <div className={innerClasses} style={{ borderRadius: 20 }}>
          <div className="cta-slogan">
            <h3 className="m-0">
              Enter a URL to shorten!
              </h3>
          </div>
          <div className="cta-action">
            <Input style={{ borderRadius: 5 }} value={originalUrl} onChange={e => setUrlText(e.target.value)} id="newsletter" type="email" label="Subscribe" labelHidden placeholder="Enter your URL" />
            {
              errorFound ?
                <label style={{ fontSize: 12, backgroundColor: 'red', color: 'white', borderRadius: 5, marginTop: 10, paddingTop: 2, paddingBottom: 2, paddingLeft: 5, paddingRight: 5 }}>Invalid URL!</label>
                :
                null
            }
            <br />
            <p style={{ color: 'white' }}>
              Make a custom URL
            </p>
            {urlFound ?
              <>
                <label style={{ color: '#242424', fontSize: 16, backgroundColor: '#ECEDED', borderRight: '2px solid #5E6D79', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                  {'www.axonn.xyz/' + customText}
                </label>
                <div
                  style={{ marginTop: 30, borderRadius: 5, backgroundColor: '#ECEDED', color: '#7227ED' }}
                  className="button button-primary button-wide-mobile button-sm"
                  onClick={() => props.closeModal()}>Done
                </div>
              </>
              :
              <>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ flex: 1, backgroundColor: '#ECEDED', borderRight: '2px solid #5E6D79', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                    <label style={{ color: '#242424', fontSize: 16 }}>
                      www.axonn.xyz/
                    </label>
                  </div>
                  <div style={{ flex: 2 }}>
                    <Input style={{ borderRadius: 5 }} value={customText} onChange={e => sanitizeCustomUrl(e.target.value)} id="newsletter" type="email" label="Subscribe" labelHidden placeholder="Custom Link" />
                  </div>
                </div>
                { invalidCustom ?
                  <div>
                    <label style={{ fontSize: 12, backgroundColor: 'red', color: 'white', borderRadius: 5, marginTop: 10, paddingTop: 2, paddingBottom: 2, paddingLeft: 5, paddingRight: 5 }}>Invalid Custon Link!
                  </label>
                  </div>
                  :
                  null
                }
                <div
                  style={{ marginTop: 30, borderRadius: 5, backgroundColor: '#ECEDED', color: '#7227ED' }}
                  className="button button-primary button-wide-mobile button-sm"
                  onClick={() => shortenUrl()}>
                  Generate
                </div>
              </>
            }
          </div>
        </div>
      </div>
  );
}

AdminModal.propTypes = propTypes;
AdminModal.defaultProps = defaultProps;

export default AdminModal;