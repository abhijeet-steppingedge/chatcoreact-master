import styled, { css } from 'styled-components'

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

export const WrappMap = styled.div`
  flex: 1;
  ${props => props.theme?.rtl ? css`
    margin-right: 5px;
  ` : css`
    margin-left: 5px;
  `}

  h4 {
    margin-bottom: 0px;
  }
`

export const Map = styled.div`
  font-size: 100%;
  img {
    width: 100%;
    height:auto;
    display: block;
    -webkit-user-drag: none;
    aspect-ratio: attr(width) / attr(height);

    @media (min-width: 900px) {
      width: 50%;
    }
  }

`

export const Text = styled.div`
  width: 100%;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;

  a {
    cursor: pointer;
    color: ${props => props.theme.colors.primary};
    font-size: 12px;
    font-weight: 600;

    ${props => props.theme?.rtl ? css`
      margin-right: 10px;
    ` : css`
      margin-left: 10px;
    `}
  }

  @media (min-width: 768px) {
    margin-bottom: 0px;
    width: 230px;
    flex-direction: column;
    align-items: initial;

    a {
      ${props => props.theme?.rtl ? css`
        margin-right: 0px;
      ` : css`
        margin-left: 0px;
      `}
    }
  }
`
