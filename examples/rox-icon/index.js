/** @jsx createElement */
/* eslint-disable import/no-extraneous-dependencies */
import { createElement, Component, render } from 'rax';
import { MultiRow } from 'nuke-layout';
import Page from 'nuke-page';
import View from 'nuke-view';
import Text from 'nuke-text';
import Icon from 'rox-icon';

const ICONS = {
  default: [
    'all',
    'email',
    'account',
    'emailFilling',
    'favoritesFilling',
    'accountFilling',
    'smile',
    'personalCenter',
    'back',
    'arrowDown',
    'arrowUp',
    'add',
    'minus',
    'errorFilling',
    'error',
    'select',
    'success',
    'warning',
    'display',
    'prompt',
    'successFilling',
    'close',
    'semiSelect',
    'loading',
    'navMore',
    'search',
    'arrowRight',
    'favorites',
    'deleteFilling',
    'arrowLeft',
    'radio',
    'radio',
    'radio'
  ],
  v2: [
    'accessory',
    'activity',
    'activity_fill',
    'add',
    'addition_fill',
    'addition',
    'addpeople_fill',
    'addpeople',
    'addressbook_fill',
    'addressbook',
    'barrage_fill',
    'barrage',
    'browse_fill',
    'browse',
    'brush',
    'brush_fill',
    'businesscard_fill',
    'businesscard',
    'camera_fill',
    'camera',
    'clock_fill',
    'clock',
    'close',
    'collection_fill',
    'collection',
    'computer_fill',
    'computer',
    'coordinates_fill',
    'coordinates',
    'coupons_fill',
    'coupons',
    'createtask_fill',
    'createtask',
    'customerservice_fill',
    'customerservice',
    'delete_fill',
    'delete',
    'document',
    'document_fill',
    'dynamic_fill',
    'dynamic',
    'editor',
    'eit',
    'emoji_fill',
    'emoji',
    'empty',
    'empty_fill',
    'enter',
    'enterinto',
    'enterinto_fill',
    'feedback_fill',
    'feedback',
    'flag_fill',
    'flag',
    'flashlight',
    'flashlight_fill',
    'flip',
    'flip_fill',
    'fullscreen',
    'group',
    'group_fill',
    'headlines_fill',
    'headlines',
    'homepage_fill',
    'homepage',
    'integral_fill',
    'integral',
    'interactive_fill',
    'interactive',
    'keyboard',
    'label',
    'label_fill',
    'like_fill',
    'like',
    'live_fill',
    'live',
    'lock_fill',
    'lock',
    'mail',
    'mail_fill',
    'manage_fill',
    'manage',
    'message',
    'message_fill',
    'mine',
    'mine_fill',
    'mobilephone_fill',
    'mobilephone',
    'more',
    'narrow',
    'offline_fill',
    'offline',
    'order_fill',
    'order',
    'other',
    'people_fill',
    'people',
    'picture_fill',
    'picture',
    'play',
    'play_fill',
    'playon_fill',
    'playon',
    'praise_fill',
    'praise',
    'prompt_fill',
    'prompt',
    'qrcode_fill',
    'qrcode',
    'redpacket_fill',
    'redpacket',
    'refresh',
    'remind_fill',
    'remind',
    'return',
    'right',
    'scan',
    'select_fill',
    'select',
    'send',
    'service_fill',
    'service',
    'setup_fill',
    'setup',
    'share_fill',
    'share',
    'shielding_fill',
    'shielding',
    'smallscreen_fill',
    'smallscreen',
    'stealth_fill',
    'stealth',
    'success_fill',
    'success',
    'suspend',
    'switch',
    'systemprompt_fill',
    'systemprompt',
    'tailor',
    'task',
    'task_fill',
    'tasklist_fill',
    'tasklist',
    'text',
    'time_fill',
    'time',
    'translation_fill',
    'translation',
    'trash',
    'trash_fill',
    'undo',
    'unlock_fill',
    'unlock',
    'video',
    'video_fill',
    'warning_fill',
    'warning',
    'workbench_fill',
    'workbench',
    'search',
    'searchfill',
    'qianniu',
    'publishgoods_fill',
    'shop_fill',
    'transaction_fill',
    'packup',
    'unfold',
    'wangwang',
    'financial_fill',
    'marketing_fill',
    'shake',
    'decoration_fill',
    'decoration_fill',
    'decoration_fill'
  ]
};
let App = class NukeDemoIndex extends Component {
  constructor() {
    super();
  }
  renderGridCell = (item, index) => {
    return (
      <View style={styles.iconCell}>
        <Icon style={styles.icon} name={item} />
        <Text style={styles.iconShowCode}>{item}</Text>
      </View>
    );
  };
  renderGridCellV2 = (item, index) => {
    return (
      <View style={styles.iconCell}>
        <Icon version="v2" style={[styles.icon, styles.new]} name={item} />
        <Text style={styles.iconShowCode}>{item}</Text>
      </View>
    );
  };

  render() {
    return (
      <Page title="Icon">
        <Page.Intro main="方形图片" />
        <View style={styles.listLine}>
          <Icon
            style={styles.icon}
            src="https://img.alicdn.com/tfs/TB1vUv.JFXXXXbAXFXXXXXXXXXX-50-50.png"
          />
          <View>
            <Text>一行文字 </Text>
          </View>
        </View>
        <Page.Intro main="自带的 iconfont 集合" />
        <View style={styles.lineWithMargin}>
          <MultiRow
            dataSource={ICONS['default']}
            rows={3}
            renderRow={this.renderGridCell}
          />
        </View>
        <Page.Intro main="全新的 icons 集合(v2)" />
        <View style={styles.lineWithMargin}>
          <MultiRow
            dataSource={ICONS['v2']}
            rows={3}
            renderRow={this.renderGridCellV2}
          />
        </View>
      </Page>
    );
  }
};
const styles = {
  icon: {
    fontSize: 40,
    marginBottom: 20
  },
  iconCell: {
    justifyContent: 'center',
    height: '180rem',
    alignItems: 'center',
    borderWidth: '1rem',
    borderColor: '#eeeeee',
    borderStyle: 'solid'
  },
  new: {
    fontSize: 68,

    color: '#3089dc'
  },
  listLine: {
    marginLeft: '40rem',
    marginRight: '40rem',
    padding: '20rem',
    flexDirection: 'row',
    backgroundColor: '#ffffff'
  },
  lineWithMargin: {
    marginLeft: '40rem',
    marginRight: '40rem',
    backgroundColor: '#ffffff'
  },

  iconShowCode: {
    fontSize: 24,
    color: '#999999'
  }
};
render(<App />);
