import React, { Component } from 'react';

import timeout from '../../../../../services/timeout';
import redirectError from '../../../../../services/errors handling/redirectError';
import { handleErrors } from '../../../../../services/errors handling/handleErrors';
import { getItem as getToken } from '../../../../../services/localStorage';
import baseFetch from '../../../../../services/API/v1/baseFetch';
import { isEqual } from '../../../../../services/predicates';
import LoadingSpinner from '../../../../low-level components/LoadingSpinner/LoadingSpinner';
import {
  startLoading,
  finishLoading,
  enableElement as enableBtn,
  disableElement as disableBtn,
} from '../../../../../assistive functions';
import Select from '../../../../low-level components/Select/Select';
import { SubmitBtn as ReservationBtn } from '../../../../low-level components/SubmitBtn/SubmitBtn';
import {
  getAllSeats,
  dateTitleProp,
  dateFormat,
  restartRowAndSeatUI,
  setTakenSeats,
} from './parts/assistiveFunctions';

/*** Variables ***/
const classes = {
  invalidSubmit: 'invalidSubmit',
  validSubmit: 'validSubmit',
  cursorAuto: 'cursor-auto',
  cursorPointer: 'cursor-pointer',
};

/*** Component ***/
class BuyTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie_id: null,
      user_id: this.props.user_id,
      screenings: [],
      screening_id: null,
      room: '',
      room_id: null,
      rowsList: [],
      rowsWithSeats: [],
      immutableRows: [],
      reservationDone: false,
      takenSeats: [],
      freeSeats: [],
      choosenRow: null,
      choosenSeat: null,
      seat_id: '',
      afterSubmitInfo: '',
      reservation: {},
    };
    this.selectDateRef = React.createRef();
    this.selectRowRef = React.createRef();
    this.selectSeatRef = React.createRef();
    this.afterSubmitInfoRef = React.createRef();
    this.loadingSpinnerRef = React.createRef();
    this.reservationSpinnerRef = React.createRef();
    this.reservationBtnRef = React.createRef();
  }

  /* Lifecycle Methods*/
  async componentDidMount() {
    startLoading(this.loadingSpinnerRef.current);
    let screenings;
    try {
      const resp = await baseFetch({
        path: `api/screening/${this.props.movie_id}/${this.props.screening_id}`,
        authToken: getToken('token'),
      });

      handleErrors(resp.status);
      screenings = await resp.json();
    } catch (err) {
      redirectError(this.props.history, err);
    }

    this.setAnyState(
      {
        screenings,
      },
      () => {
        finishLoading(this.loadingSpinnerRef.current);
      }
    );
  }

  /* Assistive Methods */
  setAnyState = (receivedState, cb) => {
    const newState = Object.assign(
      {},
      {
        ...this.state,
      },
      receivedState
    );
    this.setState(newState, cb);
  };

  setRowsList = () => {
    return this.state.rowsWithSeats
      .map(({ row, seats }) => {
        const isRowNotEmpty = !seats.every((seat) => isEqual(seat, null));
        if (isRowNotEmpty) return row;
      })
      .filter((row) => row);
  };

  checkAvailableSeats = async (cb) => {
    let existingReservations;
    try {
      const resp = await baseFetch({
        path: `api/reservation/none/${this.state.screening_id}`,
        authToken: getToken('token'),
      });

      handleErrors(resp.status);

      existingReservations = await resp.json();
    } catch (err) {
      redirectError(this.props.history, err);
    }

    this.setAnyState(
      { takenSeats: setTakenSeats(existingReservations) },
      async () => {
        await this.calculateFreeSeats();
        cb();
      }
    );
  };

  getScreeningData = async () => {
    if (!isEqual(this.state.screening_id, null)) {
      startLoading(this.loadingSpinnerRef.current);

      let screening;
      try {
        const resp = await baseFetch({
          path: `api/screening/${this.state.movie_id}/${this.state.screening_id}`,
          authToken: getToken('token'),
        });

        handleErrors(resp.status);

        screening = await resp.json();
      } catch (err) {
        redirectError(this.props.history, err);
      }

      const setNewState = () => {
        this.setAnyState(
          {
            ...restartRowAndSeatUI(),
          },
          () => {
            this.setAnyState(
              {
                room: screening.room_id.name,
                rowsList: this.setRowsList(),
              },
              () => {
                finishLoading(this.loadingSpinnerRef.current);
              }
            );
          }
        );
      };

      const room_id = screening.room_id._id;
      this.setAnyState(
        {
          room_id,
        },
        async () => {
          await this.checkAvailableSeats(setNewState);
        }
      );
    } else {
      this.setAnyState({
        ...restartRowAndSeatUI(),
        room: '',
        room_id: '',
      });
    }
  };

  afterReservationUserInfo = (element, classToDel, classToAdd, time) => {
    startLoading(element, classToDel, classToAdd);

    timeout(() => {
      this.setAnyState({ afterSubmitInfo: '' }, () => {
        finishLoading(element);
        this.enableReservation();
      });
    }, time);
  };

  checkReservationAttempt = (
    message,
    element,
    classToDel,
    classToAdd,
    time
  ) => {
    this.setAnyState(
      {
        afterSubmitInfo: message,
      },
      () => {
        this.afterReservationUserInfo(element, classToDel, classToAdd, time);
      }
    );
  };

  calculateFreeSeats = async () => {
    let rowsWithSeats = await getAllSeats(
      this.state.room_id,
      this.props.history
    );

    // Computes which seats are free
    rowsWithSeats.forEach(({ row, seats }, index) => {
      this.state.takenSeats.forEach(({ row: takenRow, seats: takenSeat }) => {
        if (isEqual(takenRow, row)) {
          seats.forEach((seat) => {
            if (isEqual(seat, takenSeat)) {
              delete rowsWithSeats[index].seats[
                rowsWithSeats[index].seats.indexOf(seat)
              ];
            }
          });
        }
      });
    });

    this.setAnyState({ rowsWithSeats }, () => {
      this.setState({
        rowsList: this.setRowsList(),
      });
    });
  };

  checkConcurrentReservation = async () => {
    let existingReservations;

    try {
      const resp = await baseFetch({
        path: `api/reservation/none/${this.state.screening_id}`,
        authToken: getToken('token'),
      });

      handleErrors(resp.status);
      existingReservations = await resp.json();
    } catch (err) {
      redirectError(this.props.history, err);
    }

    const takenSeats = setTakenSeats(existingReservations);
    const seat = {
      row: this.state.choosenRow,
      seats: this.state.choosenSeat,
    };

    const wasConcurrentReservationMade = takenSeats.some((rowObj) => {
      return isEqual(rowObj.row, seat.row) && isEqual(rowObj.seats, seat.seats);
    });

    return wasConcurrentReservationMade;
  };

  reservationServerError = (err) => {
    const { validSubmit, invalidSubmit } = classes;
    this.checkReservationAttempt(
      err.message,
      this.afterSubmitInfoRef.current,
      [validSubmit],
      [invalidSubmit],
      3000
    );
  };

  makeNewReservation = async () => {
    try {
      // Checks if meanwhile another user haven't made the same reservation
      if (await this.checkConcurrentReservation()) {
        handleErrors(404, { concurrentReserv: true });
      }
      const reservationParams = {
        user_id: this.state.user_id,
        seat_id: this.state.seat_id,
        screening_id: this.state.screening_id,
      };

      const { status: reservStatus } = await baseFetch({
        path: 'api/reservation/',
        authToken: getToken('token'),
        method: 'POST',
        body: JSON.stringify(reservationParams),
      });

      handleErrors(reservStatus);

      const { validSubmit, invalidSubmit } = classes;
      this.checkReservationAttempt(
        'Zarezerwowano',
        this.afterSubmitInfoRef.current,
        [invalidSubmit],
        [validSubmit],
        3000
      );

      // Recalculates seats, after successful reservation
      const setStateAfterNewReserv = () => {
        const freeSeats = this.state.rowsWithSeats[this.state.choosenRow - 1]
          .seats;
        this.setAnyState(
          {
            freeSeats,
            choosenSeat: null,
          },
          () => {
            if (this.state.freeSeats.every((seat) => isEqual(seat, null)))
              this.handleRowOptionChange();
            this.enableReservation();
          }
        );
      };

      this.checkAvailableSeats(setStateAfterNewReserv);
    } catch (err) {
      this.reservationServerError(err);
    }
  };

  enableReservation = () => {
    const { cursorAuto, cursorPointer } = classes;
    finishLoading(this.reservationSpinnerRef.current);
    enableBtn(this.reservationBtnRef.current, [cursorPointer], [cursorAuto]);
  };

  /* Handlers */
  handleDateOptionChange = async (e) => {
    e.persist();

    const screening_id = isEqual(
      this.selectDateRef.current.value,
      dateTitleProp()
    )
      ? null
      : this.selectDateRef.current.value;

    this.setAnyState({ screening_id, afterSubmitInfo: '' }, async () => {
      this.getScreeningData();
    });
  };

  handleRowOptionChange = () => {
    let choosenRow = Number(this.selectRowRef.current.value);
    let freeSeats;

    // Validation of a choosen row
    if (!isEqual(choosenRow.toString(), 'NaN')) {
      freeSeats = this.state.rowsWithSeats[choosenRow - 1].seats;
    } else {
      choosenRow = null;
      freeSeats = [];
    }

    this.setAnyState({ freeSeats: [] }, () => {
      this.setAnyState({
        freeSeats,
        choosenRow,
        choosenSeat: null,
        afterSubmitInfo: '',
      });
    });
  };

  handleSeatOptionChange = (e) => {
    const choosenSeat = Number(this.selectSeatRef.current.value);
    this.setAnyState({ choosenSeat, afterSubmitInfo: '' });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    // Checks if user checked all required fields
    if (
      isEqual(this.state.choosenRow, null) ||
      isEqual(this.state.choosenSeat, null) ||
      isEqual(this.state.screening_id, null)
    ) {
      const { validSubmit, invalidSubmit } = classes;
      this.checkReservationAttempt(
        'Musisz dokonać wyboru',
        this.afterSubmitInfoRef.current,
        [validSubmit],
        [invalidSubmit],
        1500
      );
    } else {
      const { cursorAuto, cursorPointer } = classes;
      disableBtn(this.reservationBtnRef.current, [cursorAuto], [cursorPointer]);
      startLoading(this.reservationSpinnerRef.current);

      try {
        // Fetches seat which is to be booked
        const resp = await baseFetch({
          path: `api/seat/${this.state.room_id}/${this.state.choosenRow}/${this.state.choosenSeat}`,
          authToken: getToken('token'),
        });

        handleErrors(resp.status);
        const { _id: seat_id } = await resp.json();

        // Makes new reservation
        this.setAnyState({ seat_id }, this.makeNewReservation);
      } catch (err) {
        this.reservationServerError(err);
      }
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='buyTicket-wrapper'>
          <Select
            classes='data-select'
            labelTextProp='Wybierz datę seansu:'
            optionTitleProp={dateTitleProp()}
            spinnerComp={<LoadingSpinner reference={this.loadingSpinnerRef} />}
            dataArr={this.state.screenings}
            optionContentFunc={(screening) => dateFormat(screening.time)}
            optionValueFunc={(screening) => screening._id}
            handlerFunc={this.handleDateOptionChange}
            reference={this.selectDateRef}
          />

          <label>Sala: {this.state.room}</label>

          <Select
            selectNameProp='row'
            classes='row-select'
            labelTextProp='Rząd:'
            optionTitleProp='Wybierz rząd'
            dataArr={this.state.rowsList}
            optionContentFunc={(rowNum) => rowNum}
            optionValueFunc={(rowNum) => rowNum}
            handlerFunc={this.handleRowOptionChange}
            reference={this.selectRowRef}
          />

          <Select
            selectNameProp='seat'
            classes='seat-select'
            labelTextProp='Miejsce:'
            optionTitleProp='Wybierz miejsce'
            dataArr={this.state.freeSeats}
            optionContentFunc={(free) => free}
            optionValueFunc={(free) => free}
            handlerFunc={this.handleSeatOptionChange}
            reference={this.selectSeatRef}
          />

          <ReservationBtn
            btnText='Zarezerwuj'
            classes={`reservationBtn ${classes.cursorPointer}`}
            reference={this.reservationBtnRef}
          >
            <LoadingSpinner
              reference={this.reservationSpinnerRef}
              classes={{
                outerWrapper: 'reservSpinner-outerWrapper',
                spinner: 'reservSpinner',
              }}
            />
          </ReservationBtn>

          <p className='afterSubmit invisible' ref={this.afterSubmitInfoRef}>
            {this.state.afterSubmitInfo}
          </p>
        </div>
      </form>
    );
  }
}

export default BuyTicket;
