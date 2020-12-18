/**
 * Copyright 2021 Red Hat, Inc. and/or its affiliates
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { CommonI18n } from "@kogito-tooling/i18n-common-dictionary";
import { I18n } from "@kogito-tooling/i18n/dist/core";
import { WorkspaceApi } from "@kogito-tooling/workspace/dist/api";
import * as vscode from "vscode";
import { Notification, NotificationsApi, NotificationSeverity } from "../api";

export class PopupMessagesNotificationHandler implements NotificationsApi {
  private readonly currentI18n: CommonI18n;

  constructor(private readonly workspaceApi: WorkspaceApi, private readonly i18n: I18n<CommonI18n>) {
    this.currentI18n = this.i18n.getCurrent();
  }

  public createNotification(notification: Notification): void {
    this.get(notification.severity)(notification.message, notification.path);
  }

  public setNotifications(path: string, notifications: Notification[]): void {
    const errors = notifications.filter(n => n.severity === "ERROR");
    const others = notifications.filter(n => n.severity !== "ERROR");

    const errorsMessage = this.consolidateMessages(errors);
    const othersMessage = this.consolidateMessages(others);

    this.get("ERROR")(errorsMessage, path);
    this.get("SUCCESS")(othersMessage, path);
  }

  public removeNotifications(path?: string): void {
    // Popups can't be removed.
  }

  private get(severity: NotificationSeverity) {
    switch (severity) {
      case "ERROR":
        return this.handleStrategy(vscode.window.showErrorMessage);
      case "WARNING":
        return this.handleStrategy(vscode.window.showWarningMessage);
      default:
        return this.handleStrategy(vscode.window.showInformationMessage);
    }
  }

  private handleStrategy(showFunction: (message: string, ...items: string[]) => Thenable<string | undefined>) {
    return (message: string, path: string) =>
      path.length > 0
        ? showFunction(message, this.currentI18n.terms.open).then(this.handleClick)
        : showFunction(message);
  }

  private handleClick(path: string) {
    return (selected: string) => {
      if (!selected) {
        return;
      }
      this.workspaceApi.receive_openFile(path);
    };
  }

  private consolidateMessages(notifications: Notification[]): string {
    return notifications.map(n => n.message).reduce((accum, current) => `${accum}\n${current}`);
  }
}
