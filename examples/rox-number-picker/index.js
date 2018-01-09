/** @jsx createElement */
import {createElement, Component,render } from 'rax';
import RoxStyleProvider from 'rox-theme-provider';
import NumberPicker from 'rox-number-picker';
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from 'nuke-page';
// eslint-disable-next-line
import View from 'nuke-view';

let App = class NukeDemoIndex extends Component {
    constructor() {
        super();
    }
    changeHandle=(e)=>{
        console.log(e);
    }
    render() {
        return (
            <RoxStyleProvider>
                <Page title="Number Picker">
                    <Page.Intro main="基础用法"></Page.Intro>
                    <View style={styles.npwrapper}><NumberPicker min={1} max={1000} defaultValue={2} onChange={this.changeHandle} step={3}/></View>
                    <Page.Intro main="disabled"></Page.Intro>
                    <View style={styles.npwrapper}><NumberPicker disabled min={1} max={1000} defaultValue={2} onChange={this.changeHandle} step={3}/></View>
                    <Page.Intro main="error"></Page.Intro>
                    <View style={styles.npwrapper}><NumberPicker min={1} max={10} defaultValue={2} onChange={this.changeHandle} step={1}/></View>
                    <Page.Intro main="数字超长"></Page.Intro>
                    <View style={[styles.npwrapper,{width:380}]}><NumberPicker min={99} max={10000} defaultValue={3443} onChange={this.changeHandle} step={50}/></View>
                </Page>
            </RoxStyleProvider>
        );
    }
}

const styles={
    npwrapper:{
        width:300,
        padding:40
    }
}

render(<App/>);
