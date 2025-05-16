import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
    .carousel-item{
    padding-right: 40px;
    padding-left: 40px;}

`;

export const Title = styled.h2`
    font-size: 32px;
    font-weight: 800;
    color: #9758a6;
    padding-bottom: 12px;
    position: relative;
    text-align: center;
    margin-bottom: 40px;
    margin-top: 20px;

    &::after{
        content: '';
        position: absolute;
        width: 56px;
        height: 4px;
        background-color: #9758a6;
        bottom: 0;
        left: calc(50% - 28px);
    }
`;

export const ContainerItems = styled.div`
    background: url('${(props) => props.imageUrl}');
    background-size: cover;
    background-position: center;
    border-radius: 20px;
    cursor: grab;

    display: flex;
    align-items: center;
    padding: 20px 10px;
    width: 100%;
    height: 250px;

    p{

    }
`;

export const CategoryButton = styled(Link)`
    text-decoration: none;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 10px 30px;
    border-radius: 30px;
    font-size: 22.5px;
    font-weight: 500;
    margin-top: 30%;

    &:hover{
        background-color: #9758a6;
    }
    `;
