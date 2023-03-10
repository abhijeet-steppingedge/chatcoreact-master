import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: block;
  width: 95%;
  padding: 15px;
  @media (min-width: 450px) {
    width: 100%;
    padding:30px;
  }
`
export const Title = styled.div`
  display: flex;
  justify-content: left;
`

export const StatusImage = styled.div`
  display: flex;
  justify-content: left;

  image {
    object-fit: contain;
  }
`
export const OrderContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  border:2px solid #cccccc;
  padding:10px;

  &:last-child {
    margin-bottom: 0.9em;
  }
`
export const OrderItem = styled.div`
  display: flex;
  margin-bottom: 20px;

  .item-icon {
    display: flex;
    justify-content: left;
    align-items: left;
    margin-right: 20px;
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
    ${props => props.theme?.rtl && css`
        margin-left: 20px;
        margin-right: 0;
    `}

    .location-icon {
      font-size: 20px;
    }

    .clock-icon {
      font-size: 18px;
    }

    &.card-icon {
      svg {
        font-size: 22px;
      }
    }

  }

  .item-text {
    display: flex;
    justify-content: space-between;
    width:100%;
    font-weight:bold;
  }

  .business-logo {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.1));
    border-radius: 3px;
    img {
      width: 20px;
      height: 18px;
      border-radius: 2px;
    }
  }
`

export const CardItemContent = styled.div`
  display: flex;
  width: 90%;
`

export const PayCardSelected = styled.div`
  padding: 30px 0px 0px;
`
export const ModalActions = styled.div`
width: 100%;
justify-content: center;
text-align: center;
`