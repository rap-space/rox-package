/** @jsx createElement */
import {createElement, Component,render } from 'rax';
import RoxStyleProvider from 'rox-theme-provider';
import Checkbox from 'rox-checkbox';
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from 'nuke-page';
// eslint-disable-next-line
import View from 'nuke-view'
import Text from 'nuke-text';

const themeOrange ='#ff6600';

let App = class NukeDemoIndex extends Component {
    constructor() {
        super();
        this.state = {
            checked:false
        }
    }

    onChange(value){
        console.log(value);
    }
    changeControl(value){
        this.setState({
            checked:value
        })
    }

    render() {
        return (
            <RoxStyleProvider>
                <Page title="Checkbox">
                  <Page.Intro sub="普通样式"></Page.Intro>
                  <View style={styles.demo_item}>
                      <View style={styles.group_item}>
                          <Checkbox defaultChecked={true} size="small"  onChange={this.onChange.bind(this)}></Checkbox>
                          <Text>苹果</Text>
                      </View>
                      <View style={styles.group_item}>
                          <Checkbox size="small"  onChange={this.onChange.bind(this)}></Checkbox>
                          <Text>梨</Text>
                      </View>

                  </View>
                  <Page.Intro sub="空心样式"></Page.Intro>
                  <View style={styles.demo_item}>
                      <View style={styles.group_item}>
                          <Checkbox defaultChecked={true} type="empty" size="small"  onChange={this.onChange.bind(this)}></Checkbox>
                          <Text>苹果</Text>
                      </View>
                      <View style={styles.group_item}>
                          <Checkbox size="small" type="empty"  onChange={this.onChange.bind(this)}></Checkbox>
                          <Text>梨</Text>
                      </View>

                  </View>
                  <Page.Intro sub="list 样式"></Page.Intro>
                  <View style={[styles.demo_item,{flexDirection:'column'}]}>
                      <View style={styles.group_item}>
                          <Checkbox defaultChecked={true} type="list" size="small"  onChange={this.onChange.bind(this)}></Checkbox>
                          <Text>浙江省杭州市余杭区</Text>
                      </View>
                      <View style={styles.group_item}>
                          <Checkbox size="small" type="list"  onChange={this.onChange.bind(this)}></Checkbox>
                          <Text>浙江省杭州市临安市</Text>
                      </View>

                  </View>  

                  <Page.Intro main="自定义大小颜色"></Page.Intro>
                  <View style={styles.demo_item}>
                      <Checkbox style={{width:'30rem',height:'30rem',fontSize:'20rem'}} defaultChecked={true} size="small" checkedStyle={{backgroundColor:themeOrange}} unCheckedStyle={{backgroundColor:themeOrange}} onChange={this.onChange.bind(this)}></Checkbox>
                      <Checkbox defaultChecked={true} size="small" type="empty" checkedStyle={{borderColor:themeOrange,color:themeOrange}} unCheckedStyle={{borderColor:themeOrange}} onChange={this.onChange.bind(this)}></Checkbox>
                      <Checkbox defaultChecked={true} size="small" type="list" checkedStyle={{color:themeOrange}} onChange={this.onChange.bind(this)}></Checkbox>
                  </View>   
               </Page>
            </RoxStyleProvider>
        );
    }
}

const styles = {
    demo_item:{
        width:750,
        marginTop:30,
        backgroundColor:'#ffffff',
        flexDirection:'row',
        alignItem:'center',
        paddingLeft:12
    },
    group_item:{
        height:104,
        flexDirection:'row',
        borderBottomWidth:'2rem',
        borderBottomStyle:'solid',
        borderBottomColor:'#F7F8FA',
        alignItems:'center'
    }
}

render(<App/>);