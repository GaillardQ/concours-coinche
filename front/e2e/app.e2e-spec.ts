import { ConcoursCoinchePage } from './app.po';

describe('concours-coinche App', () => {
  let page: ConcoursCoinchePage;

  beforeEach(() => {
    page = new ConcoursCoinchePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
