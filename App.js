import React, { useState } from 'react'
import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'
//import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import  moment from 'moment'

const DateTimeScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [mode, setMode] = useState('date');
  const [chosenMode, setChosenMode] = useState(null)  // chosenMode: true ? startDay : endDay

  const [chosenStartDate, setChosenStartDate] = useState(moment().format("MMM Do YY"))
  const [chosenEndDate, setChosenEndDate] = useState(moment().format("MMM Do YY"));

  const showMode = (currentMode) => {
    setDatePickerVisibility(true);
    setMode(currentMode);
  }

  const showTimePicker = () => {
    showMode('time')
  };

  const showDatePicker = () => {
    showMode('date')
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

/* Notice there's only one `date` parameter */
const handleConfirm = (date) => {
  hideDatePicker();
  if(chosenMode){
    /* Here, use the same date in both branches of the if statement */
    setChosenStartDate(moment(date).format("MMM Do YY"));  
  }else{
    /* `date` is used again */
    setChosenEndDate(moment(date).format("MMM Do YY"));
  }
}

  return (
    <View>
      <Button title="Starting day" onPress={() => {
        setChosenMode(true);
        showDatePicker();
      }} />
      <Button title="Ending day" onPress={() => {
        setChosenMode(false);
        showDatePicker();
      }} />
      <Button title="Starting time" onPress={showTimePicker} />
      <Button title="Ending time" onPress={showTimePicker} />
      {isDatePickerVisible && (
        <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      )}
      <Text>Stating day: {chosenStartDate}</Text>
      <Text>Ending day: {chosenEndDate}</Text>
    </View>
  );
};

export default DateTimeScreen;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})