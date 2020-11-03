import { Webview } from "vscode";

import * as vscode from "vscode";
export interface KogitoPanel {
  build(webview: vscode.Webview): void;
  getViewType(): string;
}
