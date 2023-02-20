import styled, { css } from 'styled-components'
import { lighten } from 'polished'

export const CartContainer = styled.div`
  border-bottom: 1px solid #F0F0F0;
`

export const CartSticky = styled.div`
  ${({ isCartOnProductsList }) => isCartOnProductsList && css`
    overflow-y: auto;
    max-height: 70vh;
    position: sticky;
    top: 20px;
  `}
`

export const OrderBill = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  background-color: #FFF;
  table {
    width: 100%;
    font-size: 16px;
    font-weight: 300;

    td span {
      unicode-bidi: bidi-override;
    }

    tr td:nth-child(2) {
      font-weight: 500;
      text-align: right;
      ${props => props.theme?.rtl && css`
        text-align: left;
    `}
    }
  }
  table.total {
    border-top: 1px solid #EAEAEA;
    padding-top: 10px;
    tr {
      td:nth-child(1) {
        font-weight: bold;
      }
      td:nth-child(2) {
        font-weight: bold;
        color: #D81212;
      }
    }
  }
  table.comments {
    margin-top: 20px;
    tr {
      td:nth-child(1) {
        font-weight: bold;
      }
    }
    textarea {
      width: 100%;
      box-sizing: border-box;
      border-radius: 7.6px;
      height: 77px;
      padding-right: 60px;
    }
  }

  @media (min-width: 411px) {
    table {
      font-size: 18px;
    }
  }
`

export const CouponContainer = styled.div`
  width: 100%;
  margin: 10px;
`

export const CheckoutAction = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
  button {
    padding: 10px 30px;
    width: 90%;
    &:disabled{
      opacity: 0.5;
      cursor: not-allowed
    }
  }
`

export const IconContainer = styled.div`
  position: relative;
  display: inline-flex;
  cursor: pointer;
  margin-left: 5px;
  top: ${props => props.top || '3px'};
`

export const Spinner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-20%, 15%);
`

export const CommentContainer = styled.td`
  position: relative;
  .spinner-content > div{
    width: 50px;
    height: 50px;
  }
`

export const Divider = styled.div`
  border-top: 1px solid #EAEAEA;
  margin-bottom: 10px;
`

export const SavedContainer = styled.span`
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.theme?.colors?.primaryContrast};
  background: ${props => lighten('0.2', props.theme?.colors?.primary)};
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`
export const ProductActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  padding: 20px 0px;
  width: 30%;
  z-index: 99;

  position: fixed;
  bottom: 0;
  right: 0;
  background-color: #FFF;

  div.incdec-control {
    justify-content: left;
    align-items: left;

    svg {
      width: 30px;
      height: 30px;
      cursor: pointer;
      margin-top:10px;
    }
  }
  div:last-child {
    width: 100%;
    display: flex;
    align-items: right;
  }

  button:disabled,
  button.disabled,
  svg.disabled {
    opacity: 0.5;
  }

  svg.disabled {
    pointer-events: none;
  }

  svg.icon {
    padding-top:6px;
  }

  button.add {
    padding: 5px 15px;
    margin: 10px 0px 0px;
    width: 91%;

    &.soldout {
      position: relative;
      pointer-events: none;
    }

    > span.total {
      ${props => props.theme?.rtl ? css`
        padding-right: 20px;
      ` : css`
        padding-left: 20px;
      `}
    }
  }

  @media (min-width: 577px) {
    flex-direction: row;

    div:last-child {
      width: 75%;
    }
    button.add {
      width: initial;
      margin: 0 10px;

      &.soldout {
        width: 100%;
      }
    }

    button {
      position: absolute;

      ${props => props.theme?.rtl ? css`
        left: 0px;
      ` : css`
        right: 0px;
      `}
    }
  }

  @media (min-width: 769px) {
    position: sticky;
    bottom: 0px;
    right: initial;
  }

  @media (min-width: 1201px) {
    padding: 10px 0px;

    div:last-child {
      width: 70%;
      button {
        width: 100%;
      }
    }
  }
`

export const SectionProduct = styled.div`
height: 80px;
width: 100%;
display: flex;
flex-direction: row;
z-index: 99;
margin:10px 0px;
border-bottom:1px solid #cccccc;
`;
export const ProductQuantity = styled.span`
  border-radius: 4px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 15px;
`


export const WarningMessage = styled.div`
  width: 100%;
  height: 150px;
  max-height: 300px;
  background-color: #F2BB40;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
  border-radius: 10px;
  position: relative;

  svg {
    position: absolute;
    font-size: 30px;
    top: 0;
    left: 0;
    margin: 11px;
    ${props => props.theme?.rtl && css`
        right: 0;
        left: initial;
    `}
  }

  h1 {
    font-size: 20px;
    margin: 0px 60px;
    text-align: center;
  }
`