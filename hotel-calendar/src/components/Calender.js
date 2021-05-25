import React, { Component } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import './../assets/styles/style.scss';
import { connect } from 'react-redux';
import { getDatas, getRooms } from '../actions/dataActions';
import PropTypes from 'prop-types';

import Room from './Room';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import CalendarContext from './CalendarContext';
import BookingHelper from '../helpers/BookingHelper';
import BookingPopup from './popups/BookingPopup';
import Select from 'react-select';


class Calender extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dates: [],
            cellWith: 50,
            popup: {
                show:false,
                booking:null
            },
            filterStatus:"rooms",
            viewStartDate: this.props.viewStartDate ? this.props.viewStartDate : null,
            selectedRoomType: 0,
            options: [
                { value: 0, label: 'Type 1' },
                { value: 1, label: 'Type 2' },
            ],
        }
        // this.actionMoveBooking = this.actionMoveBooking.bind(this);
        this.actionOpenPopup = this.actionOpenPopup.bind(this);
        this.actionClosePopup = this.actionClosePopup.bind(this);
        this.actionCanExistBooking = this.actionCanExistBooking.bind(this);
        this.actionCreateBooking = this.actionCreateBooking.bind(this);
    }

    componentDidMount() {
        this.fillupDates();
        this.props.getRooms();
        this.props.getDatas({ type: 0 });
    }

    /**
     * Fill up dates in component state
     **/
    fillupDates() {        
        let day = new Date();
        if (this.state.viewStartDate != null) {
            day = new Date(this.state.viewStartDate);
        }
        this.state.dates.push(new Date(day.setDate(day.getDate())));
        for (let aa = 0; aa < 30; aa++) {
            let newDay = new Date(day.setDate(day.getDate() + 1));
            this.state.dates.push(newDay);
        }

        this.setState(oldState => {
            return this.state;
        });
    }

    handleType = (option) => {
        const { getDatas } = this.props;
        // const { options } = this.state;
        this.setState({ selectedRoomType: option.value });
        getDatas({ type: option.value });
    };

    /**
     * Render thead of the calendar table
     */
    renderHeaderDate() {
        let datesHtml = this.state.dates.map((date) => {

            // @todo move it to common helper
            Date.locale = {
                en: {
                    month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    week_day_names: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                }
            };

            return <th key={date.getTime()} className='date-table-header'>
                <div className="r-calendar-head-month">{Date.locale.en.week_day_names[date.getDay()]} <span className="r-calendar-head-date">{date.getDate()}</span></div>
            </th>;  
        })

        return <thead>
            <tr>
                <th className="select-room-type">
                    <Select 
                        options={this.state.options}
                        value={this.state.options.filter(option => option.value === this.state.selectedRoomType)} autoFocus={true} 
                        onChange={(option) => this.handleType(option)}
                    />
                </th>
                {datesHtml}
            </tr>
        </thead>;

    }

    /**
     * Render room component
     * @param {} room 
     */
    renderRooms(room) {
        return <Room key={room['id']} room={room} bookings={this.props.datas} dates={this.state.dates} cellWith={this.state.cellWith}></Room>;
    }

    /**
     * Render tbody part of calendar table
     */
    renderTableBody(rooms) {
        let typeRooms = rooms.filter(room => {
            return (room['type'] === this.state.selectedRoomType) ? true : false;
        });
        let body = typeRooms.map(room => {
            return this.renderRooms(room);
        });

        return <tbody>
            {body}
        </tbody>;
    }

    /**
     * Move single booking to different date
     * @param {*} singleBooking 
     * @param {*} newStartDate
     * @param {*} newEndDate
     */
    actionMoveBooking = (singleBooking, room, newStartDate, newEndDate) => {

        let allBookings = BookingHelper.moveBooking(singleBooking, room, newStartDate, newEndDate, this.state.bookings);
        if (allBookings === false) {
            console.log('Unable to move to target date');
        } else {
            this.setState((oldState) => {
                oldState.bookings = allBookings;
                return oldState;
            })
        }
        
    }

    /**
     * Create a new booking
     * @param {*} singleBooking 
     */
    actionCreateBooking(singleBooking) {
            
        if (BookingHelper.canExistBooking(singleBooking, singleBooking.room_id, singleBooking.from_date, singleBooking.to_date, this.state.bookings)) {
            this.setState(oldState => {
                oldState.bookings.push(singleBooking);
                return oldState;
            });
        } else {
            console.log('Cannot create booking');
        }
    }

    /**
     * Can Move single booking to different date
     * @param {*} singleBooking 
     * @param {*} newStartDate
     * @param {*} newEndDate
     */
    actionCanExistBooking(singleBooking, room, newStartDate, newEndDate) {
        return BookingHelper.canExistBooking(singleBooking, room, newStartDate, newEndDate, this.state.bookings);
    }

    /**
     * Open popup
     */
    actionOpenPopup(booking) {
        this.setState(oldState => {
            oldState.popup.show = true;
            oldState.popup.booking = booking;
            return oldState;
        });
    }

    /**
     * Close popup
     */
    actionClosePopup() {
        this.setState(oldState => {
            oldState.popup.show = false;
            return oldState;
        })
    }

    render() {
        const { datas, rooms } = this.props;
        let head = this.renderHeaderDate();
        let body = this.renderTableBody(rooms);
        let loading = <div>Loading...</div>;
    
        // create context, to make data available to other child components
		const contextValue = {
            data: this.state,
            // actionMoveBooking : this.actionMoveBooking,
            // actionCanExistBooking : this.actionCanExistBooking,
            actionOpenPopup: this.actionOpenPopup,
            actionClosePopup: this.actionClosePopup,
            // actionCreateBooking: this.actionCreateBooking,
        };
        
        // show hide booking popup
        let bookingPopup = this.state.popup.show ? <BookingPopup data={this.state.popup}></BookingPopup> : null;

        // check if callback is set inorder to get booking data
        if (this.props.bookingDataCallback) {
            this.props.bookingDataCallback(this.state.bookings);
        }

        return (
            <CalendarContext.Provider value={contextValue}>
                <div className="r-calendar">
                    <DndProvider backend={HTML5Backend}>
                        <ScrollContainer className="scroll-container" ignoreElements="td, th:first-child">
                            {datas !== undefined ? 
                            <table className="table table-striped r-calendar-main-table">
                                {head}
                                {body}
                            </table> : loading}
                        </ScrollContainer>
                    </DndProvider>
                    {bookingPopup}
                </div>
            </CalendarContext.Provider>
        );
    }
}

Calender.propTypes = {
    getDatas: PropTypes.func.isRequired,
    getRooms: PropTypes.func.isRequired,
    datas: PropTypes.array.isRequired,
    rooms: PropTypes.array.isRequired,
    date_info: PropTypes.object.isRequired
}

// const mapStateToProps = (state) => ({
//     datas: state.datas,
// });

const mapStateToProps = (state) => {
    return {
        datas: state.data.datas,
        rooms: state.data.rooms,
        date_info: state.data.date_info,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDatas: (postData) => dispatch(getDatas(postData)),
        getRooms: () => dispatch(getRooms()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calender);