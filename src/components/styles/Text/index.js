import styled, { css } from 'styled-components'


export const Text = styled.div`
  flex: 1 1 auto;
  display: flex;
  font-weight: 300;
  color: #555;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 5px;

  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    margin-left: 10px;
    font-weight: 500;
    color: ${props => props.theme.colors.primary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    ${props => props.theme?.rtl && css`
      margin-left: 0;
      margin-right: 10px;    
    `}
  }
`