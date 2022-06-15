import * as adb from "../lib/adb"

const child_process = require('child_process')
jest.mock('child_process');

describe('adb utils', () => {

    it('get device list', () => {
        child_process.execSync = () => {
            return "List of devices attached\n" +
                "12345\tdevice\n" +
                "abcde\tdevice\n"
        }
        expect(adb.getDeviceList()).toEqual(["12345", "abcde"])
    });

    it('top activity', () => {
        const value = "package2/.MainActivity2"
        child_process.execSync = () => {
            return "  ACTIVITY package1/.MainActivity 6b354da pid=12331\n" +
                `  ACTIVITY ${ value } 827a767 pid=4090\n`
        }
        expect(adb.getTopActivity()).toEqual(value)
    });

});
