import {EditorTheme} from '../shared/app-settings';

export class EditorUtil {
  private static ruleSquareBracket = /\[.*?]/g;
  private static ruleManualWordBreaker = /`/g;

  public static escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .replace(/\r\n/g, '\\n')
      .replace(/\n/g, '<br>');
  }

  public static toHighlighted(text: string, editorTheme: EditorTheme): string {
    let escaped = EditorUtil.escapeHtml(text);
    // Highlight timestamps
    // escaped = escaped.replace(
    //   EditorUtil.ruleSquareBracket,
    //   `<font color="${editorTheme.timestampColor}" face="${editorTheme.timestampFont}">$&</font>`
    // );
    escaped = escaped.replace(
      EditorUtil.ruleSquareBracket,
      `<span style="color: ${editorTheme.timestampColor}; font-family: ${editorTheme.timestampFont};">$&</span>`
    );
    // Highlight word breakers
    // escaped = escaped.replace(
    //   EditorUtil.ruleManualWordBreaker,
    //   `<font color="${editorTheme.wordBreakerColor}">$&</font>`
    // );
    escaped = escaped.replace(
      EditorUtil.ruleManualWordBreaker,
      `<span style="color: ${editorTheme.wordBreakerColor};">$&</span>`
    );
    return escaped;
  }

  public static formatAsTimestamp(timestampText: string, editorTheme: EditorTheme): string {
    return `<span style="color: ${editorTheme.timestampColor}; font-family: ${editorTheme.timestampFont};">${timestampText}</span>`;
  }
}
