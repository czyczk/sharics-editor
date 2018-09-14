import { Injectable } from '@angular/core';
import {FileUtil} from '../../util/file-util';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  saveLyricsToFile() {
    const filename = 'Testing lyrics';
    const testText = 'I\'m writing a line of text here.\nAnd here\'s another line.\n甚至还有些汉字';
    // FileUtil.savePlainTextAs(filename, testText);
    FileUtil.savePlainTextAs(filename, testText);
  }
}
