/* eslint-disable no-undef */

const Codeowners = require('../codeowners');

describe('matching with case sensitivity', () => {
  const codeowners = new Codeowners(__dirname, 'CODEOWNERS.test');

  it('should match an exact file name', () => {
    const owners = codeowners.getOwner('myCasedPath');

    expect(owners.length).toBe(1);
    expect(owners).toContain('@beaugunderson');
  });

  it("should not match a path where the case doesn't match", () => {
    expect(codeowners.getOwner('mycasedpath').length).toBe(0);
  });
});
