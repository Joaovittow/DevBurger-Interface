import styled from 'styled-components';
import Select from 'react-select';
import TableHead from '@mui/material/TableHead';

export const StyledTableHead = styled(TableHead)`
  & .MuiTableCell-root {
    padding: 16px;
    background-color: ${(props) => props.theme.secondBlack};
    color: ${(props) => props.theme.white};
    border-bottom: 1px solid ${(props) => props.theme.lightGray};
    font-weight: 500;
  }

  & .MuiTableCell-root:first-child {
    border-top-left-radius: 20px;
  }

  & .MuiTableCell-root:last-child {
    border-top-right-radius: 20px;
  }
`;

export const ProductImage = styled.img`
    height: 80px;
    padding: 12px;
    border-radius: 16px;
`;

export const SelectStatus = styled(Select)`
    width: 240px:
`;

export const Filter = styled.div`
    display: flex;
    justify-content: center;
    margin:28px 0;
    gap: 50px;
`;

export const FilterOption = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    color: ${(props) =>
      props.$isActiveStatus ? props.theme.purple : props.theme.darkGray};
    border-bottom: ${(props) =>
      props.$isActiveStatus ? `2px solid ${props.theme.purple}` : 'none'};
    font-size: 18px;
    line-height: 20px;
    padding-bottom: 5px;
`;
