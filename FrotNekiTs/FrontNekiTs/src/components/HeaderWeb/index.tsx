import React, { useEffect } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo-Neki.png';

const HeaderWeb: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
       
    }, []);

    return (
        <div className='corpo'>
            <img width={'70px'} height={'70px'} src={Logo} alt="Logo" />
        </div>
    );
};

export default HeaderWeb;