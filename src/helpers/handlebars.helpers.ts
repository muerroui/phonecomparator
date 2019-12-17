import { get } from 'lodash';

export const helpersHds = {
    concat() {
      return ([...arguments].filter(argument => typeof argument === 'string')).join('');
    },
    get(object: any, nestedKey: string) {
      return get(object, nestedKey);
    },
    amazonUrl(phone) {
      return `https://www.amazon.com/s?k=${phone}&amp;
             i=electronics-intl-ship&amp;bbn=16225009011&amp;rh=n%3A%2116225009011%2Cn%3A2811119011&amp;dc&amp;
             linkCode=ll2&amp;linkId=34240874f7b6f3db97ff787ec54a2d49&amp;qid=1570290013&amp;rnid=16225009011&amp;
             tag=system959-20&amp;ref=sr_nr_n_4'`;
    }
};