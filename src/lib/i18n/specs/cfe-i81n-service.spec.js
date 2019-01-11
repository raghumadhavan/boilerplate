import { expect } from 'chai';
import sinon from 'sinon';
import i18next from 'i18next';
import i18n from '../i18n-service';

describe('cms i18n service', () => {
  beforeEach(() => {
    sinon.stub(i18next, 'init');
    sinon.stub(i18next, 't');
  });

  afterEach(() => {
    i18next.init.restore();
    i18next.t.restore();
  });

  describe('translate', () => {
    it('should call i18next.t', () => {
      const values = { name: 'hello' };

      i18n.translate('translation.id', values);

      expect(i18next.t.calledWith('translation.id', values)).to.equal(true);
    });

    it('should return what returns i18next.t', () => {
      i18next.t.returns('Hello World');

      expect(i18n.translate('translation.id')).to.equal('Hello World');
    });
  });
});
