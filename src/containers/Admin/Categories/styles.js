import styled from 'styled-components';
import TableHead from '@mui/material/TableHead';

export const Container = styled.div``;

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

export const CategoryImage = styled.img`
height: 80px;
padding: 12px;
border-radius: 16px;
`;

export const EditButton = styled.button`
border: 0;
background-color:${(props) => props.theme.darkWhite} ;
height: 32px;
width: 32px;
border-radius: 8px;
margin: 0 auto;

display: flex;
align-items: center;
justify-content: center;

&:hover{
    background-color: ${(props) => props.theme.purple} ;

    svg{
        fill:${(props) => props.theme.darkWhite} ;

    }
}

`;

export const DeleteButton = styled.button`
border: 0;
background-color:${(props) => props.theme.darkWhite} ;
height: 32px;
width: 32px;
border-radius: 8px;
margin: 0 auto;

display: flex;
align-items: center;
justify-content: center;

&:hover{
    background-color: #cf3057 ;

    svg{
        fill:${(props) => props.theme.darkWhite} ;

    }
}

`;

