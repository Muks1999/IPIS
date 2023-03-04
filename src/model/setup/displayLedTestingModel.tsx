import BaseModel from "../BaseModel";

export default interface DisplayLedTestingModel extends BaseModel{
    boardType?: string,
    deviceId?: number,
    testPattern?: string,
    platformNo?: number,
    installationTest?: boolean,
    ledAutoTest?: boolean,
    time?: number,
}