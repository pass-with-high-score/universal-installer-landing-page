/**
 * app-info-parser ships no types, and we import the APK entry point directly rather than the
 * package root: the root also pulls in the IPA parser, which depends on bplist-parser and so on
 * Node's `fs`. That breaks the browser build even though we never parse an IPA.
 */
declare module "app-info-parser/src/apk" {
  export default class ApkParser {
    constructor(file: File | Blob | string);
    parse(): Promise<Record<string, unknown>>;
  }
}
