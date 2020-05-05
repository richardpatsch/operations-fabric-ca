function getRandomUppercase(length = 1) {
  let text = ''
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = 0; i < length; i += 1) {
    text += letters.charAt(Math.floor(Math.random() * letters.length))
  }
  return text
}

function getRandomNumber(length = 1) {
  return Math.floor(10 ** (length - 1) + Math.random() * 9 * 10 ** (length - 1))
}

// add numero verificador to code
function generateFullCode(code) {
  const prefix = code.substring(0, 2)
  const number = code.substring(2, 10)
  const sufix = code.substring(10).trim()
  let returnValue = number
  let dv
  const multipliers = [8, 6, 4, 2, 3, 5, 9, 7]
  let soma = 0

  if (code.length < 12) {
    throw new Error('could not calculate codigo')
  } else if (number.length < 8 && code.length === 12) {
    let zeros = ''
    const difference = 8 - number.length
    for (let i = 0; i < difference; i += 1) {
      zeros += '0'
    }
    returnValue = zeros + number
  } else {
    returnValue = number.substring(0, 8)
  }
  for (let i = 0; i < 8; i += 1) {
    soma += returnValue.substring(i, i + 1) * multipliers[i]
  }
  const rest = soma % 11
  if (rest === 0) {
    dv = '5'
  } else if (rest === 1) {
    dv = '0'
  } else {
    dv = (11 - rest).toString()
  }
  returnValue += dv
  returnValue = prefix + returnValue + sufix
  return returnValue
}

/* eslint-disable import/prefer-default-export */
export function generateCode() {
  return generateFullCode(
    `${getRandomUppercase(2)}${getRandomNumber(8)}${getRandomUppercase(2)}`
  )
}

export function parseArgs(args) {
  let parsedObject
  try {
    parsedObject = JSON.parse(args.toString())
  } catch (e) {
    throw new Error('failed to parse json')
  }
  return parsedObject
}
