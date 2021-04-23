import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Input from '../elements/Input';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import AdminModal from '../sections/AdminModal';

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
  const [inputModal, setInputModal] = useState(false);

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
    axios.get('https://cors-anywhere.herokuapp.com/http://axonn.xyz/api/all/')
      .then((res) => {
        setUrlList(res.data)
      })
      .catch((error) => {
        console.warn(JSON.stringify(error));
      });
  }

  const deleteEntry = (index) => {
    var data = new FormData();
    data.append('name', urlList[index].name);
    axios.post('http://axonn.xyz/api/delete/', data)
      .then((res) => {
        let newUrlList = [...urlList];
        newUrlList.splice(index, 1);
        setUrlList(newUrlList);
      })
      .catch((error) => {
        console.warn(JSON.stringify(error));
      });
  }

  const closeModal = () => {
    setInputModal(false);
    getData();
  }

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
              <th></th>
            </tr>
            {
              urlList ?
                urlList.map((item, index) => {
                  return (
                    <tr key={index} >
                      <td style={{ textAlign: 'left', maxWidth: 200, wordWrap: 'break-word', width: '60%' }}>{item.url}</td>
                      <td style={{ textAlign: 'left', width: '30%' }}>{'www.axonn.xyz/' + item.name}</td>
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
      </div>
    </section>
  );
}

AdminTable.propTypes = propTypes;
AdminTable.defaultProps = defaultProps;

export default AdminTable;