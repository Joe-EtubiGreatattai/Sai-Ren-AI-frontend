import React, { useState } from "react";
import {
  AppointmentContainer,
  AppointmentItem,
  AppointmentDetails,
  AppointmentActions,
} from "./AmorphousChatStyles";
import Calendar from 'react-calendar'; // Import your calendar component here
import 'react-calendar/dist/Calendar.css'; // CSS for the calendar
import './AmorphousChatStyles.css'; // Adjust the path as necessary

const AppointmentComponent = ({ pendingAppointments, isSuggestion = false, onConfirm }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [showCalendar, setShowCalendar] = useState(false);

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCalendar(true);
    setDate(new Date(appointment.date));
    setTime(new Date(appointment.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setTime(newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleConfirmReschedule = () => {
    // Handle confirmation logic here (e.g., call API with new date and appointment ID)
    console.log("Rescheduled Appointment:", selectedAppointment, "to", date.toLocaleDateString(), time);
    setShowCalendar(false);
    // Optionally: Call onConfirm or any other function to refresh appointments
  };

  const handleReject = () => {
    console.log("Rejected Appointment:", selectedAppointment);
  };

  const handleCancel = () => {
    console.log("Cancelled Appointment:", selectedAppointment);
    setSelectedAppointment(null);
    setShowCalendar(false);
  };

  return (
    <AppointmentContainer>
      {pendingAppointments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
          No upcoming appointments. Stay tuned!
        </div>
      ) : (
        <>
          {pendingAppointments.map((appointment, index) => (
            <AppointmentItem key={index}>
              <AppointmentDetails>
                <h4>{isSuggestion ? "Suggested Appointment" : "Scheduled Appointment"}</h4>
                <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                <p>Time: {new Date(appointment.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                {!isSuggestion && <p>Status: {appointment.status || "Pending"}</p>}
              </AppointmentDetails>
              <AppointmentActions>
                {isSuggestion ? (
                  <>
                    <button onClick={onConfirm}>Confirm</button>
                    <button onClick={handleReject}>Reject</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleReschedule(appointment)}>Reschedule</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                )}
              </AppointmentActions>
            </AppointmentItem>
          ))}

          {showCalendar && (
            <div style={{ marginTop: "20px" }}>
              <h4>Select a new date and time</h4>
              <Calendar
                onChange={handleDateChange}
                value={date}
              />
              <input 
                type="time" 
                value={time} 
                onChange={handleTimeChange} 
                style={{ marginLeft: "10px", marginRight: "10px" }}
              />
              <button className="confirm-button" onClick={handleConfirmReschedule}>Confirm Reschedule</button>
              <button className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
          )}
        </>
      )}
    </AppointmentContainer>
  );
};

export default AppointmentComponent;

