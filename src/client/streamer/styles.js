import styled from 'styled-components'

export const Table = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);

    .row {
        margin: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;