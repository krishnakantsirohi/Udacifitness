import React from 'react';
import {View, Text} from 'react-native';

class EntryDetail extends React.Component{
    render() {
        return (
            <View>
                <Text>Entry Details - {this.props.route.params.entryID}</Text>
            </View>
        )
    }
}

export default EntryDetail;
