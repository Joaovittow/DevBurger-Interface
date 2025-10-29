import styled from 'styled-components';

export const ContainerButton = styled.button`
    background-color: ${(props) => props.theme.purple};
    border: none;
    width: 100%;
    height: 52px;
    border-radius: 5px;
    font-size: 30px;
    color: ${(props) => props.theme.white};

    &:hover {
      background-color: ${(props) => props.theme.secondDarkPurple};
    }
`;
