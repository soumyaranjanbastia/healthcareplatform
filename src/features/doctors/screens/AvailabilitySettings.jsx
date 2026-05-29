import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { ArrowLeft } from 'lucide-react';
import { 
  getAvailabilityRequest, 
  clearGetAvailabilityResponse 
} from '../redux/getAvailabilitySlice';
import { 
  setAvailabilityRequest, 
  clearAvailabilityResponse 
} from '../redux/setAvailabilitySlice';

// Import modular sub-components
import SessionConfigCard from '../components/SessionConfigCard';
import ApplicabilityPeriodCard from '../components/ApplicabilityPeriodCard';
import PricingModeCard from '../components/PricingModeCard';
import WeeklyShiftCard from '../components/WeeklyShiftCard';
import SlotsGridCard from '../components/SlotsGridCard';
import HolidaysCard from '../components/HolidaysCard';

// --- KEYFRAMES & CONSTANTS ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const DAY_NAMES_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// --- STYLED COMPONENTS ---
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  width: 100%;
  animation: ${fadeIn} 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: 'Outfit', sans-serif;
  padding-bottom: 60px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  font-size: 13.5px;
  font-weight: 700;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    color: #009688;
    background-color: #f1f5f9;
    transform: translateX(-3px);
  }
`;

const TitleBlock = styled.div`
  h2 {
    font-size: 24px;
    font-weight: 800;
    color: #0f172a;
    margin: 0;
  }
  p {
    font-size: 13px;
    color: #64748b;
    margin-top: 4px;
    font-weight: 500;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 28px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const SaveBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #009688;
  color: #ffffff;
  border: none;
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 150, 136, 0.2);
  transition: all 0.2s ease;

  &:hover {
    background-color: #00796b;
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #94a3b8;
    box-shadow: none;
    cursor: not-allowed;
  }
`;

// Helper conversions
const convertTo12Hour = (time24) => {
  if (!time24) return '12:00 AM';
  try {
    let [hours, minutes] = time24.split(':');
    hours = parseInt(hours, 10);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  } catch (e) {
    return '12:00 AM';
  }
};

const convertTo24Hour = (time12) => {
  if (!time12) return '00:00';
  try {
    const [time, modifier] = time12.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  } catch (e) {
    return '00:00';
  }
};

const standardizeTime = (timeStr) => {
  if (!timeStr) return '';
  try {
    const cleanTime = timeStr.trim().toUpperCase();
    const [timePart, ampm] = cleanTime.split(' ');
    const [hours, minutes] = timePart.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')} ${ampm}`;
  } catch (e) { return timeStr; }
};

