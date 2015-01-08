'use strict';

/**
 * @ngdoc function
 * @name bostadskalkylApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bostadskalkylApp
 */
angular.module('bostadskalkylApp')
  .controller('MainCtrl', function ($scope) {
    $scope.inputHousingType = 'house';
    $scope.inputTotalPrice = undefined;
    $scope.inputMonthCost = undefined;
    $scope.inputCash = undefined;
    $scope.inputCashInterest = undefined;
    $scope.inputPledgeLetters = undefined;
    $scope.inputBottomInterest = undefined;
    $scope.inputBottomSum = undefined;
    $scope.inputTopInterest = undefined;
    $scope.inputTopSum = undefined;
    $scope.resultDirectCost = 0;
    $scope.resultLawfart = 0;
    $scope.resultPledgeLetters = 0;
    $scope.resultMonthCost = 0;
    $scope.resultBottomCost = 0;
    $scope.resultTopCost = 0;
    $scope.resultDepositCost = 0;
    $scope.remainingLoan = 0;
    $scope.calculatedDeposit = 0;
    $scope.resultDirectSum = 0;
    $scope.resultMonthlySum = 0;

    $scope.calculateCosts = function() {
        $scope.calculateDirectCost();
        $scope.calculateLawfart();
        $scope.calculatePledgeLetters();
        $scope.calculateMonthCost();
        $scope.calculateRemainingLoan();
        $scope.calculateDeposit();
        $scope.calculateLoans();
        $scope.calculateDepositLoan();
        $scope.calculateSums();
    };

    $scope.calculateDirectCost = function() {
        var tempValue = parseInt($scope.inputCash);
        if(isNaN(tempValue) || tempValue < 0) {
            tempValue = 0;
        }
        $scope.resultDirectCost = tempValue;
    };

    $scope.calculateLawfart = function() {
        var tempValue = ($scope.inputTotalPrice * 0.015) + 825;
        if(isNaN(tempValue) || tempValue < 0 || $scope.inputTotalPrice < 0) {
            tempValue = 0;
        }
        tempValue = Math.round(tempValue);
        $scope.resultLawfart = tempValue;
    };

    $scope.calculatePledgeLetters = function() {
        var baseCost = $scope.inputTotalPrice * 0.85;
        if($scope.inputCash > ($scope.inputTotalPrice * 0.15)) {
            var payedAmount = $scope.inputCash - ($scope.inputTotalPrice * 0.15);
            baseCost = baseCost-payedAmount;
        }
        if($scope.inputPledgeLetters >= baseCost) {
            $scope.resultPledgeLetters = 0;
        } else {
            $scope.resultPledgeLetters = (baseCost - $scope.inputPledgeLetters) * 0.02 + 375;
        }

        if(isNaN($scope.resultPledgeLetters) || $scope.resultPledgeLetters < 0) {
            $scope.resultPledgeLetters = 0;
        }
    };

    $scope.calculateMonthCost = function() {
        var tempValue = parseInt($scope.inputMonthCost);
        if(isNaN(tempValue) || tempValue < 0) {
            tempValue = 0;
        }
        $scope.resultMonthCost = tempValue;
    };

    $scope.isDepositEnough = function() {
        var expectedDeposit = $scope.inputTotalPrice * 0.15;
        return ($scope.inputCash >= expectedDeposit);
    };

    $scope.remainingLoanClass = function() {
        var bottomLoan = $scope.inputBottomSum || 0;
        var topLoan = $scope.inputTopSum || 0;
        var loanSum = parseInt(bottomLoan) + parseInt(topLoan);
        var expectedLoanSum = $scope.calculateExpectedLoanAmount();
        if(loanSum < expectedLoanSum) {
            return 'alert-info';
        } else if(loanSum > expectedLoanSum) {
            return 'alert-warning';
        } else {
            return 'alert-success';
        }
    };

    $scope.calculateExpectedLoanAmount = function() {
        var baseMaximum = $scope.inputTotalPrice * 0.85;
        var actualSum;
        if(isNaN($scope.inputCash)) {
            actualSum = $scope.inputTotalPrice - 0;
        } else {
            actualSum = $scope.inputTotalPrice - $scope.inputCash;
        }

        if(isNaN(baseMaximum)) {
            baseMaximum = 0;
        }

        if(isNaN(actualSum)) {
            actualSum = 0;
        }
        if(actualSum > baseMaximum) {
            return Math.round(baseMaximum);
        } else {
            return Math.round(actualSum);
        }
    };

    $scope.calculateRemainingLoan = function() {
        var expectedLoanSum = $scope.calculateExpectedLoanAmount();
        var bottomLoan = $scope.inputBottomSum || 0;
        var topLoan = $scope.inputTopSum || 0;
        var actualSum = (parseInt(bottomLoan) + parseInt(topLoan));

        if(isNaN(actualSum)) {
            actualSum = 0;
        }

        $scope.remainingLoan = expectedLoanSum - actualSum;
    };

    $scope.calculateDeposit = function() {
        var deposit = $scope.inputTotalPrice * 0.15;
        if(isNaN(deposit) || deposit <= 0) {
            deposit = 0;
        }
        $scope.calculatedDeposit = Math.round(deposit);
    };

    $scope.calculateLoans = function() {
        var bottomLoan = $scope.inputBottomSum || 0;
        var bottomInterest = $scope.inputBottomInterest || 0;
        var topLoan = $scope.inputTopSum || 0;
        var topInterest = $scope.inputTopInterest || 0;

        if(typeof bottomInterest === 'string' || bottomInterest instanceof String) {
            bottomInterest = bottomInterest.replace(/,/g, '.');
        }
        if(typeof topInterest === 'string' || topInterest instanceof String){
            topInterest = topInterest.replace(/,/g, '.');
        }

        var bottomSum = Math.round((bottomLoan * (bottomInterest / 100)) / 12);
        var topSum = Math.round((topLoan * (topInterest / 100)) / 12);

        if(isNaN(bottomSum) || bottomSum < 0) {
            $scope.resultBottomCost = 0;
        } else {
            $scope.resultBottomCost = bottomSum;
        }

        if(isNaN(topSum) || topSum < 0) {
            $scope.resultTopCost = 0;
        } else {
            $scope.resultTopCost = topSum;
        }
    };

    $scope.calculateDepositLoan = function() {
        if($scope.isDepositEnough()) {
            return;
        }
        var depositInterest = $scope.inputCashInterest || 0;

        if(typeof depositInterest === 'string' || depositInterest instanceof String) {
            depositInterest = depositInterest.replace(/,/g, '.');
        }

        var deposit = $scope.calculatedDeposit;
        
        var depositSum = Math.round((deposit * (depositInterest / 100)) / 12);

        if(isNaN(depositSum) || depositSum < 0) {
            $scope.resultDepositCost = 0;
        } else {
            $scope.resultDepositCost = depositSum;
        }
    };

    $scope.calculateSums = function () {
        $scope.calculateMonthlySum();
        $scope.calculateDirectSum();
    };

    $scope.calculateMonthlySum = function () {
        var monthlySum = 0;
        if(!isNaN($scope.resultMonthCost) && $scope.resultMonthCost > 0) {
            monthlySum += $scope.resultMonthCost;
        }
        if(!isNaN($scope.resultBottomCost) && $scope.resultBottomCost > 0) {
            monthlySum += $scope.resultBottomCost;
        }
        if(!isNaN($scope.resultTopCost) && $scope.resultTopCost > 0) {
            monthlySum += $scope.resultTopCost;
        }
        if(!isNaN($scope.resultDepositCost) && $scope.resultDepositCost > 0 && !$scope.isDepositEnough()) {
            monthlySum += $scope.resultDepositCost;
        }
        $scope.resultMonthlySum = monthlySum;
    };

    $scope.calculateDirectSum = function () {
        var directSum = 0;
        if(!isNaN($scope.resultDirectCost) && $scope.resultDirectCost > 0) {
            directSum += $scope.resultDirectCost;
        }
        if(!isNaN($scope.resultLawfart) && $scope.resultLawfart > 0 && $scope.inputHousingType === 'house') {
            directSum += $scope.resultLawfart;
        }
        if(!isNaN($scope.resultPledgeLetters) && $scope.resultPledgeLetters > 0 && $scope.inputHousingType === 'house') {
            directSum += $scope.resultPledgeLetters;
        }
        $scope.resultDirectSum = directSum;
    };
  });
