import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  //1. Should display Home page
  it('1. should display home page', () => {
    browser.waitForAngularEnabled(false);
    page.navigateTo();
    expect(browser.getCurrentUrl()).toContain('home')
  });


  //2. Should go to LoginComponent
  it('2. Should go to LoginComponent', () => {
    element(by.id('loginbtn')).click()
    browser.sleep(1000);

    expect(browser.getCurrentUrl()).toContain('home/login');
  });


  //3. Should fill out username and password and verify landing page after login
  it('3. Should fill out username and password and verify landing page after login', () => {
    element(by.id('username')).sendKeys('test');
    element(by.id('password')).sendKeys('test');
    element(by.id('loginBtn')).click();

    //Load page
    browser.sleep(5000);

    expect(browser.getCurrentUrl()).toContain('user/allQuizzes');
  });


  //4. Should fill out a quizform and create a new quiz
  it('4. Should fill out a quizform and create a new quiz', () => {
    element.all(by.css('.quiz-matcard')).then((numbQuizzes) => {
      let numbBefore = numbQuizzes.length;
      element(by.id('createQuiz')).click();
      //Load page
      browser.sleep(1000);

      element(by.id('quizTitle')).sendKeys('Test Quiz');
      element(by.css('[ng-reflect-name="0"]')).element(by.css('[formcontrolname="title"]')).sendKeys('Question');
      element(by.css('[ng-reflect-name="0"]')).element(by.css('[ng-reflect-name="0"]')).element(by.css('[formcontrolname="answer"]')).sendKeys('Answer 1');
      element(by.css('[ng-reflect-name="0"]')).element(by.css('[ng-reflect-name="1"]')).element(by.css('[formcontrolname="answer"]')).sendKeys('Answer 2');
      element(by.css('[ng-reflect-name="0"]')).element(by.css('[ng-reflect-name="1"]')).element(by.css('[formcontrolname="correct"]')).click();
      element(by.css('[ng-reflect-name="0"]')).element(by.css('[ng-reflect-name="2"]')).element(by.css('[formcontrolname="answer"]')).sendKeys('Answer 3');
      element(by.css('[ng-reflect-name="0"]')).element(by.css('[ng-reflect-name="3"]')).element(by.css('[formcontrolname="answer"]')).sendKeys('Answer 4');

      element(by.id('saveQuiz')).click();
      //Load page
      browser.sleep(5000);

      element.all(by.css('.quiz-matcard')).then((numberQuizzes) => {
        let numbAfter = numberQuizzes.length;
        expect(numbAfter).toEqual(+numbBefore + 1);
      });
    });

  });

  it('5. Should delete the created quiz', () => {
    element.all(by.css('.quiz-matcard')).then((numbQuizzes) => {
      let numbBefore = numbQuizzes.length;
      element.all(by.css('.delBtn')).get(numbBefore - 1).click();

      browser.sleep(5000);
      element.all(by.css('.quiz-matcard')).then((numberQuizzes) => {
        let numbAfter = numberQuizzes.length;
        expect(numbAfter).toEqual(numbBefore - 1);
      });
    });
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });
});
