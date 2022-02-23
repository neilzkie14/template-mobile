import React, {useState, useContext} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import AnnouncementItem from './components/AnnouncementItem';
import {UserContext} from '../../../context/UserContext';
const {width} = Dimensions.get('screen');
export default function Announcement({
}) {
  const userContext = useContext(UserContext);
  const [announcements, setAnnouncements] = useState([
    {
      date: '12/21/21',
      title: 'TekTeackh Mobile V2!',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus velit dui, facilisis a finibus eu, mollis quis diam. Duis tempor dapibus ullamcorper. Ut cursus condimentum lorem nec aliquam. Quisque finibus nec velit vitae ornare. Cras mattis ornare dui eu convallis. Morbi bibendum hendrerit eros vitae tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Quisque nunc urna, vestibulum a convallis ut, euismod eget dui. Aliquam erat volutpat. Aenean libero risus, cursus in metus nec, facilisis lacinia arcu.'
    },
    {
      date: '11/15/21',
      title: 'Bug & Fixes Update',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus velit dui, facilisis a finibus eu, mollis quis diam. Duis tempor dapibus ullamcorper. Aenean libero risus, cursus in metus nec, facilisis lacinia arcu.'
    },
    {
      date: '10/09/21',
      title: 'OnTraQ\'s New Features',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus velit dui, facilisis a finibus eu, mollis quis diam. Duis tempor dapibus ullamcorper. Aenean libero risus, cursus in metus nec, facilisis lacinia arcu.'
    },
    {
      date: '12/21/21',
      title: 'TekTeackh Mobile V2!',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus velit dui, facilisis a finibus eu, mollis quis diam. Duis tempor dapibus ullamcorper. Ut cursus condimentum lorem nec aliquam. Quisque finibus nec velit vitae ornare. Cras mattis ornare dui eu convallis. Morbi bibendum hendrerit eros vitae tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Quisque nunc urna, vestibulum a convallis ut, euismod eget dui. Aliquam erat volutpat. Aenean libero risus, cursus in metus nec, facilisis lacinia arcu.'
    },
    {
      date: '11/15/21',
      title: 'Bug & Fixes Update',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus velit dui, facilisis a finibus eu, mollis quis diam. Duis tempor dapibus ullamcorper. Aenean libero risus, cursus in metus nec, facilisis lacinia arcu.'
    },
    {
      date: '10/09/21',
      title: 'OnTraQ\'s New Features',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus velit dui, facilisis a finibus eu, mollis quis diam. Duis tempor dapibus ullamcorper. Aenean libero risus, cursus in metus nec, facilisis lacinia arcu.'
    },
    {
      date: '12/21/21',
      title: 'TekTeackh Mobile V2!',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus velit dui, facilisis a finibus eu, mollis quis diam. Duis tempor dapibus ullamcorper. Ut cursus condimentum lorem nec aliquam. Quisque finibus nec velit vitae ornare. Cras mattis ornare dui eu convallis. Morbi bibendum hendrerit eros vitae tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Quisque nunc urna, vestibulum a convallis ut, euismod eget dui. Aliquam erat volutpat. Aenean libero risus, cursus in metus nec, facilisis lacinia arcu.'
    },
    {
      date: '11/15/21',
      title: 'Bug & Fixes Update',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus velit dui, facilisis a finibus eu, mollis quis diam. Duis tempor dapibus ullamcorper. Aenean libero risus, cursus in metus nec, facilisis lacinia arcu.'
    },
    {
      date: '10/09/21',
      title: 'OnTraQ\'s New Features',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus velit dui, facilisis a finibus eu, mollis quis diam. Duis tempor dapibus ullamcorper. Aenean libero risus, cursus in metus nec, facilisis lacinia arcu.'
    },
    {
      date: '12/21/21',
      title: 'TekTeackh Mobile V2!',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus velit dui, facilisis a finibus eu, mollis quis diam. Duis tempor dapibus ullamcorper. Ut cursus condimentum lorem nec aliquam. Quisque finibus nec velit vitae ornare. Cras mattis ornare dui eu convallis. Morbi bibendum hendrerit eros vitae tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Quisque nunc urna, vestibulum a convallis ut, euismod eget dui. Aliquam erat volutpat. Aenean libero risus, cursus in metus nec, facilisis lacinia arcu.'
    },
    {
      date: '11/15/21',
      title: 'Bug & Fixes Update',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus velit dui, facilisis a finibus eu, mollis quis diam. Duis tempor dapibus ullamcorper. Aenean libero risus, cursus in metus nec, facilisis lacinia arcu.'
    },
    {
      date: '10/09/21',
      title: 'OnTraQ\'s New Features',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus velit dui, facilisis a finibus eu, mollis quis diam. Duis tempor dapibus ullamcorper. Aenean libero risus, cursus in metus nec, facilisis lacinia arcu.'
    },
  ]);
  const {user} = userContext.data;

  return (
    <View style={{padding: 5}}>
        {announcements?.map((item, index) => {
            return (
              <AnnouncementItem
                key={index}
                date={item?.date}
                title={item?.title}
                message={item?.message}
                />
            );
          })}
    </View>
  );
}

const styles = StyleSheet.create({
});