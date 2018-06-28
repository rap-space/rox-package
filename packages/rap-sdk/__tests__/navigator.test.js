
import { sleep } from '../jest';

import Navigator from '../src/navigator';

describe('navigator.pop', () => {
  it('pop()', async () => {
    expect(await Navigator.pop()).toEqual({
      method: 'pop',
      name: 'navigator',
      params: {
        animated: true,
      }
    });
  });

  it('pop(1)', async () => {
    expect(await Navigator.pop(1)).toEqual({
      method: 'pop',
      name: 'navigator',
      params: {
        index: 1,
        animated: true,
      }
    });
  });

  it('pop("1") 这应该是个 bug, = =', async () => {
    expect(await Navigator.pop('1')).toEqual({
      method: 'pop',
      name: 'navigator',
      params: {
        index: '1',
        animated: true,
      }
    });
  });

  it('pop({index, animated})', async () => {
    expect(await Navigator.pop({
      index: 2,
      animated: false,
    })).toEqual({
      method: 'pop',
      name: 'navigator',
      params: {
        index: 2,
        animated: false,
      }
    });
  });
});


describe('navigator.push', () => {

  it('push("url")', async () => {
    expect(await Navigator.push('rap:///index', true)).toEqual({
      method: 'push',
      name: 'navigator',
      params: {
        animated: true,
        clearTop: false,
        title: {
          text: '',
        },
        url: 'rap:///index',
      },
    });
  });

  it('push({ url, titie })', async () => {
    expect(await Navigator.push({
      url: 'rap:///index',
      title: 'abc',
      backgroundColor: '#fff'
    }, true)).toEqual({
      method: 'push',
      name: 'navigator',
      params: {
        backgroundColor: '#fff',
        animated: true,
        clearTop: false,
        title: {
          text: 'abc',
        },
        url: 'rap:///index',
      },
    });
  });

  it('push({ url, titie: {} })', async () => {
    expect(await Navigator.push({
      url: 'rap:///index',
      title: {
        text: 'abc',
        url: 'abc',
      },
      backgroundColor: '#fff'
    }, true)).toEqual({
      method: 'push',
      name: 'navigator',
      params: {
        backgroundColor: '#fff',
        animated: true,
        clearTop: false,
        title: {
          text: 'abc',
          url: 'abc',
        },
        url: 'rap:///index',
      },
    });
  });

  it('push mutiple', async () => {
    expect(await Navigator.push('rap:///index')).toEqual({
      method: 'push',
      name: 'navigator',
      params: {
        animated: true,
        clearTop: false,
        title: {
          text: '',
        },
        url: 'rap:///index',
      },
    });

    expect(await Navigator.push('rap:///index')).toEqual({
      msg: 'Do push only in 3 seconds',
    });

    expect(await Navigator.push('rap:///index')).toEqual({
      msg: 'Do push only in 3 seconds',
    });

    await sleep(3000);

    expect(await Navigator.push('rap:///index')).toEqual({
      method: 'push',
      name: 'navigator',
      params: {
        animated: true,
        clearTop: false,
        title: {
          text: '',
        },
        url: 'rap:///index',
      },
    });

    expect(await Navigator.push('rap:///index')).toEqual({
      msg: 'Do push only in 3 seconds',
    });

    expect(await Navigator.push('rap:///index')).toEqual({
      msg: 'Do push only in 3 seconds',
    });
  });
});
