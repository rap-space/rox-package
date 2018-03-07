import RAP from 'rap-sdk';
import { getIn } from './xpath';

export default function(pageData = {}) {
  const a = getIn(pageData, 'metaData.spma');
  const b = getIn(pageData, 'metaData.spmb');

  RAP.tracelog.setConfig([ a, b ]);
}
