'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('bostadskalkylApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should have an inputTotalPrice', function () {
    expect(scope.inputTotalPrice).toBe(undefined);
  });

  it('should have an inputMonthCost', function () {
    expect(scope.inputMonthCost).toBe(undefined);
  });

  it('should have an inputCash', function () {
    expect(scope.inputCash).toBe(undefined);
  });

  it('should have an inputHouseInterest', function () {
    expect(scope.inputHouseInterest).toBe(undefined);
  });

  it('should have an inputCashInterest', function () {
    expect(scope.inputCashInterest).toBe(undefined);
  });

  it('should have an inputPledgeLetters', function () {
    expect(scope.inputPledgeLetters).toBe(undefined);
  });

  it('should have a resultDirectCost', function () {
    expect(scope.resultDirectCost).toBe(0);
  });

  it('should have a resultLawfart', function () {
    expect(scope.resultLawfart).toBe(0);
  });

  it('should have a resultPledgeLetters', function () {
    expect(scope.resultPledgeLetters).toBe(0);
  });

  it('should have a resultMonthCost', function () {
    expect(scope.resultMonthCost).toBe(0);
  });


  describe('CalculateDirectCost:', function () {
    it('should handle an undefined inputCash', function () {
      scope.inputCash = undefined;
      scope.calculateDirectCost();
      expect(scope.resultDirectCost).toBe(0);
    });

    it('should handle a negative inputCash', function () {
      scope.inputCash = -2512;
      scope.calculateDirectCost();
      expect(scope.resultDirectCost).toBe(0);
    });

    it('should handle a NaN inputCash', function () {
      scope.inputCash = 'asdasd';
      scope.calculateDirectCost();
      expect(scope.resultDirectCost).toBe(0);
    });

    it('should calculate an inputCash', function () {
      scope.inputCash = 2500000;
      scope.calculateDirectCost();
      expect(scope.resultDirectCost).toBe(2500000);
    });
  });

  describe('CalculateLawfart:', function () {
    it('should handle an undefined inputTotalPrice', function () {
      scope.inputTotalPrice = undefined;
      scope.calculateLawfart();
      expect(scope.resultLawfart).toBe(0);
    });

    it('should handle a negative inputTotalPrice', function () {
      scope.inputTotalPrice = -2525;
      scope.calculateLawfart();
      expect(scope.resultLawfart).toBe(0);
    });

    it('should handle a NaN inputTotalPrice', function () {
      scope.inputTotalPrice = 'asdad';
      scope.calculateLawfart();
      expect(scope.resultLawfart).toBe(0);
    });

    it('should calculate inputTotalPrice', function () {
      scope.inputTotalPrice = 2500000;
      scope.calculateLawfart();
      expect(scope.resultLawfart).toBe(38325);
    });
  });
});
