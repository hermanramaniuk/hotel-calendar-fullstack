import React from 'react';
import Booking from './Booking';
import RoomDate from './RoomDate';

/**
 * Render a single room, i.e. single row in a table
 * @param {*} props 
 */
function Room(props) {
    let combined;
    if (props.bookings[0] !== undefined) {
        combined = [].concat(props.bookings[0], props.bookings[1], props.bookings[2], props.bookings[3], props.bookings[4]);
    } else {
        combined = [];
    }
    
    let daysTd = props.dates.map((day, index) => {
        // get all booking for current day
        let bookinksToday = combined.filter(singleBook => {
            let date = new Date(singleBook['date']);
            return (date.toDateString() === day.toDateString() && singleBook['room_id'] === props.room.id) ? true : false;
        });

        // get all booking jsx code for current day
        let bookinksTodayJsx = bookinksToday.map(singleBook => {
            return <Booking book={singleBook} key={index} />;
        });

        return <RoomDate key={index} day={day} room={props.room} cellWidth={props.cellWidth}>{bookinksTodayJsx}</RoomDate>
    });

    return (<tr key={props.room.id}>
        <td><div>{props.room.name}</div></td>
        {daysTd}
    </tr>);

}

export default Room;