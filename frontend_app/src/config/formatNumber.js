import React from 'react'

function formatNumber(number) {
    if (number >= 1000 && number < 1000000) {
      return (number / 1000).toFixed(0) + "k";
    } else if (number >= 1000000) {
      return (number / 1000000).toFixed(0) + "M";
    }
    
    return number.toString();
  }