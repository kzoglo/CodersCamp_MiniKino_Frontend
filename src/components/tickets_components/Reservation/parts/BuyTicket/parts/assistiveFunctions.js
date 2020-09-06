import { isEqual } from '../../../../../../services/predicates';
import { handleErrors } from '../../../../../../services/errors handling/handleErrors';
import redirectError from '../../../../../../services/errors handling/redirectError';
import baseFetch from '../../../../../../services/apis/baseFetch';
import { getItem as getToken } from '../../../../../../services/localStorage';

/*** Assistive Functions ***/
export const dateTitleProp = () => {
  const title = 'Data i godzina';
  return title;
};

export const dateFormat = (time) => {
  return new Date(time).toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

export const getAllSeats = async (room_id, history) => {
  try {
    const resp = await baseFetch({
      path: `api/seat/${room_id}`,
      authToken: getToken('token'),
    });

    handleErrors(resp.status);
    const seats = await resp.json();

    let filtered = [];
    let rowNum = 0;
    let occuredRows = [];

    // Segregates seats in an organized structure
    seats.forEach(({ row, seatNumber }) => {
      if (!isEqual(rowNum, row) && !occuredRows.includes(row)) {
        rowNum = row;
        occuredRows.push(row);
        filtered.push({ row, seats: [seatNumber] });
      } else {
        filtered.forEach((elem) => {
          if (isEqual(elem.row, row)) elem.seats.push(seatNumber);
        });
      }
    });

    // Sorts seats structure in an ascending order
    filtered
      .sort((a, b) => a.row - b.row)
      .map(({ row, seats }) => {
        return { row, seats: seats.sort((a, b) => a - b) };
      });

    return filtered;
  } catch (err) {
    redirectError(history, err);
  }
};

export const setTakenSeats = (data = []) => {
  return data.map(({ seat_id: { row, seatNumber } }) => {
    return { row: row, seats: seatNumber };
  });
};

export const restartRowAndSeatUI = () => {
  return {
    choosenRow: null,
    choosenSeat: null,
    freeSeats: [],
    rowsList: [],
  };
};
