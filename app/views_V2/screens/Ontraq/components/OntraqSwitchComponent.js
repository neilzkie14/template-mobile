import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function OntraqSwitchComponent({active, setActive}) {
  const selection = [
    {
      name: 'Sort By Device',
    },
    {
      name: 'Sort By Time',
    },
  ];
  return (
    <View
      style={{
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#2E3192',
        overflow: 'hidden',
        backgroundColor: '#fff'
      }}>
      {selection.map((item, key) => {
        let temp_active = false;
        if (active == key) temp_active = true;
        return (
          <TouchableOpacity
            onPress={() => setActive(key)}
            style={{
              backgroundColor: temp_active ? '#2E3192' : '#fff',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 7,
              borderRadius: 5,
            }}>
            <Text style={{color: temp_active ? '#fff' : '#2E3192'}}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* <TouchableOpacity onPress={() => setActive(!active)} style = {{ backgroundColor: active ? '#2E3192' : '#fff', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style = {{ color: active ? '#fff' : '#2E3192' }}> Sort By Time</Text>
      </TouchableOpacity> */}
    </View>
  );
}
