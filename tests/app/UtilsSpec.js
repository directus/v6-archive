define(['utils'], function (Utils) {
  describe('Utils test', function () {
    it('Should add new params', function () {
      var url = 'https://directus.io/';

      var newURL = Utils.addParam(url, 'lang', 'es');
      expect(newURL).toBe(url + '?lang=es');

      newURL = Utils.addParam(newURL, 'lang', 'en');
      expect(newURL).toBe(url + '?lang=en');

      newURL = Utils.addParam(newURL, 'redirect', '1');
      expect(newURL).toBe(url + '?lang=en&redirect=1');

      newURL = Utils.addParam(newURL, 'first name', 'john');
      expect(newURL).toBe(url + '?lang=en&redirect=1&first%20name=john');

      newURL = Utils.addParam(newURL, 'first name', 'jane');
      expect(newURL).toBe(url + '?lang=en&redirect=1&first%20name=jane');

      expect(Utils.addParam(url, 'query', '%QUERY', true, false)).toBe(url + '?query=%QUERY');
    });
  });
});
