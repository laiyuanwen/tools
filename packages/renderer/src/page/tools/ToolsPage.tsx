import { defineComponent } from "vue";
import "./style.sass"
import { useStore } from "vuex";
import * as Utils from "../../../../utils";
import * as Store from "../../../../store";
import { ToolsActionType } from "@/store/modules/adb/AdbStore";
import { message } from 'ant-design-vue';

export default defineComponent({
    setup() {
        const store = useStore()
        const devices = store.state.adb.devices
        const selectedDevice = store.state.adb.selectedDevice
        const recentInputText = store.state.adb.recentInputText

        const inputTextToAdb = () => {
            if (store.state.adb.selectedDevice) {
                store.dispatch(ToolsActionType.ADB_TEXT_INPUT, "input text")
            } else {
                message.error("没有设备链接")
            }
        }

        const clickRecentText = (text) => () => {
            if (store.state.adb.selectedDevice) {
                store.dispatch(ToolsActionType.ADB_TEXT_INPUT, text)
            } else {
                message.error("没有设备链接")
            }
        }

        return () => (
            <div>
                <div> 工具箱列表（选择使用什么工具） </div>

                <div>
                    adb 工具

                    选择设备
                    {
                        devices.map(device => (
                            <div>{device}</div>
                        ))
                    }
                    <div>选中的设备:{selectedDevice ? selectedDevice : "无设备连接"}</div>

                    输入框
                    <a-input></a-input>
                    <a-button onClick={inputTextToAdb}>确认</a-button>

                    最近输入
                    {
                        recentInputText.map(text => (<div onClick={clickRecentText(text)}>
                            {text.text}{text.desc ? `(${text.desc})` : ''}
                        </div>))

                    }
                </div>

            </div>
        );
    },
});
