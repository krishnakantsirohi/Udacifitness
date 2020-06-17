import React from 'react';
import {View, Text} from 'react-native';

class EntryDetail extends React.Component{
    componentDidMount() {
        const {entryID} = this.props.route.params
        const year = entryID.slice(0, 4)
        const month = entryID.slice(5, 7)
        const day = entryID.slice(8)
        this.props.navigation.setOptions({title: `${month}/${day}/${year}`})
    }

    render() {
        const {entryID} = this.props.route.params;
        return (
            <View>
                <Text>Entry Details - {entryID}</Text>
            </View>
        )
    }
}

export default EntryDetail;
