import {BrowserDetector} from './browser-detector';

export class FileUtil {
  static savePlainTextAs(filename: string, text: string) {
    if (!BrowserDetector.isEdge()) {
      // For Firefox and Blink, use <a download>
      this.triggerDownload(filename, text, FileTypeEnum.TEXT_PLAIN);
    } else {
      // Special solution for Microsoft Edge
      this.triggerDownloadEdgeVer(filename, text, FileTypeEnum.TEXT_PLAIN);
    }
  }

  private static triggerDownload(filename: string, content: string, fileType: FileTypeEnum) {
    // Create an invisible <a>
    const el = document.createElement('a');
    const stdFilename = this.getStdFilename(filename, fileType);

    // Prepare its `href` and `download` attributes
    el.setAttribute('href', `data:${FileTypeEnumDisplay[FileTypeEnum[fileType]]};charset=utf-8,${encodeURIComponent(content)}`);
    console.log(stdFilename);
    el.setAttribute('download', stdFilename);

    // Trigger a click on it
    const event = new MouseEvent('click');
    el.dispatchEvent(event);
  }

  private static triggerDownloadEdgeVer(filename: string, content: string, fileType: FileTypeEnum) {
    const blob = new Blob([content], { type: FileTypeEnumDisplay[FileTypeEnum[fileType]] });
    window.navigator.msSaveBlob(blob, this.getStdFilename(filename, fileType));
  }

  private static getStdFilename(filename: string, fileType: FileTypeEnum): string {
    const ext = FileExtension[FileTypeEnum[fileType]];
    if (filename.endsWith(ext)) {
      return filename;
    } else {
      return filename + ext;
    }
  }
}

enum FileTypeEnum {
  TEXT_PLAIN,
  TEXT_JSON
}

enum FileTypeEnumDisplay {
  TEXT_PLAIN = 'text/plain',
  TEXT_JSON = 'text/json'
}

enum FileExtension {
  TEXT_PLAIN = '.txt',
  TEXT_JSON = '.json'
}
