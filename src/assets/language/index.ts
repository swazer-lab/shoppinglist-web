import LocalizedStrings from 'react-localization';

import en from './en';

const language = new LocalizedStrings({ en });

export const mirror = (ltr: any, rtl: any) => {
	return language.getLanguage() === 'ar' ? rtl : ltr;
};

export default language;