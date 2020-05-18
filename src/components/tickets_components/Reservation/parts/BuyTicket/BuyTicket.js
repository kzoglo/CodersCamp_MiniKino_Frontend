import React, { Component } from 'react';

import timeout from '../../../../../services/timeout';
import redirectError from '../../../../../services/errors handling/redirectError';
import {
  handleErrors,
  errorTexts,
} from '../../../../../services/errors handling/handleErrors';
import { getAnyItem as getToken } from '../../../../../services/localStorage';
import baseFetch from '../../../../../services/apis/baseFetch';
import { isEqual, isInequal } from '../../../../../services/predicates';
import LoadingSpinner from '../../../../low-level_components/LoadingSpinner/LoadingSpinner';
import {
  startLoading,
  finishLoading,
  enableElement as enableBtn,
  disableElement as disableBtn,
} from '../../../../../assistive functions';
import Select from '../../../../low-level_components/Select/Select';
import { SubmitBtn as ReservationBtn } from '../../../../low-level_components/SubmitBtn/SubmitBtn';
import {
  getAllSeats,
  dateTitleProp,
  dateFormat,
  restartRowAndSeatUI,
  setTakenSeats,
} from './parts/assistiveFunctions';

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
    if (isInequal(this.state.screening_id, null)) {
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
                rowsList: this.state.rowsWithSeats.map(({ row }) => row),
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

    this.setAnyState({ rowsWithSeats });
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
    this.checkReservationAttempt(
      err.message,
      this.afterSubmitInfoRef.current,
      ['validSubmit'],
      ['invalidSubmit'],
      3000
    );
  };

  makeNewReservation = async () => {
    try {
      // Checks if meanwhile another user haven't made the same reservation
      if (await this.checkConcurrentReservation())
        throw new Error(errorTexts.concurrentReserv);

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

      this.checkReservationAttempt(
        'Zarezerwowano',
        this.afterSubmitInfoRef.current,
        ['invalidSubmit'],
        ['validSubmit'],
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
    finishLoading(this.reservationSpinnerRef.current);
    enableBtn(
      this.reservationBtnRef.current,
      ['cursor-pointer'],
      ['cursor-auto']
    );
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

    this.setAnyState({ screening_id }, async () => {
      this.getScreeningData();
    });
  };

  handleRowOptionChange = () => {
    let choosenRow = Number(this.selectRowRef.current.value);
    let freeSeats;

    // Validation of a choosen row
    if (isInequal(choosenRow.toString(), 'NaN')) {
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
      });
    });
  };

  handleSeatOptionChange = (e) => {
    const choosenSeat = Number(this.selectSeatRef.current.value);
    this.setAnyState({ choosenSeat });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    // Checks if user checked all required fields
    if (
      isEqual(this.state.choosenRow, null) ||
      isEqual(this.state.choosenSeat, null) ||
      isEqual(this.state.screening_id, null)
    ) {
      this.checkReservationAttempt(
        'Musisz dokonać wyboru',
        this.afterSubmitInfoRef.current,
        ['validSubmit'],
        ['invalidSubmit'],
        1500
      );
    } else {
      disableBtn(
        this.reservationBtnRef.current,
        ['cursor-auto'],
        ['cursor-pointer']
      );
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

  /* Render */
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="buyTicket-wrapper">
          <Select
            classes="data-select"
            labelText="Wybierz datę seansu:"
            optionTitle={dateTitleProp()}
            spinner={<LoadingSpinner reference={this.loadingSpinnerRef} />}
            data={this.state.screenings}
            optionContent={(screening) => dateFormat(screening.time)}
            optionValue={(screening) => screening._id}
            handler={this.handleDateOptionChange}
            reference={this.selectDateRef}
          />

          <label>Sala: {this.state.room}</label>

          <Select
            selectName="row"
            classes="row-select"
            labelText="Rząd:"
            optionTitle="Wybierz rząd"
            data={this.state.rowsList}
            optionContent={(rowNum) => rowNum}
            optionValue={(rowNum) => rowNum}
            handler={this.handleRowOptionChange}
            reference={this.selectRowRef}
          />

          <Select
            selectName="seat"
            classes="seat-select"
            labelText="Miejsce:"
            optionTitle="Wybierz miejsce"
            data={this.state.freeSeats}
            optionContent={(free) => free}
            optionValue={(free) => free}
            handler={this.handleSeatOptionChange}
            reference={this.selectSeatRef}
          />

          <ReservationBtn
            btnText="Zarezerwuj"
            classes="reservationBtn cursor-pointer"
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

          <p className="afterSubmit invisible" ref={this.afterSubmitInfoRef}>
            {this.state.afterSubmitInfo}
          </p>
        </div>
      </form>
    );
  }
}

export default BuyTicket;
