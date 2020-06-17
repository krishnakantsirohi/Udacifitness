import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux'
import MetricCard from "./MetricCard";
import {white} from "../utils/colors";

class EntryDetail extends React.Component{
    componentDidMount() {
        const {entryID} = this.props.route.params
        const year = entryID.slice(0, 4)
        const month = entryID.slice(5, 7)
        const day = entryID.slice(8)
        this.props.navigation.setOptions({title: `${month}/${day}/${year}`})
    }

    render() {
        const {metrics} = this.props;
        return (
            <View>
                <MetricCard metrics={metrics}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:white,
        padding:15,

    }
})

function mapStateToProps(state, {route}) {
    const {entryID} = route.params;
    return {
        entryID,
        metrics: state[entryID]
    }
}

export default connect(mapStateToProps)(EntryDetail);
