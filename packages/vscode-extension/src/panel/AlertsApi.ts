import { Alert } from "./Alert";

export interface AlertsApi {
  getAlerts(): Alert[];
  getAlert(id: string): Alert;
  getAlertsByGroup(group: string): Alert[];
  getAlertsByLocation(location: string): Alert[];
}
