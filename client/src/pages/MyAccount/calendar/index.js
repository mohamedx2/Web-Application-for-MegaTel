import React, { useState, useEffect } from 'react';
import { Badge, Calendar, Modal, Form, Input, Select, Button } from 'antd';
import axios from 'axios';

const { Option } = Select;

const CalendarComponent = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.post('https://call-1.onrender.com/user/calendar', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCalendarData(data);
      } catch (error) {
        console.error('Error fetching calendar data:', error);
      }
    };

    fetchCalendarData();
  }, []);

  const handleDateSelect = (value) => {
    const selectedDate = value.toDate();
    const events = calendarData.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === selectedDate.getDate() &&
             eventDate.getMonth() === selectedDate.getMonth() &&
             eventDate.getFullYear() === selectedDate.getFullYear();
    });

    setSelectedDateEvents(events);
    setSelectedDate(selectedDate);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = async (values) => {
    try {
      const token = localStorage.getItem('token');
      const newEvent = {
        date: selectedDate,
        type: values.type,
        content: values.content
      };

      const { data } = await axios.post('https://call-1.onrender.com/calendar', newEvent, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSelectedDate("")
      setCalendarData([...calendarData, data]);
      setSelectedDateEvents([...selectedDateEvents, data]);
    } catch (error) {
      console.error('Error adding event:', error);
    } finally {
      setIsModalVisible(false);
    }
  };

  const dateCellRender = (value) => {
    const events = calendarData.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === value.date() &&
             eventDate.getMonth() === value.month() &&
             eventDate.getFullYear() === value.year();
    });

    return (
      <ul className="events">
        {events.map((event) => (
          <li key={event._id} onClick={() => handleDateSelect(value)}>
            <Badge status={event.type} text={event.content} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <Calendar dateCellRender={dateCellRender} onSelect={handleDateSelect} />
      <Modal
        title="Events"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <ul>
          {selectedDateEvents.map((event) => (
            <li key={event._id}>
              <Badge status={event.type} text={event.content} />
            </li>
          ))}
        </ul>
        <Form layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please select the type' }]}>
            <Select placeholder="Select type">
              <Option value="success">success</Option>
              <Option value="warning">warning</Option>
              <Option value="error">error</Option>
            </Select>
          </Form.Item>
          <Form.Item name="content" label="Content" rules={[{ required: true, message: 'Please enter the content' }]}>
            <Input placeholder="Enter content" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Add Event</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CalendarComponent;
