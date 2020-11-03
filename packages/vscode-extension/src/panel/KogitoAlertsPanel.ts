import * as vscode from "vscode";
import { Alert } from "./Alert";
import { AlertsApi } from "./AlertsApi";
import { KogitoPanel } from "./KogitoPanel";

export class KogitoAlertsPanel implements AlertsApi, KogitoPanel {
  constructor(private readonly viewType: string, private readonly app: string) {}

  getViewType(): string {
    return this.viewType;
  }

  build(webview: vscode.Webview): void {}

  getAlerts(): Alert[] {
    throw new Error("Method not implemented.");
  }
  getAlert(id: string): Alert {
    throw new Error("Method not implemented.");
  }
  getAlertsByGroup(group: string): Alert[] {
    throw new Error("Method not implemented.");
  }
  getAlertsByLocation(location: string): Alert[] {
    throw new Error("Method not implemented.");
  }
}
