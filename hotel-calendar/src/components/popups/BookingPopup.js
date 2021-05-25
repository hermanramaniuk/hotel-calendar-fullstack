import React, { useContext, useState } from 'react';
import CalendarContext from './../CalendarContext';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import { connect, useSelector, useDispatch } from "react-redux";
import { updateDateInfo } from "../../actions/dataActions";

function BookingPopup(props) {
    const value = useSelector(state => state.value);
    const dispatch = useDispatch();

    const options = [
        { value: 1, label: 'Booked' },
        { value: 0, label: 'Available' },
    ];
    
    const [availability, setAvailability] = useState(props.data.booking.status);
    const handleStatus = (option) => {
        if (option.value === 1) {
            setAvailability(1);
        } else {
            setAvailability(0);
        }
    };

    const [price, setPrice] = useState(props.data.booking.price);
    const handlePrice = (e) => {
        setPrice(e.target.value);
    }

    const context = useContext(CalendarContext);

    const saveRoomInfo = (e) => {
        props.updateDateInfo({
            id: props.data.booking.room_id,
            date: props.data.booking.date,
            price: price,
            status: availability
        });
        console.log("------------------------------");

        context.actionClosePopup();
        e.preventDefault();
    }

    let style = props.data.show === false ? {display:"none", zIndex:-1} : {display:'block', zIndex:10};
    let heading = 'Edit Room Info';

    return (
        <div className="popup-wrapper" style={style}>
            <div className="popup booking-popup">
                <div className="card">
                    <div className="card-header text-center">
                        <h5>
                            <span>{heading}</span>
                            <button onClick={() => context.actionClosePopup()} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </h5>
                    </div>
                    <div className="card-body">
                        <form action="" className="form">
                            <div className="row">
                                <div className="col-md-4 ">
                                    <h5>Room ID : </h5>
                                </div>
                                <div className="col-md-2 ">
                                    <h5>{props.data.booking.room_id}</h5>
                                </div>
                                <div className="col-md-4 ">
                                    <h5>Room Date : </h5>
                                </div>
                                <div className="col-md-2 ">
                                    <p>{props.data.booking.date}</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-4 ">
                                    <h5>Room Price : </h5>
                                </div>
                                <div className="col-md-8 ">
                                <input type="text" className="form-control" name="room_price" placeholder="" value={price} onChange={(e) => handlePrice(e)} />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-md-4 ">
                                    <h5>Room Avalability : </h5>
                                </div>
                                <div className="col-md-8 ">
                                    <Select 
                                    options={options} 
                                    value={options.filter(option => option.value === availability)} autoFocus={true} 
                                    onChange={(option) => handleStatus(option)} />
                                </div>
                            </div>

                            <div className="text-center">
                                <button className="btn btn-success" onClick={(e) => saveRoomInfo(e)}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    // count: state.counter.count
});
  
const mapDispatchToProps = { updateDateInfo };
  
export default connect(mapStateToProps, mapDispatchToProps)(BookingPopup);

// export default BookingPopup;