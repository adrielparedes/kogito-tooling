import * as vscode from "vscode";
import { I18n } from "../../../i18n/dist/core";
import { VsCodeI18n } from "../i18n";
import { KogitoPanel } from "./KogitoPanel";

export class KogitoPanelWebviewProvider implements vscode.WebviewViewProvider {
  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly kogitoPanel: KogitoPanel,
    private readonly vsCodeI18n: I18n<VsCodeI18n>
  ) {}

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    resolveContext: vscode.WebviewViewResolveContext<unknown>,
    token: vscode.CancellationToken
  ): void | Thenable<void> {
    webviewView.webview.html = this.getHtmlContent();
  }

  private getHtmlContent() {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <style>
        html, body, div#envelope-app {
            margin: 0;
            border: 0;
            padding: 10px;
        }
      </style>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body>
      <div id="envelope-app">
        <h1>It works</h1>
      </div>
      
    </body>
    </html>`;
  }
}
