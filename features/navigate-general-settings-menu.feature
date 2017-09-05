Feature: Navigate through General Settings menu

  Background:
    Given I have selected English language
    And I have accepted "Terms of use"
    And I agree to send logs to remote server
    And I have the following wallets:
      | name        |
      | Test wallet |

  Scenario Outline: Navigating through General Settings secondary menu
    Given I am on the General Settings "<FROM>" screen
    When I click on secondary menu "<TO>" item
    Then I should see General Settings "<TO>" screen

    Examples:
    | FROM         | TO           |
    | general      | display      |
    | general      | terms-of-use |
    | general      | support      |
    | display      | general      |
    | display      | terms-of-use |
    | display      | support      |
    | terms-of-use | general      |
    | terms-of-use | display      |
    | terms-of-use | support      |
    | support      | general      |
    | support      | display      |
    | support      | terms-of-use |

  Scenario: Change language in General Settings
    Given I am on the General Settings "general" screen
    And I open General Settings language selection dropdown
    And I select Japanese language
    Then I should see Japanese language as selected

  Scenario: Change theme in General Settings
    Given I am on the General Settings "display" screen
    And I select "Second" theme
    Then I should see "Second" theme as selected

  Scenario: Change send-logs option in General Settings
    Given I am on the General Settings "support" screen
    And I toggle switch to disable send-logs
    Then I should not see send-logs switch checked anymore