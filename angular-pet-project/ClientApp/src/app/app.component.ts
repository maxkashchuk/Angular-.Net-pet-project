import { Component } from '@angular/core';
import { lyl, StyleCollection, StyleRenderer, ThemeRef, ThemeVariables } from '@alyle/ui';
import { LyIconService } from '@alyle/ui/icon';
import { DomSanitizer } from '@angular/platform-browser';
import type { AppThemeVariables } from './app.module';

export const STYLES = (theme: AppThemeVariables, ref: ThemeRef) => {
  const __ = ref.selectorsOf(STYLES);
  return {
    $global: () => lyl `{
      body {
        background-color: ${theme.background.default}
        color: ${theme.text.default}
        font-family: ${theme.typography.fontFamily}
        margin: 0
        direction: ${theme.direction}
      }
      ...${
        theme.exampleContainer?.(__)
      }
    }`,
    root: lyl `{
      display: block
    }`,
    exampleContainer: null
  };
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
