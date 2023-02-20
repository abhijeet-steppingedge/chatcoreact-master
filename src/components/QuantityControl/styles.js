import styled, { css } from 'styled-components'

export const Container = styled.div`

&.error {
  background-color: orange;
}
  display: flex;
  justify-content: right;
  padding: 0px 0px;
  margin-top:0px;
  margin-left: auto;
  div.incdec-control {
    background-color:${props => props.backgroundColor};
    border-radius: 50px;
    box-shadow: 0 3px 9px #eb593369;
    svg {
      width: 30px;
      height: 18px;
      cursor: pointer;
      margin-top:-3px;
    }
    svg path{
      fill: ${props => props.color};
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
    padding: 5px 0px;

    div:last-child {
      width: 70%;
      button {
        width: 100%;
      }
    }
  }
  @media (max-width: 450px) {
    div:last-child {
      width: 70%;
    }
  }
`



export const ProductQuantity = styled.span`
  background: ${props => props.theme.colors.primary};
  border-radius: 8px;
  width: 26px;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 7px 3px;
  color:${props => props.color}
`