const AvailabilitySettings = ({ doctor, onBack }) => {
  const dispatch = useDispatch();
  const doctorName = doctor.fullName || doctor.name || 'Unknown Doctor';

  // --- REDUX STATES ---
  const {
    loading: fetchLoading,
    data: fetchResult
  } = useSelector(state => state.getAvailability || {});

  const {
    loading: saveLoading,
    success: saveSuccess,
    error: saveError
  } = useSelector(state => state.setAvailability || {});

  // --- COMPONENT LOCAL STATES ---
  const [duration, setDuration] = useState('15');
  const [bufferTime, setBufferTime] = useState('5');
  const [availableDays, setAvailableDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [onlinePrice, setOnlinePrice] = useState('500');
  const [clinicPrice, setClinicPrice] = useState('600');
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 3);
    return d.toISOString().split('T')[0];
  });
  
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [newHoliday, setNewHoliday] = useState('');
  const [serviceType, setServiceType] = useState('both'); // 'online' | 'offline' | 'both'

  // Load existing availability data on mount
  useEffect(() => {
    dispatch(getAvailabilityRequest({
      doctorId: doctor.id,
      location: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata',
      country: 'IN'
    }));

    return () => {
      dispatch(clearGetAvailabilityResponse());
      dispatch(clearAvailabilityResponse());
    };
  }, [dispatch, doctor.id]);

  // Parse fetched data and fill form fields
  useEffect(() => {
    if (fetchResult && fetchResult.schedule) {
      const schedule = fetchResult.schedule;
      let primarySource = null;

      if (schedule.online) {
        primarySource = schedule.online;
      } else if (schedule.offline && schedule.offline.length > 0) {
        primarySource = schedule.offline[0];
      }

      if (primarySource) {
        if (primarySource.duration) setDuration(primarySource.duration.toString());
        if (primarySource.bufferTime) setBufferTime(primarySource.bufferTime.toString());
        
        if (primarySource.startTime) setStartTime(convertTo24Hour(primarySource.startTime));
        if (primarySource.endTime) setEndTime(convertTo24Hour(primarySource.endTime));

        if (primarySource.availableDays && Array.isArray(primarySource.availableDays)) {
          setAvailableDays(primarySource.availableDays.map(d => d.charAt(0).toUpperCase() + d.slice(1)));
        }

        if (schedule.online?.price) setOnlinePrice(schedule.online.price.toString());
        if (schedule.offline && schedule.offline.length > 0 && schedule.offline[0].price) {
          setClinicPrice(schedule.offline[0].price.toString());
        }

        if (schedule.online && schedule.offline && schedule.offline.length > 0) {
          setServiceType('both');
        } else if (schedule.offline && schedule.offline.length > 0) {
          setServiceType('offline');
        } else {
          setServiceType('online');
        }

        if (primarySource.startDate) {
          const [d, m, y] = primarySource.startDate.split('/');
          setStartDate(`${y}-${m}-${d}`);
        }
        if (primarySource.endDate) {
          const [d, m, y] = primarySource.endDate.split('/');
          setEndDate(`${y}-${m}-${d}`);
        }

        if (primarySource.unavailableDates && Array.isArray(primarySource.unavailableDates)) {
          setHolidays(primarySource.unavailableDates.map(dStr => {
            const [d, m, y] = dStr.split('/');
            return `${y}-${m}-${d}`;
          }));
        }

        // Available slots parsing
        let loadedSlots = [];
        if (schedule.online?.availableTime) {
          schedule.online.availableTime.forEach(s => {
            loadedSlots.push({
              start: standardizeTime(s.startTime),
              end: standardizeTime(s.endTime),
              type: 'online'
            });
          });
        }
        if (schedule.offline) {
          schedule.offline.forEach(clinic => {
            if (clinic.availableTime) {
              clinic.availableTime.forEach(s => {
                loadedSlots.push({
                  start: standardizeTime(s.startTime),
                  end: standardizeTime(s.endTime),
                  type: 'offline'
                });
              });
            }
          });
        }
        if (loadedSlots.length > 0) {
          setSelectedSlots(loadedSlots);
        }
      }
    }
  }, [fetchResult]);

  // Handle Save Success/Failures
  useEffect(() => {
    if (saveSuccess) {
      alert("Availability schedule saved successfully!");
      dispatch(clearAvailabilityResponse());
      onBack();
    }
  }, [saveSuccess, onBack, dispatch]);

  useEffect(() => {
    if (saveError) {
      alert(`Failed to save availability schedule: ${saveError}`);
      dispatch(clearAvailabilityResponse());
    }
  }, [saveError, dispatch]);

  // Generate Slots dynamically
  const generateTimeSlots = () => {
    if (!duration || !bufferTime || !startTime || !endTime) return [];
    if (startTime === endTime) return [];

    const slots = [];
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const startDateObj = new Date();
    startDateObj.setHours(startHour, startMinute, 0, 0);

    const endDateObj = new Date();
    endDateObj.setHours(endHour, endMinute, 0, 0);

    if (endDateObj <= startDateObj) return [];

    const dur = parseInt(duration);
    const buf = parseInt(bufferTime);
    let current = new Date(startDateObj);

    while (current.getTime() + dur * 60000 <= endDateObj.getTime()) {
      const slotStart = new Date(current);
      const slotEnd = new Date(current.getTime() + dur * 60000);

      const format12 = date => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        return `${(hours % 12 || 12).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
      };

      slots.push({
        start: format12(slotStart),
        end: format12(slotEnd)
      });

      current = new Date(slotEnd.getTime() + buf * 60000);
    }
    return slots;
  };

  const currentSlots = generateTimeSlots();

  const getSlotCategory = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours] = time.split(':');
    hours = parseInt(hours, 10);
    if (hours === 12 && modifier === 'AM') hours = 0;
    if (hours !== 12 && modifier === 'PM') hours += 12;
    if (hours >= 6 && hours < 12) return 'Morning (6 AM - 12 PM)';
    if (hours >= 12 && hours < 18) return 'Afternoon (12 PM - 6 PM)';
    if (hours >= 18 && hours <= 23) return 'Evening (6 PM - 12 AM)';
    return 'Night (12 AM - 6 AM)';
  };

  const slotsByCategory = currentSlots.reduce((acc, slot) => {
    const cat = getSlotCategory(slot.start);
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(slot);
    return acc;
  }, {});

  // Day toggle handler
  const handleDayToggle = (day) => {
    if (availableDays.includes(day)) {
      setAvailableDays(prev => prev.filter(d => d !== day));
    } else {
      setAvailableDays(prev => [...prev, day]);
    }
  };

  // Preset periods
  const handlePeriodPreset = (months) => {
    const start = new Date();
    const end = new Date();
    end.setMonth(start.getMonth() + months);
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
  };

  // Add holiday handler
  const handleAddHoliday = () => {
    if (!newHoliday) return;
    if (holidays.includes(newHoliday)) {
      alert("This holiday date is already added.");
      return;
    }
    setHolidays(prev => [...prev, newHoliday].sort());
    setNewHoliday('');
  };

  // Remove holiday handler
  const handleRemoveHoliday = (date) => {
    setHolidays(prev => prev.filter(d => d !== date));
  };

  // Toggle active slot in slot list
  const handleSlotToggle = (slot, type) => {
    const key = `${slot.start}-${slot.end}`;
    const exists = selectedSlots.find(s => `${s.start}-${s.end}` === key && s.type === type);

    if (exists) {
      setSelectedSlots(prev => prev.filter(s => !(`${s.start}-${s.end}` === key && s.type === type)));
    } else {
      setSelectedSlots(prev => [...prev, { start: slot.start, end: slot.end, type }]);
    }
  };

  // Category bulk toggle
  const handleCategoryBulkSelect = (categorySlots, type) => {
    const categoryKeys = categorySlots.map(s => `${s.start}-${s.end}`);
    const selectedInCategory = selectedSlots.filter(s => categoryKeys.includes(`${s.start}-${s.end}`) && s.type === type);

    if (selectedInCategory.length === categorySlots.length) {
      // Remove all in this category
      setSelectedSlots(prev => prev.filter(s => !(categoryKeys.includes(`${s.start}-${s.end}`) && s.type === type)));
    } else {
      // Add all missing slots in this category
      const toAdd = categorySlots.filter(s => !selectedSlots.some(sel => `${sel.start}-${sel.end}` === `${s.start}-${s.end}` && sel.type === type))
        .map(s => ({ start: s.start, end: s.end, type }));
      setSelectedSlots(prev => [...prev, ...toAdd]);
    }
  };

  const handleSave = () => {
    // Validations
    if (availableDays.length === 0) {
      alert("Please select at least one available day of the week!");
      return;
    }

    if (!startDate || !endDate || new Date(startDate) > new Date(endDate)) {
      alert("Please configure a valid schedule period!");
      return;
    }

    // Determine final list of slots based on service type configuration
    const activeSlotKeys = currentSlots.map(s => `${s.start}-${s.end}`);
    const filteredSelectedSlots = selectedSlots.filter(slot => activeSlotKeys.includes(`${slot.start}-${slot.end}`));

    // Auto-map slots if they haven't explicitly set them
    let finalSlots = [...filteredSelectedSlots];
    if (finalSlots.length === 0) {
      if (serviceType === 'online' || serviceType === 'both') {
        currentSlots.forEach(s => finalSlots.push({ ...s, type: 'online' }));
      }
      if (serviceType === 'offline' || serviceType === 'both') {
        currentSlots.forEach(s => finalSlots.push({ ...s, type: 'offline' }));
      }
    }

    const formatDateToAPI = (dateStr) => {
      if (!dateStr) return '';
      const [y, m, d] = dateStr.split('-');
      return `${d}/${m}/${y}`;
    };

    const finalOnlinePrice = (serviceType === 'online' || serviceType === 'both') ? parseFloat(onlinePrice) || 0 : null;
    const finalClinicPrice = (serviceType === 'offline' || serviceType === 'both') ? parseFloat(clinicPrice) || 0 : null;

    const payload = {
      doctorId: doctor.id,
      branchId: doctor.branchId || null,
      duration: parseInt(duration),
      bufferTime: parseInt(bufferTime),
      availableDays,
      startTime: convertTo12Hour(startTime),
      endTime: convertTo12Hour(endTime),
      unavailableDates: holidays.map(dateStr => formatDateToAPI(dateStr)),
      specificDate: {},
      startDate: formatDateToAPI(startDate),
      endDate: formatDateToAPI(endDate),
      location: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata',
      country: 'IN',
      type: serviceType === 'both' ? 'both' : serviceType,
      onlinePrice: finalOnlinePrice,
      clinicPrice: finalClinicPrice,
      availableTime: finalSlots.map(slot => ({
        startTime: slot.start,
        endTime: slot.end,
        type: slot.type,
        clinicId: slot.type === 'offline' ? (doctor.branchId || null) : null
      }))
    };

    dispatch(setAvailabilityRequest(payload));
  };

  const isSlotChecked = (slot, type) => {
    return selectedSlots.some(s => `${s.start}-${s.end}` === `${slot.start}-${slot.end}` && s.type === type);
  };

  return (
    <Container>
      <HeaderRow>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <BackBtn onClick={onBack}>
            <ArrowLeft size={16} /> Back to Doctor Directory
          </BackBtn>
          <TitleBlock>
            <h2>Manage Availability Schedule</h2>
            <p>Configure shift schedules, pricing plans, and offline/online session slots for <strong>{doctorName}</strong>.</p>
          </TitleBlock>
        </div>
        <SaveBtn onClick={handleSave} disabled={saveLoading || fetchLoading}>
          {saveLoading ? 'Saving Settings...' : 'Save Schedule Settings'}
        </SaveBtn>
      </HeaderRow>

      {fetchLoading ? (
        <Card style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
          <div style={{ fontSize: '15px', fontWeight: 600 }}>Loading existing doctor schedule...</div>
        </Card>
      ) : (
        <ContentGrid>
          {/* Left Column: Schedule, Validity & Pricing */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Session Config */}
            <SessionConfigCard 
              duration={duration} 
              setDuration={setDuration} 
              bufferTime={bufferTime} 
              setBufferTime={setBufferTime} 
            />

            {/* Applicability Period */}
            <ApplicabilityPeriodCard 
              startDate={startDate} 
              setStartDate={setStartDate} 
              endDate={endDate} 
              setEndDate={setEndDate} 
              handlePeriodPreset={handlePeriodPreset} 
            />

            {/* Consultation Channels & Pricing */}
            <PricingModeCard 
              serviceType={serviceType} 
              setServiceType={setServiceType} 
              onlinePrice={onlinePrice} 
              setOnlinePrice={setOnlinePrice} 
              clinicPrice={clinicPrice} 
              setClinicPrice={setClinicPrice} 
            />
          </div>

          {/* Right Column: Weekly Shift, Grid & Holidays */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Operating Days & Hours */}
            <WeeklyShiftCard 
              availableDays={availableDays} 
              handleDayToggle={handleDayToggle} 
              startTime={startTime} 
              setStartTime={setStartTime} 
              endTime={endTime} 
              setEndTime={setEndTime} 
            />

            {/* Slots Configuration */}
            <SlotsGridCard 
              slotsByCategory={slotsByCategory} 
              serviceType={serviceType} 
              handleCategoryBulkSelect={handleCategoryBulkSelect} 
              handleSlotToggle={handleSlotToggle} 
              isSlotChecked={isSlotChecked} 
            />

            {/* Holidays Blocklist */}
            <HolidaysCard 
              holidays={holidays} 
              newHoliday={newHoliday} 
              setNewHoliday={setNewHoliday} 
              handleAddHoliday={handleAddHoliday} 
              handleRemoveHoliday={handleRemoveHoliday} 
            />
          </div>
        </ContentGrid>
      )}
    </Container>
  );
};

export default AvailabilitySettings;
