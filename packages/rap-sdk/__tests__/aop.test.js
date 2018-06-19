import { sleep } from '../jest';
import AOP from '../src/aop';


describe('AOP', () => {
  it('proxy', async () => {
    expect(await AOP.proxy({
      method: 'POST',
      url: 'http://httpbin.org/post',
      dataType: 'json',
      headers: {
        'x-type': 'type-a',
      },
      mode: 'same-origin',
      body: 'hello httpbin',
    })).toEqual({
      method: 'request',
      params: {
        api: 'mtop.1688.wireless.isv.httpproxy',
        v: '1.0',
        ecode: '1',
        data: {
          targetUrl: 'http://httpbin.org/post',
          method: 'POST',
          headers: '{"x-type":"type-a"}',
          body: 'hello httpbin'
        }
      }
    });
  });
});
