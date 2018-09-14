export class MarginParser {
  static parseMargin(marginParams: string): Margin {
    const result = new Margin();
    if (!marginParams || marginParams.trim().length === 0) {
      return result;
    }
    const marginArray = marginParams.split(' ');

    result.top = result.right = result.bottom = result.left = marginArray[0];
    if (marginArray.length > 1) {
      result.right = result.left = marginArray[1];
    }
    if (marginArray.length > 2) {
      result.bottom = marginArray[2];
    }
    if (marginArray.length > 3) {
      result.left = marginArray[3];
    }

    return result;
  }
}

class Margin {
  top = '0';
  right = '0';
  bottom = '0';
  left = '0';
}
