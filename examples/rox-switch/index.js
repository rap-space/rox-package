/** @jsx createElement */
import {createElement, Component,render} from 'rax';
// eslint-disable-next-line
import RoxStyleProvider from 'rox-theme-provider';
import Theme from 'rox-theme';
// eslint-disable-next-line
import Page from 'nuke-page';
// eslint-disable-next-line
import View from 'nuke-view';
// eslint-disable-next-line
import Text from 'nuke-text';
import Switch from 'rox-switch';

let App = class NukeDemoIndex extends Component {
    constructor() {
        super();
        this.state = {
            switch1: true,
            switch2: false,
            switch3: null,
            switch4: null,
        }
    }
    change = (item,value) => {
        let obj = {};
        obj[item]= value;
        this.setState(obj);
    }
    changeNotice = (item,value) => {
        let obj = {};
        obj[item]= value;
        this.setState(obj);
    }
    render() {
        return (
          <RoxStyleProvider>          
              <Page title="Switch">
                  <Page.Intro main="受控，状态自行控制"></Page.Intro>
                  <View style={styles.row}>
                      <View style={styles.cellItem}>
                          <Switch key="switch1" checked={this.state.switch1} onValueChange={this.change.bind(this,'switch1')}/>
                          <View style={styles.cellResult}>
                              <Text style={styles.label}>switch1: </Text>
                              <Text style={styles.text}>{this.state.switch1}</Text>
                          </View>
                      </View>
                      <View style={styles.cellItem}>
                          <Switch key="switch2" checked={this.state.switch2} onValueChange={this.change.bind(this,'switch2')}/>
                          <View style={styles.cellResult}>
                              <Text style={styles.label}>switch2: </Text>
                              <Text style={styles.text}>{this.state.switch2}</Text>
                          </View>
                      </View>
                  </View>
                  <Page.Intro main="非受控，组件checked 状态更新后，返回结果"></Page.Intro>
                  <View style={styles.row}>
                      <View style={styles.cellItem}>
                          <Switch key="switch3" defaultChecked={true} onValueChange={(value)=> this.changeNotice('switch3',value)}/>
                          <View style={styles.cellResult}>
                              <Text style={styles.label}>switch3 返回: </Text>
                              <Text style={styles.text}>{this.state.switch3}</Text>
                          </View>
                      </View>
                      <View style={styles.cellItem}>
                          <Switch key="switch4" defaultChecked={false} onValueChange={(value) => this.changeNotice('switch4',value)}/>
                          <View style={styles.cellResult}>
                              <Text style={styles.label}>switch4 返回: </Text>
                              <Text style={styles.text}>{this.state.switch4}</Text>
                          </View>
                      </View>
                  </View>
                  <Page.Intro main="disabled"></Page.Intro>
                  <View style={styles.row}>
                      <View style={styles.cellItem}>
                          <Switch disabled checked={true}/>

                      </View>
                      <View style={styles.cellItem}>
                          <Switch disabled size="small" checked={true}/>
                      </View>
                  </View>
              </Page>
            </RoxStyleProvider>
        );
    }
}
const styles={
    row:{
        flexDirection:'row',
        paddingLeft:'40rem',
        marginBottom:'30rem'
    },
    cellItem:{
        flex:1,
        height:240,
    },
    cellResult:{
        flexDirection:'row'
    },
    text:{
        marginTop:20,
        fontSize:24,
    },
    label:{
        marginTop:20,
        fontSize:24,
        color:'#999999'
    }
}

render(<App/>);
