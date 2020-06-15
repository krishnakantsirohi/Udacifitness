import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {getMetricMetaInfo, timeToString} from "../utils/helpers";
import Sliders from './Sliders';
import Steppers from './Steppers'
import DateHeader from "./DateHeader";

function SubmitBtn({onPress}) {
    return(
        <TouchableOpacity
            onPress={onPress}>
            <Text>SUBMIT</Text>
        </TouchableOpacity>
    )
}

class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0,
    }

    increment = (metric) => {
        const {step} = getMetricMetaInfo(metric);
        this.setState((state)=>{
            const count = state[metric] - step;
            return {
                ...state,
                [metric]: count < 0 ? 0 : count,
            }
        })
    }

    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value,
        }))
    }

    decrement = (metric) => {
        const {max, step} = getMetricMetaInfo(metric);
        this.setState((state)=>{
            const count = state[metric] - step
            return {
                ...state,
                [metric]: count > max ? max : count,
            }
        })
    }

    submit = () => {
        const key = timeToString();
        const entry = this.state;
        this.setState(()=>({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0,
        }))
    }

    render() {
        const metainfo = getMetricMetaInfo();
        return(
            <View>
                <DateHeader date={(new Date()).toLocaleDateString()}/>
                {
                    Object.keys(metainfo).map((key)=> {
                        const {getIcon, type, ...rest} = metainfo[key];
                        const value = this.state[key];
                        return (
                            <View key={key}>
                                {
                                    getIcon()
                                }
                                {
                                    type === 'slider'
                                        ? <Sliders
                                            value={value}
                                            onChange={(value) => this.slide(key, value)}
                                            {...rest}
                                        />
                                        : <Steppers
                                            value={value}
                                            onIncrement={() => this.increment(key)}
                                            onDecrement={() => this.decrement(key)}
                                            {...rest}
                                        />
                                }

                            </View>
                        )
                    })
                }
                <SubmitBtn onPress={this.submit}/>
            </View>
        )
    }
}

export default AddEntry;
