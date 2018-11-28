export class Base64Util {
  /**
   * Encode a blob in Base64 and call the callback with the result.
   * @param blob
   * @param callback
   */
  public static encode(blob: Blob, callback: (encoded: string | ArrayBuffer) => any) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      callback(reader.result);
    };
  }
}
