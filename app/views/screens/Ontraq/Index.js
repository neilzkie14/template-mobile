import {NavigationContext} from '@react-navigation/native';
import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../components/Header';
import LiteUserText from '../../../components/LiteUserText';
import { UserContext } from '../../../context/UserContext';
import {Calendar, Agenda} from 'react-native-calendars';
import OntraqInOutScreen from './components/OntraqInOutScreen.';
import moment from 'moment';
import { StudentContext } from '../../../context/StudentContext';
import Student from '../../../api/Student';
import Loader from '../../../components/Loader';
const {width, height} = Dimensions.get('window');
import Calendarr from './components/Calendar';
export default function Index() {
  const navigation = useContext(NavigationContext);
  const [toggleCalendar, setToggleCalendar] = useState(false);
  const [liteUser, setLiteUser] = useState(true);
  const [loading, setLoading] = useState(false);
  const userContext = useContext(UserContext);
  const {user} = userContext.data;
  const studentContext = useContext(StudentContext);
  const {student} = studentContext.data;
  const [room, setRoom] = useState([]);
  const [attendances, setAttendances] = useState([]);

  const [current_date, setCurrent_date] = useState(
    moment(current_date).format('YYYY-MM-DD'),
  );

  const [selectedDate, setSelectedDate] = useState(
    moment(selectedDate).format('YYYY-MM-DD'),
  );

  // const handleMarkers = () => {
  //   //handle marker for Calendar Type
  //   let data = {};
  //   for (let i = 0; i < attendances?.length; i++) {
  //     const element = attendances[i];
  //     console.log({element})
  //     data[moment(`${element.created_at}`).format('YYYY-MM-DD')] = {
  //       // selected: true,
  //       marked: true,
  //       selectedDayTextColor: '#1BBEAE',
  //       customContainerStyle: {
  //           backgroundColor: '#A3D063',
  //       },
  //       customTextStyle:{
  //         color: 'white',
  //       },
  //       selectedDotColor: 'orange'
  //     };
  //   }
  //   console.log({data})

  //   return data
  // };

  const getStudentAttendance = async () => {
    if (student != null) {
      setLoading(true);
      let response = await new Student().getStudentAttendance(student?.id);
      if (response.ok) {
        console.log({response});
        const attendances = response?.data?.venue_attendances.filter(item => {
          return (
            moment(item?.created_at).format('YYYY-MM-DD') ==
            moment(selectedDate).format('YYYY-MM-DD')
          );
        });

        let data = attendances?.map(item => item?.venue);
        setAttendances(attendances);
        let uniqueData = [];
        data.forEach(item => {
          let isUnique = true;
          uniqueData.forEach(uniqueItem => {
            if (uniqueItem?.id == item?.id) {
              isUnique = false;
            }
          });
          if (isUnique) {
            uniqueData.push(item);
          }
        });
        console.log({uniqueData});
        setRoom(uniqueData);
      } else {
        alert('Something went wrong in fetching student attendance');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudentAttendance();
    console.log({attendances})
  }, [student, selectedDate]);

  return (
    <View style={{flex: 1}}>
      <Header />
      {user?.access_type === 'lite' ? 
        <LiteUserText />
      :
      <View style={{padding: 10, flex: 1}}>
        <ScrollView>
          <Calendar
            // markedDates={handleMarkers()}
            markedDates={{
              [selectedDate]: {selected: true, 
                selectedDayTextColor: '#1BBEAE',
                customContainerStyle: {
                    backgroundColor: '#A3D063',
                },
                customTextStyle:{
                  color: 'white',
                }
              },
            }}

            // Initially visible month. Default = now
            initialDate={current_date}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={'2018-01-01'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            // maxDate={'2012-05-30'}
            // Handler which gets executed on day press. Default = undefined
            markingType={'period'}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'yyyy MM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={month => {
              // console.log('month changed', month);
              setCurrent_date(moment(month?.dateString).format('YYYY-MM-DD'));
            }}
            onDayPress={day => {
              console.log({day});
              setSelectedDate(day?.dateString);
            }}
            // Hide month navigation arrows. Default = false
            hideArrows={false}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            renderArrow={direction => {
              if (direction == 'left') {
                return (
                  <View>
                    <Image
                      source={require('../../../images/left-double-arrow.png')}
                      resizeMethod="scale"
                      resizeMode="contain"
                      style={{width: 25, height: 25}}
                      tintColor='#A3D063'
                      />
                  </View>
                );
              } else {
                return (
                  <View>
                    <Image
                      source={require('../../../images/right-double-arrow.png')}
                      resizeMethod="scale"
                      resizeMode="contain"
                      style={{width: 25, height: 25}}
                      tintColor='#A3D063'
                      />
                  </View>
                );
              }
            }}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={false}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
            firstDay={1}
            // Hide day names. Default = false
            hideDayNames={false}
            // Show week numbers to the left. Default = false
            showWeekNumbers={false}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={subtractMonth => subtractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
            // Disable left arrow. Default = false
            disableArrowLeft={false}
            // Disable right arrow. Default = false
            disableArrowRight={false}
            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            disableAllTouchEventsForDisabledDays={false}
            // Replace default month and year title with custom one. the function receive a date as parameter
            renderHeader={date => {
              return (
                <View>
                  <Text
                    style={{color: '#17254A', fontSize: 21, fontWeight: 'bold'}}>
                    {moment(current_date).format('MMMM YYYY')}
                  </Text>
                </View>
              );
            }}
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={true}
            style={{
              height: 350,
            }}
            // Specify theme properties to override specific styles for calendar parts. Default = {}
            theme={{
              backgroundColor: '#ffffff',
              customContainerStyle: {
                backgroundColor: '#A3D063',
              },
              customTextStyle:{
                color: 'white',
              },
              todayTextColor: '#1BBEAE',
              dayTextColor: '#ACA9A9',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: 'orange',
              monthTextColor: 'blue',
              indicatorColor: 'blue',
              textDayFontWeight: 'bold',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: 'bold',
              textDayFontSize: 16,
            }}
          />
          <OntraqInOutScreen room={room} attendances={attendances} />
        </ScrollView>
      </View>
      }
      {loading && <Loader />}
    </View>
  );
}
