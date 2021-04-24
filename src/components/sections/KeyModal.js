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

const KeyModal = ({
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

    const [keyName, setKeyName] = useState('');
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

    const setKeyText = (name) => {
        setKeyName(name);
    }

    const reset = () => {
        setKeyName('');
    }

    const generateKey = () => {
        var data = new FormData();
        data.append('name', keyName);
        data.append('apiKey', 'bdOz4lykCPZOnMf');
        axios.post('https://axonn.xyz/api/keys/create/', data)
            .then((res) => {
                reset();
                props. closeKeyModal();
            })
            .catch((error) => {
                console.warn(JSON.stringify(error));
            });
    }

    return (
        <div className="container" style={{ zIndex: 2 }}>
            <div className={innerClasses} style={{ borderRadius: 20 }}>
                <div className="cta-slogan">
                    <h3 className="m-0">
                        Create New Key
                    </h3>
                </div>
                <div className="cta-action">
                    <p style={{ color: 'white' }}>
                        Enter Key Name
                </p>
                    <Input style={{ borderRadius: 5 }} value={keyName} onChange={e => setKeyText(e.target.value)} id="newsletter" type="email" label="Subscribe" labelHidden placeholder="Enter your URL" />
                    <div
                        style={{ marginTop: 30, borderRadius: 5, backgroundColor: '#ECEDED', color: '#7227ED' }}
                        className="button button-primary button-wide-mobile button-sm"
                        onClick={() => generateKey()}>
                        Generate
                </div>
                </div>
            </div>
        </div>
    );
}

KeyModal.propTypes = propTypes;
KeyModal.defaultProps = defaultProps;

export default KeyModal;