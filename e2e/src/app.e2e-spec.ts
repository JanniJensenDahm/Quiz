import { AppPage } from './app.po';
import {browser, by, element, logging} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  //1.0: Verify that I can go to the LoginComponent
  it('1.0: Verify that I can go to the LoginComponent', () => {
    browser.waitForAngularEnabled(false);
    browser.get('home/login');
    let login = element(by.id('login')).getText();

    expect(login).toEqual('Login');
  });

  //1.1: Fill out username and password and verify landing page after login
  it('1.1: Fill out username and password and verify landing page after login', () => {
    element(by.id('username')).sendKeys('admin');
    element(by.id('password')).sendKeys('admin');
    element(by.id('loginBtn')).click();

    //Load page
    browser.sleep(1000);

    expect(browser.getCurrentUrl()).toContain('user/allQuizzes');
  });

  //2.0: Create a new quizInput
  it('2.0: Create a new quizInput', () => {
    element(by.id('createQuiz')).click();
    //Load page
    browser.sleep(1000);

    element(by.id('quizTitle')).sendKeys('Test Quiz');
    element(by.id('newQuestion')).click();
    element(by.css('[ng-reflect-name="0"]')).element(by.css('[formcontrolname="title"]')).sendKeys('Question');
    element(by.css('[ng-reflect-name="0"]')).element(by.css('[ng-reflect-name="0"]')).element(by.css('[formcontrolname="answer"]')).sendKeys('Answer 1');
    element(by.css('[ng-reflect-name="0"]')).element(by.css('[ng-reflect-name="1"]')).element(by.css('[formcontrolname="answer"]')).sendKeys('Answer 2');
    element(by.css('[ng-reflect-name="0"]')).element(by.css('[ng-reflect-name="1"]')).element(by.css('[formcontrolname="correct"]')).click();
    element(by.css('[ng-reflect-name="0"]')).element(by.css('[ng-reflect-name="2"]')).element(by.css('[formcontrolname="answer"]')).sendKeys('Answer 3');
    element(by.css('[ng-reflect-name="0"]')).element(by.css('[ng-reflect-name="3"]')).element(by.css('[formcontrolname="answer"]')).sendKeys('Answer 4');

    /*element(by.id('newQuestion')).click();
    browser.sleep(5000);
    element(by.css('[ng-reflect-name="1"]')).element(by.css('[formcontrolname="title"]')).sendKeys('Quiz title 1');
    element(by.css('[ng-reflect-name="1"]')).element(by.css('[ng-reflect-name="0"]')).element(by.css('[formcontrolname="answer"]')).sendKeys('Answer 1');
    element(by.css('[ng-reflect-name="1"]')).element(by.css('[ng-reflect-name="1"]')).element(by.css('[formcontrolname="answer"]')).sendKeys('Answer 2');
    element(by.css('[ng-reflect-name="1"]')).element(by.css('[ng-reflect-name="2"]')).element(by.css('[formcontrolname="answer"]')).sendKeys('Answer 3');
    element(by.css('[ng-reflect-name="1"]')).element(by.css('[ng-reflect-name="3"]')).element(by.css('[formcontrolname="answer"]')).sendKeys('Answer 4');
    element(by.css('[ng-reflect-name="1"]')).element(by.css('[ng-reflect-name="3"]')).element(by.css('[formcontrolname="correct"]')).click();*/

    element(by.id('saveQuiz')).click();
    //Load page
    browser.sleep(1000);

    expect(element.all(by.css('h1')).getText()).toContain("Test Quiz");

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });
});
