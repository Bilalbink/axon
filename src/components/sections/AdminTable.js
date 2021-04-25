import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Input from '../elements/Input';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import AdminModal from '../sections/AdminModal';
import { create } from 'lodash';
import KeyModal from './KeyModal';

const propTypes = {
  ...SectionProps.types,
  split: PropTypes.bool
}

const defaultProps = {
  ...SectionProps.defaults,
  split: false
}

const AdminTable = ({
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

  const [urlList, setUrlList] = useState([]);
  const [keyList, setKeyList] = useState([]);
  const [inputModal, setInputModal] = useState(false);
  const [keyModal, setKeyModal] = useState(false);

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

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    axios.get('https://axonn.xyz/api/all/')
      .then((res) => {
        setUrlList(res.data)
      })
      .catch((error) => {
        console.warn(JSON.stringify(error));
      });

    axios.get('https://axonn.xyz/api/keys/all/')
      .then((res) => {
        setKeyList(res.data)
      })
      .catch((error) => {
        console.warn(JSON.stringify(error));
      });
  }

  const deleteEntry = (index) => {
    var data = new FormData();
    data.append('name', urlList[index].name);
    data.append('apiKey', 'bdOz4lykCPZOnMf');
    axios.post('https://axonn.xyz/api/delete/', data)
      .then((res) => {
        // let newUrlList = [...urlList];
        // newUrlList.splice(index, 1);
        // setUrlList(newUrlList);
        getData();
      })
      .catch((error) => {
        console.warn(JSON.stringify(error));
      });
  }

  const deleteKey = (index) => {
    var data = new FormData();
    console.log(keyList[index].id);
    data.append('id', keyList[index].id);
    data.append('apiKey', 'bdOz4lykCPZOnMf');
    axios.post('https://axonn.xyz/api/keys/delete/', data)
      .then((res) => {
        getData();
      })
      .catch((error) => {
        console.warn(JSON.stringify(error));
      });
  }

  const closeModal = () => {
    setInputModal(false);
    getData();
  }

  const closeKeyModal = () => {
    setKeyModal(false);
    getData();
  }

  // api/keys/create
  // name string
  // key

  // api/keys/delete
  // id

  const [pin, setPin] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const setPinText = (pin) => {
    setPin(pin);
  }

  const checkPin = () => {
    if (pin === '1111') {
      setIsAdmin(true);
    }
  }



  return (
    <section
      {...props}
      className={outerClasses}
    >
      {
        !isAdmin ?
          <div className="container" style={{ zIndex: 2, }}>
            <div className={innerClasses} style={{ marginTop: 50, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: '#7227ED' }}>
              <div className="cta-slogan">
                <h3 className="m-0">
                  Enter Pin
                </h3>
              </div>
              <div className="cta-action" style={{ maxWidth: 350 }}>
                <Input style={{ borderRadius: 5 }} value={pin} onChange={e => setPinText(e.target.value)} id="newsletter" type="password" label="Subscribe" labelHidden placeholder="Enter Pin" />
                <div
                  style={{ marginTop: 30, borderRadius: 5, backgroundColor: '#ECEDED', color: '#7227ED' }}
                  className="button button-primary button-wide-mobile button-sm"
                  onClick={() => checkPin()}>
                  Enter
                </div>
              </div>
            </div>
          </div>
          :
          <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
            {inputModal ?
              <div style={{ position: 'absolute', zIndex: 1, boxShadow: '0 0 20px rgba(0,0,0,0.8)', borderRadius: 10, backgroundColor: '#7227ED' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <button style={{ paddingRight: 10, background: 'none', border: 'none' }} onClick={() => closeModal()}>x</button>
                </div>
                <AdminModal closeModal={closeModal} />
              </div>
              :
              null
            }
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className={innerClasses} style={{ borderRadius: 20, minWidth: 1000 }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <div
                    style={{ fontSize: 10, borderRadius: 5, backgroundColor: '#36AF4F', color: 'white' }}
                    className="button button-primary button-wide-mobile button-sm"
                    onClick={() => { setInputModal(!inputModal) }}>
                    Add
          </div>
                </div>
                <table style={{ width: '100%', color: 'white', overflow: 'hidden', textAlign: 'center' }}>
                  <tr>
                    <th>Original URL</th>
                    <th>Shortened URL</th>
                    <th># of Redirects</th>
                    <th>Created On</th>
                    <th></th>
                  </tr>
                  {
                    urlList ?
                      urlList.map((item, index) => {
                        return (
                          <tr key={index} >
                            <td style={{ textAlign: 'left', maxWidth: 200, wordWrap: 'break-word', width: '60%' }}>{item.url}</td>
                            <td style={{ textAlign: 'left', width: '30%' }}>{'www.axonn.xyz/' + item.name}</td>
                            <td style={{ textAlign: 'left', width: '30%' }}>{item.redirects ? item.redirects : '0'}</td>
                            <td style={{ textAlign: 'left', width: '30%' }}>{item.date ? item.date : '-'}</td>
                            <td style={{ textAlign: 'right', width: '10%' }}>
                              <div
                                style={{ fontSize: 10, borderRadius: 5, backgroundColor: '#C70039', color: 'white' }}
                                className="button button-primary button-wide-mobile button-sm"
                                onClick={() => deleteEntry(index)}>
                                Delete
                      </div>
                            </td>
                          </tr>
                        )
                      })
                      :
                      null
                  }
                </table>
              </div>
              <div className={innerClasses} style={{ borderRadius: 20, minWidth: 1000, marginTop: 50, display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center' }}>
                {keyModal ?
                  <div style={{ position: 'absolute', zIndex: 1, boxShadow: '0 0 20px rgba(0,0,0,0.8)', borderRadius: 10, backgroundColor: '#7227ED' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                      <button style={{ paddingRight: 10, background: 'none', border: 'none' }} onClick={() => closeKeyModal()}>x</button>
                    </div>
                    <KeyModal closeModal={closeKeyModal} />
                  </div>
                  :
                  null
                }
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 150 }}>
                  <div
                    style={{ fontSize: 10, borderRadius: 5, backgroundColor: '#36AF4F', color: 'white' }}
                    className="button button-primary button-wide-mobile button-sm"
                    onClick={() => setKeyModal(!keyModal)}>
                    Add
              </div>
                </div>
                <table style={{ width: '100%', color: 'white', overflow: 'hidden', textAlign: 'center' }}>
                  <tr>
                    <th style={{ textAlign: 'center' }}>Name</th>
                    <th style={{ textAlign: 'center' }}>Api Key</th>
                    <th></th>
                  </tr>
                  {
                    urlList ?
                      keyList.map((item, index) => {
                        return (
                          <tr key={index} >
                            <td style={{ textAlign: 'center', maxWidth: 200, wordWrap: 'break-word', width: '35%' }}>{item.name}</td>
                            <td style={{ textAlign: 'center', width: '35%' }}>{item.apikey}</td>
                            <td style={{ textAlign: 'center', width: '30%' }}>
                              <div
                                style={{ fontSize: 10, borderRadius: 5, backgroundColor: '#C70039', color: 'white' }}
                                className="button button-primary button-wide-mobile button-sm"
                                onClick={() => deleteKey(index)}>
                                Delete
                      </div>
                            </td>
                          </tr>
                        )
                      })
                      :
                      null
                  }
                </table>
              </div>
            </div>
          </div>
      }
    </section>
  );
}

AdminTable.propTypes = propTypes;
AdminTable.defaultProps = defaultProps;

export default AdminTable;