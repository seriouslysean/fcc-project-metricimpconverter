const UNIT_GAL = 'gal';
const UNIT_L = 'L';
const UNIT_LBS = 'lbs';
const UNIT_KG = 'kg';
const UNIT_MI = 'mi';
const UNIT_KM = 'km';


const CONVERT_GAL_TO_L = 3.78541;
const CONVERT_LBS_KG = 0.453592;
const CONVERT_MI_TO_KM = 1.60934;

const UNITS_MAP = {
  [UNIT_GAL]: {
    name: UNIT_GAL,
    fn: u => u * CONVERT_GAL_TO_L,
    to: UNIT_L,
  },
  [UNIT_L]: {
    name: UNIT_L,
    fn: u => u / CONVERT_GAL_TO_L,
    to: UNIT_GAL,
  },
  [UNIT_LBS]: {
    name: UNIT_LBS,
    fn: u => u * CONVERT_LBS_KG,
    to: UNIT_KG,
  },
  [UNIT_KG]: {
    name: UNIT_KG,
    fn: u => u / CONVERT_LBS_KG,
    to: UNIT_LBS,
  },
  [UNIT_MI]: {
    name: UNIT_MI,
    fn: u => u * CONVERT_MI_TO_KM,
    to: UNIT_KM,
  },
  [UNIT_KM]: {
    name: UNIT_KM,
    fn: u => u / CONVERT_MI_TO_KM,
    to: UNIT_MI,
  },
}

class ConvertHandler {

  constructor(input) {
    this._initNum = null;
    this._initUnit = null;
    this._returnNum = null;
    this._returnUnit = null;
    if (!input) {
      return;
    }

    this._input = input;
    this.parseInput();
    //
    if (this._initNum && this._initUnit) {
      this.convert();
    }
  }


  // Setters
  setInitNum(num) {
    // Need to support the lack of a valid number by defaulting to 1
    if (!num) {
      this._initNum = 1;
      return;
    }

    // If the number has a slash, need to divide it properly
    // const [, n1, n2] = num.match(/^([\d\.]+)?\/?([\d\.]+)?$/i);
    // adaptedNum = n1 && n2 ?
    //   parseFloat(n1 / n2) :
    //   parseFloat(num);

    // If a number is provided, however, need to validate that it's a real number
    const adaptedNum = parseFloat(num);
    if (isNaN(num) || isNaN(adaptedNum)) {
      return;
    }
    this._initNum = adaptedNum;
  }

  setInitUnit(unit) {
    const re = new RegExp(`^${unit}$`, 'i');
    this._initUnit = Object.keys(UNITS_MAP).find(u => u.match(re) != null);
  }

  parseInput() {
    const [, initNum, initUnit] = this._input.match(/^([\d\/\.]+)?([a-z]+)$/i) || [];
    this.setInitNum(initNum);
    this.setInitUnit(initUnit);
  }

  convert() {
    const { to, fn } = UNITS_MAP[this._initUnit];
    this._returnNum = Math.round(fn(this._initNum) * 1e5) / 1e5;
    console.log(this._returnNum);
    this._returnUnit = to;
  }

  output() {
    if (!this._initNum && !this._initUnit) {
      return 'invalid number and unit';
    }

    if (!this._initNum) {
      return 'invalid number';
    }

    if (!this._initUnit) {
      return 'invalid unit';
    }

    return {
      initNum: this._initNum,
      initUnit: this._initUnit,
      returnNum: this._returnNum,
      returnUnit: this._returnUnit,
      string: `${this._initNum} ${this._initUnit} converts to ${this._returnNum} ${this._returnUnit}`
    };
  }

}

module.exports = ConvertHandler;
