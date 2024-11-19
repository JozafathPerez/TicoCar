import TranslationService from '../services/TranslationService';

class TranslationDecorator {
  constructor(component, language) {
    this.component = component;
    this.language = language;
  }

  render() {
    const translatedProps = {};
    for (const [key, value] of Object.entries(this.component.props)) {
      if (typeof value === 'string') {
        translatedProps[key] = TranslationService.translate(value, this.language);
      } else {
        translatedProps[key] = value;
      }
    }
    return React.cloneElement(this.component, translatedProps);
  }
}

export default TranslationDecorator;