import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Input from '../elements/Input';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Cta from './Cta'

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
  const [inputModal, setInputModal] = useState(true);

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
    axios.get('http://139.179.206.45:8080/api/all/')
      .then((res) => {
        setUrlList(res.data)
      })
      .catch((error) => {
        console.warn(JSON.stringify(error));
      });
  }, [])

  const deleteEntry = (index) => {
    var data = new FormData();
    data.append('name', urlList[index].name);
    axios.post('http://139.179.206.45:8080/api/delete/', data)
      .then((res) => {
        let newUrlList = [...urlList];
        newUrlList.splice(index, 1);
        setUrlList(newUrlList);
      })
      .catch((error) => {
        console.warn(JSON.stringify(error));
      });
  }

  const handleClose = () => {
    setInputModal(false);
  }

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <Modal show={inputModal} onHide={handleClose} backdrop={false} centered={true} style={{background: 'none'}}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body><Cta/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
            </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
              </Button>
        </Modal.Footer>
      </Modal>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className={innerClasses} style={{ borderRadius: 20, minWidth: 1000 }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <div
              style={{ fontSize: 10, borderRadius: 5, backgroundColor: '#36AF4F', color: 'white' }}
              className="button button-primary button-wide-mobile button-sm"
              onClick={() => { setInputModal(true) }}>
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