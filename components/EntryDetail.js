import React from 'react';
import {View, Text} from 'react-native';

class EntryDetail extends React.Component{

    setTitle = (entryId) => {
        if (!entryId) return;

        const year = entryId.slice(0, 4)
        const month = entryId.slice(5, 7)
        const day = entryId.slice(8)

        this.props.navigation.setOptions({
            title: `${month}/${day}/${year}`
        });
    };

    render() {
        const {entryId} = this.props.route.params;
        this.setTitle(entryId);
        return (
            <View>
                <Text>Entry Details - {this.props.route.params.entryID}</Text>
            </View>
        )
    }
}

export default EntryDetail;
