(function(window, document, $) {

  var ranges = [
    [100, 1000],
    [1000, 10000],
    [10000, 30000],
    [50000, 100000]
  ];

  var separatorCharacter = '.';
  var decimalCharacter = ',';
  var formatCurrency = true;

  var $throwInput = $("[data-js='throw-input']").first();
  var $generateSuggestionButton = $("[data-js='generate-suggestion-button']").first();


  $throwInput.keyup(function() {
    var empty = false;
    $throwInput.each(function() {
      if ($(this).val().length == 0) {
        empty = true;
      }
    });

    if (empty) {
      $generateSuggestionButton.attr('disabled', 'disabled');
    } else {
      $generateSuggestionButton.removeAttr('disabled');
    }
  });

  $generateSuggestionButton.click(function() {
    var $rangeRadio = $("input[name='range-radio']:checked").first();

    let givenInput = removeCurrencyPunctuation($throwInput.val());

    let suggestion = generateSuggestion(+givenInput, $rangeRadio.val());

    if (formatCurrency === true) {
      suggestion = currencyFormat(suggestion);
      console.log('suggestion', suggestion);
    }

    $throwInput.val(suggestion);

    $throwInput.select();
    document.execCommand('copy');
  });

  function generateSuggestion(givenInput, selectedRange) {
    switch (selectedRange) {
      case '1':
        return calculateDifference(givenInput, ranges[0][0], ranges[0][1]);
      case '2':
        return calculateDifference(givenInput, ranges[1][0], ranges[1][1]);
      case '3':
        return calculateDifference(givenInput, ranges[2][0], ranges[2][1]);
      case '4':
        return calculateDifference(givenInput, ranges[3][0], ranges[3][1]);
    }
  }

  function calculateDifference(givenInput, startLimit, endLimit) {
    let randomValue = randomIntFromInterval(startLimit, endLimit);
    let suggestion = givenInput - randomValue;

    console.log(givenInput + ' - ' + randomValue + ' = ' + suggestion);

    return suggestion;
  }

  // min and max included
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function removeCurrencyPunctuation(num) {
    var replaced = num.split(separatorCharacter).join('');

    var returnData = replaced;

    if (decimalCharacter && formatCurrency) {
      returnData = returnData.split(decimalCharacter)[0];
    }

    return returnData;
  }

  function currencyFormat(num) {

    console.log(num);

    if (decimalCharacter) {
      return (
        num
        .toFixed(2) // always two decimal digits
        .replace('.', decimalCharacter) // replace decimal point character with ,
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + separatorCharacter)
      )
    } else {
      console.log(num.toString());
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + separatorCharacter);
    }
  }


})(window, document, $);
