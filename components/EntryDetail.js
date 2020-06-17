import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux'
import MetricCard from "./MetricCard";
import {white} from "../utils/colors";
import {addEntry} from "../actions";
import {getDailyReminderValue, timeToString} from "../utils/helpers";
import {removeEntry} from "../utils/api";
import TextButton from "./TextButton";

class EntryDetail extends React.Component{
    componentDidMount() {
        const {entryID} = this.props.route.params
        const year = entryID.slice(0, 4)
        const month = entryID.slice(5, 7)
        const day = entryID.slice(8)
        this.props.navigation.setOptions({title: `${month}/${day}/${year}`})
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.metrics!==null && !nextProps.metrics.today
    }

    reset = () => {
        const {remove, goBack, entryID} = this.props;
        remove();
        goBack();
        removeEntry(entryID);
    }

    render() {
        const {metrics} = this.props;
        return (
            <View>
                <MetricCard metrics={metrics}/>
                <TextButton onPress={this.reset} style={{margin:20}}>
                    RESET
                </TextButton>
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

function mapDispatchToProps(dispatch, {route, navigation}) {
    const {entryID} = route.params;
    return {
        remove: () => dispatch(addEntry({
            [entryID]: timeToString() === entryID ? getDailyReminderValue() : null
        })),
        goBack: () => navigation.goBack(),
    }
}

function mapStateToProps(state, {route}) {
    const {entryID} = route.params;
    return {
        entryID,
        metrics: state[entryID]
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);
