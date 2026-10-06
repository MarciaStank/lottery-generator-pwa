Feature: Lottery generation and user registration
  Users can generate lottery numbers and register to receive results.

  @CT01
  Scenario: Display the lottery home page
    Given the lottery application is available
    When the user views the home page
    Then 60 available numbers are displayed from 1 to 60
    And the draw button is enabled

  @CT02
  Scenario: Draw six valid lottery numbers
    Given the user is on the lottery home page
    When the user draws lottery numbers
    Then the lottery result page is displayed
    And exactly six unique integers between 1 and 60 are displayed

  @CT03
  Scenario: Navigate to registration
    Given the user is on the lottery home page
    When the user opens registration
    Then the registration page is displayed
    And the name and email fields are visible
    And submission is disabled while the form is empty

  @CT04
  Scenario: Register a user with valid data
    Given the user has entered the name "Maria Teste" and email "maria@example.com"
    And the submit button is enabled
    When the user submits the registration
    Then the user is displayed in the registered users list
    And the name and email fields are cleared
    And the submit button is disabled

  @CT05
  Scenario: Reject an invalid name and email
    Given the user is on the registration page
    When the user enters the name "Maria123" and email "maria@example.com"
    Then a name validation message is displayed
    And submission is disabled
    When the user enters the name "Maria Teste" and email "email-invalido"
    Then an email validation message is displayed
    And submission is disabled
    And the registered users list remains empty