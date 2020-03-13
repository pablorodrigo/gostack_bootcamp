import styled from 'styled-components';

// example of creating your own component
export const Title = styled.h1`
    font-size: 20px;
    //control properties
    color: ${props => (props.error ? 'red' : '#7159c1')};
    font-family: Arial, Helvetica, sans-serif;

    small {
        font-size: 10px;
        color: #333;
    }
`;
