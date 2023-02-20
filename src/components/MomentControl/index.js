import React, { useEffect, useState } from 'react'
import moment from 'moment'
import BiRadioCircleMarked from '@meronex/icons/bi/BiRadioCircleMarked';
import BiRadioCircle from '@meronex/icons/bi/BiRadioCircle';
import { useLanguage, useUtils, useOrder, useConfig, useEvent } from 'ordering-components'
import { MomentOption } from '../../controllers/MomentOption'
import { Days, Day, DayName, DayNumber, ContentDay, Hours, Hour, Title, MomentContainer, Section } from './styles'
import { useTheme, useWindowSize } from 'ordering-ui'
import { Modal } from '../Modal'
import CustomModal from '../CustomModal/Modal'
import FaRegClock from '@meronex/icons/fa/FaRegClock'
import { useDispatch, useSelector } from 'react-redux'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'
dayjs.extend(isSameOrAfter)
dayjs.extend(utc)

const MomentControlUI = (props) => {
  const {
    isAsap,
    datesList,
    hoursList,
    dateSelected,
    timeSelected,
    handleAsap,
    handleChangeDate,
    handleChangeTime,
    business,
    setSelectedMenu,
    selectedMenu,
    isCustomStyle,
    setModalIsOpen,
    modalIsOpen,
    disableOnClickMoment,
    isModalBehavior
  } = props

  const shop = useSelector(state => state.shop);
  const dispatch = useDispatch()
  const [{ configs }] = useConfig()
  const [{ parseTime, parseDate }] = useUtils()
  const [, t] = useLanguage()
  const windowSize = useWindowSize()
  const [orderState] = useOrder()
  const [{ options }] = useOrder()
  const theme = useTheme()
  const [menusModalIsOpen, setMenusModalIsOpen] = useState(false)
  const [formattedTime, setFormattedTime] = useState('')
  const [estimatedTime, setEstimatedTime] = useState('')
  const [refresh, setRefresh] = useState(false)
  const [events] = useEvent();




  const Content = () => {
    return (
      <>
        <Title>{t('SELECT_A_DELIVERY_DATE', 'Select a Delivery Date')}</Title>
        <Days name='days'>
          {
            datesList.slice(0, Number(configs?.max_days_preorder?.value || 6, 10)).map(date => {
              const dateParts = date.split('-')
              const _date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
              const dayName = t('DAY' + (_date.getDay() >= 1 ? _date.getDay() : 7)).substring(0, 3).toUpperCase()
              const dayNumber = (_date.getDate() < 10 ? '0' : '') + _date.getDate()
              return (
                <Day key={dayNumber} selected={dateSelected === date} onClick={() => handleChangeDate(date)}>
                  <ContentDay className='content-day'>
                    <DayName>{dayName}</DayName>
                    <DayNumber>{dayNumber}</DayNumber>
                  </ContentDay>
                </Day>
              )
            })
          }
        </Days>
        <Title>{t('DESIRED_DELIVERY_TIME', 'Desired Delivery Time')}</Title>
        <Hours name='hours'>
          <Hour
            selected={isAsap}
            onClick={() => !orderState.loading && handleAsap()}
            isLoading={orderState?.loading}
          >
            {windowSize.width > 410 ? (
              t('ASAP', 'As soon as possible')
            ) : (
              t('ASAP_ABBREVIATION', 'ASAP')
            )}
          </Hour>
          {
            hoursList.map((hour, i) => (
              <Hour
                key={i}
                selected={timeSelected === hour.startTime}
                onClick={() => !orderState.loading && handleChangeTime(hour.startTime)}
                isLoading={orderState?.loading}
              >
                {configs?.format_time?.value === '12' ? (
                  hour.startTime.includes('12')
                    ? `${hour.startTime}PM`
                    : parseTime(moment(hour.startTime, 'HH:mm'), { outputFormat: 'hh:mma' })
                ) : (
                  parseTime(moment(hour.startTime, 'HH:mm'), { outputFormat: 'HH:mm' })
                )}
              </Hour>
            ))
          }
        </Hours>
      </>
    )
  }


  const convertH2M = (timeInHour) => {
    if (timeInHour) {
      var timeParts = timeInHour.split(":");
      return Number(timeParts[0]) * 60 + Number(timeParts[1]);
    }
    return 0;
  }
  const formatCurrentTime = () => {
    const isToday = dateSelected === dayjs().format('YYYY-MM-DD')
    if (isToday) {
      let currentTime = moment();
      let hours = orderState.options.type == 2 ? business?.pickup_time : business?.delivery_time;
      let minToAdd = convertH2M(hours)
      // let formatted = currentTime.add(minToAdd, 'minutes');
      if (minToAdd && (options.type == 1 || options.type == 2)) setFormattedTime(` (${moment().format(configs?.format_time?.value === '12' ? 'hh:mm A' : 'HH:mm A')} +${minToAdd} Min)`);
      setTimeout(() => {
        setRefresh(!refresh)
      }, 60000);
    } else {
      setFormattedTime(``);
    }
  }


  // const onClickMoment = () => {
  //   if (business?.menus && business?.menus?.length === 1) {
  //     onClickMenu(business?.menus[0])
  //     setModalIsOpen(true);
  //   } else {
  //     setMenusModalIsOpen(true)
  //   }
  // }

  // const onClickMenu = (menu) => {
  //   setSelectedMenu(menu)
  //   dispatch({ type: 'ADD_MENU', payload: menu })
  //   setModalIsOpen(true)
  // }

  const handleCloseModal = () => {
    setModalIsOpen(false)
  }

  useEffect(() => {
    formatCurrentTime();
  }, [refresh, business, dateSelected])

  return (
    <div id='moment_control' style={{ cursor: 'pointer', justifyContent: 'center', fontSize: windowSize.width < 410 ? 13 : 15, }}>
      {
        props.beforeElements?.map((BeforeElement, i) => (
          <React.Fragment key={i}>
            {BeforeElement}
          </React.Fragment>))
      }
      {
        props.beforeComponents?.map((BeforeComponent, i) => (
          <BeforeComponent key={i} {...props} />))
      }
      {
        isModalBehavior && (
          <MomentContainer isCustomStyle={isCustomStyle} onClick={() => {
            if (!disableOnClickMoment)
              setModalIsOpen(true)
            try {
              document.getElementById('cat-container').style.zIndex = "-1";
              document.getElementById('search-bar-id').style.zIndex = "0";
              document.getElementById('search-bar-id').style.position = "relative";
            } catch (error) {
              console.log('error', error)
            }
          }
          } style={{ justifyContent: 'center', cursor: disableOnClickMoment ? 'default' : 'pointer', }}>
            <FaRegClock id='icon' />
            {orderState?.options?.moment
              ? parseDate(orderState?.options?.moment, { outputFormat: configs?.dates_moment_format?.value })
              : t('ASAP_ABBREVIATION', 'ASAP') + formattedTime}
          </MomentContainer>
        )
      }
      {isModalBehavior ? (
        modalIsOpen && <CustomModal
          setOpenModal={setModalIsOpen}
        >
          <Content />
        </CustomModal>
        // <Modal
        //   open={modalIsOpen}
        //   onClose={() => setModalIsOpen(false)}
        //   width='70%'
        // >
        //   <Content />
        // </Modal>
      ) : (
        <Content />
      )
      }

      {/* <Modal
        open={menusModalIsOpen}
        onClose={() => setMenusModalIsOpen(false)}
        width='70%'
        padding={'30px'}
      >
        <>
          <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>{t('SELECT_MENU', 'Please Select a menu first!')}</div>
          {(business?.menus && business?.menus?.length > 0) ?
            (business?.menus && business?.menus?.map(menu => (
              <>
                <div key={`${menu?.id}-menu`}>
                  <div style={{ display: 'flex', flexDirection: 'row', cursor: 'pointer' }} onClick={() => onClickMenu(menu)}>
                    {(selectedMenu && selectedMenu?.id == menu.id) ? (
                      <Section>
                        <BiRadioCircleMarked />
                        <div style={{ fontSize: '18px' }}>{menu.name}</div>
                      </Section>
                    )
                      :
                      (
                        <Section>
                          <BiRadioCircle />
                          <div style={{ fontSize: '18px' }}>{menu.name}</div>
                        </Section>
                      )
                    }
                  </div>
                </div>
              </>
            )))
            :
            (
              <div style={{ fontSize: '15px', fontWeight: 'bolder' }}>Sorry, no menus to select from</div>
            )
          }
        </>
      </Modal> */}
      {
        props.afterComponents?.map((AfterComponent, i) => (
          <AfterComponent key={i} {...props} />))
      }
      {
        props.afterElements?.map((AfterElement, i) => (
          <React.Fragment key={i}>
            {AfterElement}
          </React.Fragment>))
      }
    </div >
  )
}

export const MomentControl = (props) => {
  const [{ configs }] = useConfig()
  const limitDays = parseInt(configs?.max_days_preorder?.value, 10)
  const currentDate = new Date()
  const time = limitDays > 1
    ? currentDate.getTime() + ((limitDays - 1) * 24 * 60 * 60 * 1000)
    : limitDays === 1 ? currentDate.getTime() : currentDate.getTime() + (6 * 24 * 60 * 60 * 1000)

  currentDate.setTime(time)
  currentDate.setHours(23)
  currentDate.setMinutes(59)
  const dateProps = {
    maxDate: currentDate
  }

  const momentProps = {
    ...props,
    ...dateProps,
    UIComponent: MomentControlUI
  }
  return <MomentOption {...momentProps} />
}
