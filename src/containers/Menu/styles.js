import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Background from '../../assets/background.svg';
import BannerHamburger from '../../assets/bannerHamburger.svg';

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: ${(props) => props.theme.secondWhite};

    background:linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('${Background}');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    min-height: 100vh;
    margin: 0;
`;

export const Banner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 480px;
    width: 100%;
    position: relative;

    background: url('${BannerHamburger}') no-repeat;
    background-size: cover;
    background-position: center;
    background-color: ${(props) => props.theme.mainBlack};

    h1{
        font-family: ${(props) => props.theme.roadRageFont};
        font-size: 80px;
        line-height: 65px;
        color: ${(props) => props.theme.white};
        position: absolute;
        right: 20%;
        top: 30%;

        span{
            display: block;
            color: ${(props) => props.theme.white};
            font-size: 20px
        }
    }
    `;

export const CategoryMenu = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-top: 40px;
    margin-bottom: 40px;
`;

export const CategoryButton = styled(Link)`
    text-decoration: none;
    cursor: pointer;
    background: none;
    color: ${(props) => (props.$isActiveCategory ? (props) => props.theme.purple : '#696969')};
    font-size: 24px;
    font-weight: 500;
    padding-bottom: 5px;
    line-height: 20px;
    border: none;
    border-bottom: ${(props) => props.$isActiveCategory && `3px solid ${(props) => props.theme.purple}`};

`;

export const ProductsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 60px;
    padding: 40px;
    justify-content: center;
    max-width: 1280px;
    margin: 50px auto 0;
`;
